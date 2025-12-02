import { useQuery } from "@tanstack/react-query";
import { fetchTotalLoanRisk } from "@/lib/api/loan/RiskFetch";
import type { TotalLoanRiskResponse } from "@/../types/loan";

export const useTotalLoanRisk = () => {
    return useQuery<TotalLoanRiskResponse>({
        queryKey: ["totalLoanRisk"],
        queryFn: fetchTotalLoanRisk,
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분
    });
};
