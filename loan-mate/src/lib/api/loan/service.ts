import { apiClient } from "@/lib/api/client";
import type { LoanSummary, LoanDetail, LoanAiCommentResponse } from "@/../types/loan";
import { API } from "@/consts/ROUTES";

export interface LoanRepaymentRatioResponse {
  monthlyIncome: number;
  totalMonthlyRepayment: number;
  ratio: number;
  peerAverageRatio: number;
}

export async function fetchLoanList(): Promise<LoanSummary[]> {
  return apiClient.fetch<LoanSummary[]>(API.LOAN.LIST);
}

export async function fetchLoanDetail(loanId: number): Promise<LoanDetail> {
  return apiClient.fetch<LoanDetail>(API.LOAN.DETAIL(loanId));
}

export async function fetchLoanComment(loanId: number): Promise<string> {
  const data = await apiClient.fetch<LoanAiCommentResponse>(API.LOAN.COMMENT(loanId));
  return data.comment;
}

export async function fetchLoanLedgerDetails(): Promise<LoanDetail[]> {
  return apiClient.fetch<LoanDetail[]>(API.LOAN.LEDGER_DETAILS);
}

export async function fetchLoanRepaymentRatio(): Promise<LoanRepaymentRatioResponse> {
  return apiClient.fetch<LoanRepaymentRatioResponse>("/api/loans/repayment-ratio");
}
