"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import MessageBox from "@/components/MessageBox";
import TableSection from "@/components/ui/TableSection";
import { TableRow, TableCell } from "@/components/ui/Table";
import { formatCurrency } from "@/lib/util/NumberFormatter";
import PageWithCTA from "../_components/PageWithCTA";
import {
  ConsumptionCategoryKeyMap,
  ConsumptionCategoryMeta,
  ConsumptionCategoryLabelMap,
} from "../_components/ConsumptionCategoryMeta";
import {
  ConsumptionCategoryKey,
  ExpenditureCategory,
} from "@/models/expenditure-limit";
import SegmentProgressBar from "@/components/SegmentProgressBar";
import CommonButton from "@/components/button/CommonButton";
import {
  useMonthlySpendingQuery,
  useSpendingRecommendQuery,
  useUpdateSpendingLimitMutation,
} from "@/lib/api/expenditure/hooks";
import { useLoanLedgerDetailsQuery } from "@/lib/api/loan/hooks";
import BottomSheet from "@/components/bottomSheet";

function convertCategoriesToSegments(categories: ExpenditureCategory[]) {
  return categories.map((cat) => {
    const key = ConsumptionCategoryKeyMap[cat.name];
    const meta = ConsumptionCategoryMeta[key];

    return {
      label: cat.name,
      percent: cat.ratio / 100,
      color: meta.bg,
    };
  });
}

function formatNextRepaymentDate(dateStr: string | null | undefined) {
  if (!dateStr) return "-";
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return "-";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const date = String(parsed.getDate()).padStart(2, "0");

  return `${year}.${month}.${date}`;
}

