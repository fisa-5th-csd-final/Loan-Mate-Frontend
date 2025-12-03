import { useQuery } from "@tanstack/react-query";
import { fetchLoanList } from "@/lib/api/loan/ListFetch";
import type { LoanSummary } from "@/../types/loan";

export const useLoanList = () => {
    return useQuery<LoanSummary[]>({
        queryKey: ["loanList"],
        queryFn: fetchLoanList,
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분
    });
};
