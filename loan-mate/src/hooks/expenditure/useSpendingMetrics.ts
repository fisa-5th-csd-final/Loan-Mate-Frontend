// src/app/expenditure/limit/_hooks/useSpendingMetrics.ts
import { ConsumptionCategoryKey } from "@/models/expenditure-limit";
import type {
  MonthlySpendingResponse,
  CategorySpending,
} from "@/lib/api/expenditure/types";

export interface SpendingCategoryView {
  key: ConsumptionCategoryKey;
  amount: number; // 추천 한도
  ratio: number;  // 비율 (%)
  spent: number;  // 실제 지출
}

export interface SpendingMetricsResult {
  categories: SpendingCategoryView[];
  totalSpent: number;
  overspent: boolean;
}

/**
 * 지출/한도/비율 관련 데이터 가공 훅
 */
export function useSpendingMetrics(
  spending: MonthlySpendingResponse | undefined,
  edited: Record<ConsumptionCategoryKey, number>,
  keys: ConsumptionCategoryKey[],
  totalBudget: number
): SpendingMetricsResult {
  const spendingMap = new Map<ConsumptionCategoryKey, number>(
    (spending?.categories ?? []).map(
      (i: CategorySpending) => [i.category, i.amount] as const
    )
  );

  const percentMap = new Map<ConsumptionCategoryKey, number>(
    (spending?.categories ?? []).map((i: CategorySpending) => [
      i.category,
      i.percent ?? 0,
    ])
  );

  const categories: SpendingCategoryView[] = keys.map((key) => {
    const amount = edited[key] ?? 0;
    const percentFromSpending = percentMap.get(key);

    const ratio =
      typeof percentFromSpending === "number"
        ? percentFromSpending
        : totalBudget > 0
        ? (amount / totalBudget) * 100
        : 0;

    return {
      key,
      amount,
      ratio: Math.round(ratio * 100) / 100,
      spent: spendingMap.get(key) ?? 0,
    };
  });

  const totalSpent: number =
    typeof spending?.totalSpent === "number"
      ? spending.totalSpent
      : categories.reduce((sum, c) => sum + c.spent, 0);

  return {
    categories,
    totalSpent,
    overspent: totalSpent > totalBudget,
  };
}
