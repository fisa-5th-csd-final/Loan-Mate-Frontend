"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { LoanDetail, LoanSummary } from "@/../types/loan";
import type { ApiError } from "@/lib/api/client";
import {
  fetchLoanLedgerDetails,
  fetchLoanList,
  fetchLoanDetail,
  fetchLoanComment,
  fetchLoanRepaymentRatio, // Add import
  type LoanRepaymentRatioResponse, // Add import
} from "./service";

const loanKeys = {
  list: ["loan", "list"] as const,
  detail: (id: number) => ["loan", "detail", id] as const,
  comment: (id: number) => ["loan", "comment", id] as const,
  ledgerDetails: ["loan", "ledger-details"] as const,
  repaymentRatio: ["loan", "repayment-ratio"] as const, // Add key
};

export function useLoanRepaymentRatioQuery() {
  return useQuery<LoanRepaymentRatioResponse>({
    queryKey: loanKeys.repaymentRatio,
    queryFn: fetchLoanRepaymentRatio,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

type LedgerDetailOptions = Omit<
  UseQueryOptions<
    LoanDetail[],
    ApiError,
    LoanDetail[],
    typeof loanKeys.ledgerDetails
  >,
  "queryKey" | "queryFn"
>;

export function useLoanLedgerDetailsQuery(options?: LedgerDetailOptions) {
  return useQuery({
    queryKey: loanKeys.ledgerDetails,
    queryFn: fetchLoanLedgerDetails,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    ...options,
  });
}

export function useLoanListQuery() {
  return useQuery<LoanSummary[]>({
    queryKey: loanKeys.list,
    queryFn: fetchLoanList,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useLoanDetailQuery(loanId: number) {
  return useQuery<LoanDetail>({
    queryKey: loanKeys.detail(loanId),
    queryFn: () => fetchLoanDetail(loanId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useLoanCommentQuery(loanId: number) {
  return useQuery<string>({
    queryKey: loanKeys.comment(loanId),
    queryFn: () => fetchLoanComment(loanId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
