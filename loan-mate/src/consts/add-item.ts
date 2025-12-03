import { ConsumptionCategoryKey } from "@/models/expenditure-limit";

export enum AddItemType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export type AddItem = {
  type: AddItemType;
  name: string;
  amount: number;
  category?: ConsumptionCategoryKey; // expense 전용 (백엔드 enum 키)
};
