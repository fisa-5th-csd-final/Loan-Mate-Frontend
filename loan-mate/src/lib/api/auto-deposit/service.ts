import { apiClient } from "@/lib/api";

export interface TransferRequest {
  fromAccountNumber: string;
  toAccountNumber: string;
  toBankCode: string;
  amount: number;
}

export function requestTransfer(body: TransferRequest) {
  return apiClient.post("/api/accounts/transfer", body);
}
