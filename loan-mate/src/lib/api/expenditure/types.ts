export type ExpenditureId = number;

export interface ExpenditureItem {
  id: ExpenditureId;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description: string;
  savedAt: string; 
}

export interface CreateExpenditurePayload {
  type: "INCOME" | "EXPENSE";
  amount: number;
  description: string;
  savedAt: string; // required
}

export interface UpdateExpenditurePayload {
  type?: "INCOME" | "EXPENSE";
  amount?: number;
  description?: string;
  savedAt?: string;
}
