import { apiClient } from "@/lib/api";

export async function transferMoney(data: {
  fromAccountNumber: string;
  toAccountNumber: string;
  toBankCode: string;
  amount: number;
}) {
  return apiClient.post("/api/accounts/transfer", data);
}
