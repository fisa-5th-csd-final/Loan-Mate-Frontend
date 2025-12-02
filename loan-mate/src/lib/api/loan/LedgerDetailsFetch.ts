import type { LoanDetail } from "@/../types/loan";
import type { SuccessBody } from "@/../types/response";
import { API } from "@/consts/ROUTES";
import { apiClient } from "@/lib/api/client";

export async function fetchLoanLedgerDetails(): Promise<LoanDetail[]> {
  const response = await apiClient.get<SuccessBody<LoanDetail[]>>(
    API.LOAN.LEDGER_DETAILS
  );

  if (!response || !response.data) {
    throw new Error("Invalid response from loan ledger details API");
  }

  return response.data;
}