export default function ExpenditureLimitPage() {
  const router = useRouter();
  const summaryMessage =
    "이번 달 추천 한도와 실시간 지출 데이터를 확인해 보세요.";

  // 현재 날짜
  const { year, month } = useMemo(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }, []);

  // 추천 비율 API 호출
  const { data: recommend } = useSpendingRecommendQuery({ year, month });
  const { data: spending } = useMonthlySpendingQuery({ year, month });
  const {
    data: loanLedgerDetails,
    isLoading: isLedgerLoading,
    error: ledgerError,
  } = useLoanLedgerDetailsQuery();
  const updateLimitMutation = useUpdateSpendingLimitMutation();
  const [sheetOpen, setSheetOpen] = useState(false);

  // 프론트에서 사용할 카테고리 정의
  const FRONT_USE_KEYS: ConsumptionCategoryKey[] = [
    "FOOD",
    "TRANSPORT",
    "SHOPPING",
    "ENTERTAINMENT",
  ];

  const baseRecommended = useMemo(
    () =>
      FRONT_USE_KEYS.reduce((acc, key) => {
        const raw = recommend?.categoryRecommendation?.[key];
        acc[key] = typeof raw === "number" ? raw : 0;
        return acc;
      }, {} as Record<ConsumptionCategoryKey, number>),
    [recommend?.categoryRecommendation]
  );

  const [editedRecommended, setEditedRecommended] =
    useState<Record<ConsumptionCategoryKey, number>>(baseRecommended);

  useEffect(() => {
    setEditedRecommended(baseRecommended);
  }, [baseRecommended]);

  const [draftRecommended, setDraftRecommended] =
    useState<Record<ConsumptionCategoryKey, number>>(baseRecommended);

  useEffect(() => {
    if (sheetOpen) {
      setDraftRecommended(editedRecommended);
    }
  }, [editedRecommended, sheetOpen]);

  // 추천 예산이 없으면 카테고리 합계로 대체
  const budget = useMemo(() => {
    const total = recommend?.variableSpendingBudget ?? 0;
    if (total) return total;

    return FRONT_USE_KEYS.reduce(
      (sum, key) => sum + (editedRecommended[key] ?? 0),
      0
    );
  }, [recommend?.variableSpendingBudget, editedRecommended]);

  const categoriesWithRecommendation = useMemo(() => {
    const spendingByCategory = new Map(
      (spending?.categories ?? []).map((item) => [item.category, item.amount])
    );
    const spendingPercentByCategory = new Map(
      (spending?.categories ?? []).map((item) => [item.category, item.percent])
    );

    return FRONT_USE_KEYS.map((key) => {
      const recommendedAmount = editedRecommended[key] ?? 0;
      const ratioFromSpending = spendingPercentByCategory.get(key);
      const ratioPercent =
        typeof ratioFromSpending === "number"
          ? ratioFromSpending
          : budget > 0
          ? (recommendedAmount / budget) * 100
          : 0;

      return {
        id: key.toLowerCase(),
        name: ConsumptionCategoryLabelMap[key],
        ratio: Math.round(ratioPercent * 100) / 100, // percent 단위 (실지출 기준)
        spent: spendingByCategory.get(key) ?? 0,
        available: recommendedAmount,
        icon: ConsumptionCategoryMeta[key].icon,
      };
    });
  }, [budget, spending, editedRecommended]);

  // totalSpent 계산
  const totalSpent = useMemo(
    () =>
      typeof spending?.totalSpent === "number"
        ? spending.totalSpent
        : categoriesWithRecommendation.reduce((sum, cat) => sum + cat.spent, 0),
    [categoriesWithRecommendation, spending?.totalSpent]
  );

  // 총 사용 가능 금액 계산
  const availableTotal = Math.max(0, Math.round(budget - totalSpent));

  const handleDraftChange = (key: ConsumptionCategoryKey, value: string) => {
    const parsed = Number(value);
    const safe = Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
    setDraftRecommended((prev) => ({ ...prev, [key]: safe }));
  };

  const handleApplyDraft = async () => {
    setEditedRecommended(draftRecommended);

    try {
      await updateLimitMutation.mutateAsync({
        user_limit_amount: draftRecommended,
      });
      setSheetOpen(false);
    } catch (err) {
      console.error("사용자 지출 한도 수정 실패", err);
    }
  };

  return (
    <PageWithCTA
      ctaLabel="상환금 납부하러 가기"
      onClick={() => console.log("저장")}
    >
      {/* 상단 영역 */}
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-gray-900 text-[18px] font-semibold">
          한도를 수정할 수 있어요
        </p>

        <button
          className="px-3 py-1 text-[12px] rounded-full bg-gray-100 text-gray-700 border border-gray-300"
          onClick={() => setSheetOpen(true)}
        >
          수정하기
        </button>
      </div>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[17px] font-semibold text-gray-900">추천 금액 수정</p>
            <p className="text-sm text-gray-500 mt-1">
              카테고리별 추천 지출 한도를 직접 입력하세요.
            </p>
          </div>
          <button
            className="text-sm text-gray-500 px-3 py-1 rounded-full hover:bg-gray-100"
            onClick={() => setSheetOpen(false)}
          >
            닫기
          </button>
        </div>

        <div className="space-y-3">
          {FRONT_USE_KEYS.map((key) => {
            const meta = ConsumptionCategoryMeta[key];
            const Icon = meta.icon;
            const value = draftRecommended[key] ?? 0;

            return (
              <div
                key={key}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: meta.hex + "20" }}
                  >
                    <Icon size={20} color={meta.hex} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {ConsumptionCategoryLabelMap[key]}
                    </span>
                    <span className="text-xs text-gray-500">추천 금액</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    className="w-28 rounded-lg border border-gray-200 px-3 py-2 text-right text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    value={value}
                    onChange={(e) => handleDraftChange(key, e.target.value)}
                  />
                  <span className="text-sm text-gray-500">원</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            className="w-1/2 rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setSheetOpen(false)}
          >
            취소
          </button>
          <CommonButton
            label="적용하기"
            onClick={handleApplyDraft}
            widthClassName="w-1/2"
            size="lg"
            disabled={updateLimitMutation.isPending}
          />
        </div>
      </BottomSheet>

      {/* 설명 박스 */}
      <MessageBox>{summaryMessage}</MessageBox>

      {/* 예외 수입/지출 */}
      <div className="mt-6 mb-4 px-1">
        <p className="text-[18px] font-semibold text-gray-900">
          예상치 못한 변동이 있나요?
        </p>
        <p className="text-[15px] text-gray-600 mt-1">
          이번 달 수입·지출에 특별한 변화가 있다면 아래에서 추가해 한도를 다시 계산해보세요.
        </p>

        <div className="flex gap-3 mt-4">
          <CommonButton
            label="예외 수입 추가하기"
            onClick={() =>
              router.push("/expenditure/add-unexpected/income")
            }
            widthClassName="w-1/2"
            size="lg"
            colorClassName="bg-[#E3F2FD] hover:bg-[#D6EBFB]"
            textColorClassName="text-[#0A4AAC]"
            className="border border-[#B7D7F5]"
          />

          <CommonButton
            label="예외 지출 추가하기"
            onClick={() =>
              router.push("/expenditure/add-unexpected/outlay")
            }
            widthClassName="w-1/2"
            size="lg"
            colorClassName="bg-[#FFE7D9] hover:bg-[#FFDCCB]"
            textColorClassName="text-[#8A3A16]"
            className="border border-[#F8C7B3]"
          />
        </div>
      </div>

      {/* 카테고리 테이블 */}
      <TableSection
        topContent={
          <SegmentProgressBar
            segments={convertCategoriesToSegments(
              categoriesWithRecommendation
            )}
          />
        }
        header={
          <>
            <span className="text-center">카테고리</span>
            <span className="text-center">지출 금액</span>
            <span className="text-center">추천 지출 한도</span>
          </>
        }
        rows={
          <>
            {categoriesWithRecommendation.map((cat) => {
              const metaKey = ConsumptionCategoryKeyMap[cat.name];
              const meta = ConsumptionCategoryMeta[metaKey];
              const Icon = meta.icon;

              return (
                <TableRow key={cat.id}>
                  <TableCell className="text-center font-medium">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: meta.hex + "20" }}
                      >
                        <Icon size={20} color={meta.hex} />
                      </div>

                      <div className="flex flex-col text-sm">
                        <span className="font-medium text-gray-900">
                          {cat.name}
                        </span>
                        <span className="text-gray-500 text-[11px]">
                          {cat.ratio}%
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-medium">
                    {formatCurrency(cat.spent)}
                  </TableCell>

                  <TableCell className="text-center font-medium">
                    {formatCurrency(cat.available)}
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        }
      />

      {/* 상환 일정 */}
      <div className="mt-8 px-1">
        <p className="text-[18px] font-semibold text-gray-900">대출 상환 일정</p>
        <p className="text-[14px] text-gray-600 mt-1">
          이번 달 예정된 상환금과 납부일을 확인하세요.
        </p>
      </div>

      <TableSection
        columns="0.8fr 1.8fr 1.2fr 1.3fr"
        header={
          <>
            <span className="text-center">우선순위</span>
            <span className="text-left pl-2">대출명</span>
            <span className="text-center">월 상환금</span>
            <span className="text-center">다음 상환일</span>
          </>
        }
        rows={
          <>
            {isLedgerLoading && (
              <TableRow>
                <TableCell className="col-span-4 text-center text-gray-500">
                  대출 상환 일정을 불러오는 중입니다.
                </TableCell>
              </TableRow>
            )}

            {ledgerError && !isLedgerLoading && (
              <TableRow>
                <TableCell className="col-span-4 text-center text-red-600">
                  상환 일정을 불러오지 못했어요.
                </TableCell>
              </TableRow>
            )}

            {!isLedgerLoading &&
              !ledgerError &&
              (loanLedgerDetails?.length ?? 0) === 0 && (
                <TableRow>
                  <TableCell className="col-span-4 text-center text-gray-500">
                    예정된 상환 일정이 없습니다.
                  </TableCell>
                </TableRow>
              )}

            {loanLedgerDetails?.map((loan, index) => (
              <TableRow key={loan.loanId ?? `${loan.loanName}-${index}`}>
                <TableCell className="text-center text-gray-700">
                  {index + 1}
                </TableCell>
                <TableCell className="text-left font-medium text-gray-900">
                  {loan.loanName}
                </TableCell>
                <TableCell className="text-center font-semibold text-gray-900">
                  {formatCurrency(loan.monthlyRepayment)}
                </TableCell>
                <TableCell className="text-center text-gray-800">
                  {formatNextRepaymentDate(loan.nextRepaymentDate)}
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />

      {/* 이번 달 사용/잔여 금액 */}
      <div className="flex gap-3 px-1 mt-5">
        <MessageBox className="flex-1 text-left">
          <span>이번 달에 총 </span>
          <span className="font-semibold text-blue-700">
            {formatCurrency(totalSpent)}
          </span>
          <span> 썼어요</span>
        </MessageBox>

        <MessageBox className="flex-1 text-left">
          <span>이번 달에 총 </span>
          <span className="font-semibold text-blue-700">
            {formatCurrency(availableTotal)}
          </span>
          <span> 쓸 수 있어요</span>
        </MessageBox>
      </div>
    </PageWithCTA>
  );
}
