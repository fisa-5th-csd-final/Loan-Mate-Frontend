import { apiClient } from "@/lib/api/client";
import type { SuccessBody } from "@/../types/response";
import { MOCK_LOAN_LIST } from "@/data/loan.sample";
import type { LoanSummary } from "@/../types/loan/LoanDetail";
import { API } from "@/consts/ROUTES";

export async function fetchLoanList(): Promise<LoanSummary[]> {
    // 개발 환경일 때만 Mock 데이터 반환
    if (process.env.NODE_ENV === "development") {
        await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 딜레이
        return MOCK_LOAN_LIST as LoanSummary[];
    }

    // 실제 API 호출
    const response = await apiClient.get<SuccessBody<LoanSummary[]>>(API.LOAN.LIST);
    if (!response || !response.data) {
        throw new Error("Invalid response from loan list API");
    }
    return response.data;
}
