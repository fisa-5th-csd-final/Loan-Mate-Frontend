export type ExpenditureId = number;

export interface ExpenditureItem {
  id: ExpenditureId;
  type: "INCOME" | "EXPENDITURE";
  amount: number;
  description: string;
  savedAt: string; 
}

export interface CreateExpenditurePayload {
  type: "INCOME" | "EXPENDITURE";
  amount: number;
  description: string;
  savedAt: string; // required
}

export interface UpdateExpenditurePayload {
  type?: "INCOME" | "EXPENDITURE";
  amount?: number;
  description?: string;
  savedAt?: string;
}
