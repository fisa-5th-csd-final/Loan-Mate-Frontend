"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import PageWithCTA from "../_components/PageWithCTA";
import MessageBox from "@/components/box/MessageBox"
import BottomSheet from "@/components/bottomSheet";
import CommonButton from "@/components/button/CommonButton";
import TableSection from "@/components/ui/TableSection";
import { TableRow, TableCell } from "@/components/ui/Table";
import SegmentProgressBar from "@/components/SegmentProgressBar";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

import {
  useMonthlySpendingQuery,
  useSpendingRecommendQuery,
  useExpenditureAiMessageQuery,
} from "@/lib/api/expenditure/hooks";
import { useLoanLedgerDetailsQuery } from "@/lib/api/loan/hooks";
import { ConsumptionCategoryKey } from "@/models/expenditure-limit";

import { ConsumptionCategoryLabelMap, ConsumptionCategoryMeta } from "../_components/ConsumptionCategoryMeta";

import { useSpendingRecommendationManager } from "./_hooks/useSpendingRecommendationManager";
import {
  useSpendingMetrics,
  type SpendingCategoryView,
} from "./_hooks/useSpendingMetrics";

import BudgetEditorContent from "../_components/modal/BudgetEditorModalPage";
import WarningConfirmContent from "../_components/modal/WarningConfirmModalPage";

/**
 * 카테고리 → SegmentProgressBar용 segment 변환
 */
function convertCategoriesToSegments(
  categories: SpendingCategoryView[]
): { label: string; percent: number; color: string }[] {
  return categories
    .filter((c) => c.ratio > 0)
    .map((c) => {
      const meta = ConsumptionCategoryMeta[c.key];
      return {
        label: ConsumptionCategoryLabelMap[c.key],
        percent: c.ratio / 100,
        color: meta.bg,
      };
    });
}

/**
 * yyyy.MM.dd 형식으로 날짜 포맷
 */
