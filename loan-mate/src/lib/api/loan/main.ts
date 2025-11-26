import { apiClient } from "@/lib/api/client";
import type { SuccessBody } from "@/../types/response";

export interface LoanListResponse {
    loanId: number;
    loanName: string;
    riskLevel: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
}

export async function fetchLoanList(): Promise<LoanListResponse[]> {
    const response = await apiClient.get<SuccessBody<LoanListResponse[]>>("/ledgers");
    if (!response || !response.data) {
        throw new Error("Invalid response from loan list API");
    }
    return response.data;
}
