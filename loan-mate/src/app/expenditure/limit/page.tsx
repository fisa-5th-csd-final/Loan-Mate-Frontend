"use client";

import { useMemo } from "react";
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
} from "@/lib/api/expenditure/hooks";

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

  const recommendedAmountByCategory = useMemo(
    () =>
      new Map(
        Object.entries(recommend?.categoryRecommendation ?? {}).map(
          ([key, amount]) => [key.toUpperCase(), amount]
        )
      ),
    [recommend?.categoryRecommendation]
  );

  // 추천 예산이 없으면 카테고리 합계로 대체
  const budget = useMemo(() => {
    const total = recommend?.variableSpendingBudget ?? 0;
    if (total) return total;

    let sum = 0;
    recommendedAmountByCategory.forEach((value) => {
      if (typeof value === "number") sum += value;
    });
    return sum;
  }, [recommend?.variableSpendingBudget, recommendedAmountByCategory]);

  // 프론트에서 사용할 카테고리 정의
  const FRONT_USE_KEYS: ConsumptionCategoryKey[] = [
    "FOOD",
    "TRANSPORT",
    "SHOPPING",
    "ENTERTAINMENT",
  ];

  const categoriesWithRecommendation = useMemo(() => {
    const spendingByCategory = new Map(
      (spending?.categories ?? []).map((item) => [item.category, item.amount])
    );
    const spendingPercentByCategory = new Map(
      (spending?.categories ?? []).map((item) => [item.category, item.percent])
    );

    return FRONT_USE_KEYS.map((key) => {
      const recommendedAmount = recommendedAmountByCategory.get(key) ?? 0;
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
  }, [budget, recommend, spending, recommendedAmountByCategory]);

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
          onClick={() => console.log("수정하기 클릭")}
        >
          수정하기
        </button>
      </div>

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
