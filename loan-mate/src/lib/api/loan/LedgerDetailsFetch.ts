import type { LoanDetail } from "@/../types/loan";
import type { SuccessBody } from "@/../types/response";
import { API } from "@/consts/ROUTES";
import { apiClient } from "@/lib/api/client";

/**
 * 
 * /api/loans/ledgers/details로 호출하여 대출 리스트 조회하는 api hook
 */

export async function fetchLoanLedgerDetails(): Promise<LoanDetail[]> {
  const response = await apiClient.get<SuccessBody<LoanDetail[]>>(
    API.LOAN.LEDGER_DETAILS
  );

  if (!response || !response.data) {
    throw new Error("Invalid response from loan ledger details API");
  }

  return response.data;
}
