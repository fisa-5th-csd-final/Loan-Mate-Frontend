import { useQuery } from "@tanstack/react-query";
import { fetchLoanDetail, fetchLoanComment } from "@/lib/api/loan/service";
import type { LoanDetail } from "@/../types/loan";

export const useLoanDetail = (loanId: number) => {
    return useQuery<LoanDetail>({
        queryKey: ["loanDetail", loanId],
        queryFn: () => fetchLoanDetail(loanId),
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분
    });
};

export const useLoanComment = (loanId: number) => {
    return useQuery<string>({
        queryKey: ["loanComment", loanId],
        queryFn: () => fetchLoanComment(loanId),
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분
    });
};
