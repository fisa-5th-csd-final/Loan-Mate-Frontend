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
