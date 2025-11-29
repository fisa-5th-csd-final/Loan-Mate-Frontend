import { apiClient } from "@/lib/api/client";
import type { SuccessBody } from "@/../types/response";
import type { LoanSummary } from "@/../types/loan";
import { API } from "@/consts/ROUTES";

export async function fetchLoanList(): Promise<LoanSummary[]> {
    const response = await apiClient.get<SuccessBody<LoanSummary[]>>(API.LOAN.LIST);
    if (!response || !response.data) {
        throw new Error("Invalid response from loan list API");
    }
    return response.data;
}
