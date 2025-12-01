import { ConsumptionCategoryKey } from "@/models/expenditure-limit";

export type ExpenditureId = number;

export interface ExpenditureItem {
  id: ExpenditureId;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description: string;
  savedAt: string; 
  category?: ConsumptionCategoryKey;
}

export interface CreateExpenditurePayload {
  type: "INCOME" | "EXPENSE";
  amount: number;
  description: string;
  savedAt: string; // required
  category?: ConsumptionCategoryKey;
}

export interface UpdateExpenditurePayload {
  type?: "INCOME" | "EXPENSE";
  amount?: number;
  description?: string;
  savedAt?: string;
  category?: ConsumptionCategoryKey;
}


export interface SpendingRecommendResponse {
  /**
   * 이번 달 가변 지출에 쓸 수 있는 총 예산
   */
  variableSpendingBudget: number;

  /**
   * 카테고리별 추천 금액 (원 단위)
   * e.g. { "FOOD": 480000, "TRANSPORT": 240000, ... }
   */
  categoryRecommendation: Record<string, number>;
}

export interface SpendingRecommendParams {
  year: number;
  month: number;
}

export interface CategorySpending {
  category: ConsumptionCategoryKey;
  amount: number;
  percent?: number;
}

export interface MonthlySpendingResponse {
  year: number;
  month: number;
  totalSpent: number;
  categories: CategorySpending[];
}

export interface MonthlySpendingParams {
  year: number;
  month: number;
}
