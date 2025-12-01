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
   * 카테고리별 추천 비율 (0~1 사이 값)
   * e.g. { "FOOD": 0.3, "TRANSPORT": 0.1, ... }
   */
  categoryRecommendation: Record<string, number>;
}

export interface SpendingRecommendParams {
  year: number;
  month: number;
}
