"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { LoanDetail } from "@/../types/loan";
import type { ApiError } from "@/lib/api/client";
import { fetchLoanLedgerDetails } from "./LedgerDetailsFetch";

const loanKeys = {
  ledgerDetails: ["loan", "ledger-details"] as const,
};

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
