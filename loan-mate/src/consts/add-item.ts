export enum AddItemType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export type AddItem = {
  type: AddItemType;
  name: string;
  amount: number;
};