function formatNextRepaymentDate(
  dateStr: string | null | undefined
): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "-";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function ExpenditureLimitPage() {
  const router = useRouter();

  /** 날짜 */
  const { year, month } = useMemo(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }, []);

  /** API */
  const { data: recommend, isLoading: isRecommendLoading } =
    useSpendingRecommendQuery({ year, month });
  const { data: spending, isLoading: isSpendingLoading } =
    useMonthlySpendingQuery({ year, month });
  const { data: aiMessage, isLoading: isAiLoading } =
    useExpenditureAiMessageQuery({ year, month });
  const {
    data: loanLedgerDetails,
    isLoading: ledgerLoading,
    error: ledgerError,
  } = useLoanLedgerDetailsQuery();

  /** 추천 한도 / 수정 로직 (custom hook) */
  const {
    KEYS,
    draft,
    edited,
    setDraft,
    aiBaseline,
    applyDraft,
    isOverBaseline,
    isLoading,
  } = useSpendingRecommendationManager(recommend);

  /** 통계 계산 */
  const budget: number = recommend?.variableSpendingBudget ?? 0;
  const userBudget = useMemo(
    () => KEYS.reduce((sum, key) => sum + (edited[key] ?? 0), 0),
    [KEYS, edited]
  );
  const effectiveBudget = userBudget > 0 ? userBudget : budget;
  const isUserCustomized = useMemo(
    () => KEYS.some((key) => (edited[key] ?? 0) !== (aiBaseline[key] ?? 0)),
    [KEYS, aiBaseline, edited]
  );
  const limitHeaderLabel = isUserCustomized ? "사용자 지정 한도" : "추천 지출 한도";

  const { categories, totalSpent, overspent } = useSpendingMetrics(
    spending,
    edited,
    KEYS,
    effectiveBudget
  );

  /** BottomSheet 관리 */
  const [sheetOpen, setSheetOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  /** 수정 적용 핸들러 */
  const handleApply = () => {
    if (isOverBaseline()) {
      setSheetOpen(false);
      setWarningOpen(true);
      return;
    }
    void applyDraft();
    setSheetOpen(false);
  };

  const handleDraftChange = (
    key: ConsumptionCategoryKey,
    value: number
  ) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  const handleConfirmWarning = async () => {
    await applyDraft();
    setWarningOpen(false);
  };

  const handleCancelWarning = () => {
    setWarningOpen(false);
    setSheetOpen(true);
  };

  if (isRecommendLoading || isSpendingLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-700">
        <LoadingSpinner label="추천 한도와 지출을 불러오는 중입니다..." size="md" />
      </div>
    );
  }

  return (
    <PageWithCTA
      ctaLabel="상환금 납부하러 가기"
      onClick={() => console.log("CTA clicked")}
    >
      {/* 상단 */}
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

      {/* 수정 BottomSheet */}
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <BudgetEditorContent
          KEYS={KEYS}
          draft={draft}
          onChange={handleDraftChange}
          onApply={handleApply}
          isProcessing={isLoading}
        />
      </BottomSheet>


      {/* 경고 BottomSheet */}
      <BottomSheet open={warningOpen} onClose={handleCancelWarning}>
        <WarningConfirmContent
          onConfirm={handleConfirmWarning}
          onCancel={handleCancelWarning}
          isProcessing={isLoading}
        />
      </BottomSheet>

      {(isAiLoading || aiMessage) && (
        <MessageBox>
          {isAiLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner label="AI 메시지를 불러오는 중입니다..." size="sm" />
            </div>
          ) : (
            aiMessage
          )}
        </MessageBox>
      )}

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
            segments={convertCategoriesToSegments(categories)}
          />
        }
        header={
          <>
            <span className="text-center">카테고리</span>
            <span className="text-center">지출 금액</span>
            <span className="text-center">{limitHeaderLabel}</span>
          </>
        }
        rows={
          <>
            {categories.map((cat) => {
              const meta = ConsumptionCategoryMeta[cat.key];
              const Icon = meta.icon;
              const label = ConsumptionCategoryLabelMap[cat.key];
              const overs = cat.spent > cat.amount;

              return (
                <TableRow key={cat.key}>
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
                          {label}
                        </span>
                        <span className="text-gray-500 text-[11px]">
                          {cat.ratio}%
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell
                    className={`text-center font-medium ${overs ? "text-red-600" : ""
                      }`}
                  >
                    {cat.spent.toLocaleString()}원
                  </TableCell>

                  <TableCell className="text-center font-medium">
                    {cat.amount.toLocaleString()}원
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        }
      />

      {/* 총 사용 / 잔여 */}
      <div className="flex gap-3 px-1 mt-5">
        <MessageBox className="flex-1 text-left">
          이번 달에 총{" "}
          <span className="font-semibold text-blue-700">
            {totalSpent.toLocaleString()}
          </span>
          원 썼어요
        </MessageBox>

        <MessageBox className="flex-1 text-left">
          {overspent ? (
            <span>이번 달은 이미 추천 지출을 초과했어요</span>
          ) : (
            <>
              이번 달에 총{" "}
              <span className="font-semibold text-blue-700">
                {Math.max(0, effectiveBudget - totalSpent).toLocaleString()}
              </span>
              원 쓸 수 있어요
            </>
          )}
        </MessageBox>
      </div>

      {/* 상환 일정 */}
      <div className="mt-8 px-1">
        <p className="text-[18px] font-semibold text-gray-900">대출 상환 일정</p>
        <p className="text-[14px] text-gray-600 mt-1">
          이번 달 예정된 상환금과 납부일을 확인하세요.
        </p>
      </div>

      <TableSection
        header={
          <>
            <span className="text-center">대출명</span>
            <span className="text-center">월 상환금</span>
            <span className="text-center">다음 상환일</span>
          </>
        }
        rows={
          <>
            {ledgerLoading && (
              <TableRow>
                <TableCell className="text-center text-gray-500">
                  불러오는 중입니다...
                </TableCell>
              </TableRow>
            )}

            {ledgerError && !ledgerLoading && (
              <TableRow>
                <TableCell className="text-center text-red-600">
                  불러오지 못했어요
                </TableCell>
              </TableRow>
            )}

            {loanLedgerDetails?.map((loan) => (
              <TableRow key={loan.loanId}>
                <TableCell className="text-left font-medium text-gray-900 truncate">
                  {loan.loanName}
                </TableCell>
                <TableCell className="text-center font-semibold text-gray-900">
                  {loan.monthlyRepayment.toLocaleString()}원
                </TableCell>
                <TableCell className="text-center text-gray-800">
                  {formatNextRepaymentDate(loan.nextRepaymentDate)}
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
    </PageWithCTA>
  );
}
