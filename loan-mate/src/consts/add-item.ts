export enum AddItemType {
  INCOME = "income",
  EXPENSE = "expense",
}

export type AddItem = {
  type: AddItemType;
  name: string;
  amount: number;
};
