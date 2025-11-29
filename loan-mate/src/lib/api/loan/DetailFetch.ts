// src/lib/api/loan/DetailFetch.ts

import type { LoanDetail } from "@/../types/loan";
import { apiClient } from "@/lib/api/client";
import type { SuccessBody } from "@/../types/response";
import { API } from "@/consts/ROUTES";

export async function fetchLoanDetail(loanId: number): Promise<LoanDetail> {
  const response = await apiClient.get<SuccessBody<LoanDetail>>(API.LOAN.DETAIL(loanId));

  if (!response || !response.data) {
    throw new Error("Invalid response from loan detail API");
  }

  return response.data;
}