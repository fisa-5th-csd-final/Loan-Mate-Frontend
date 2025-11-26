import { apiClient } from "@/lib/api/client";
import type { SuccessBody } from "@/../types/response";

export interface LoanListResponse {
    loanId: number;
    loanName: string;
    riskLevel: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
}

export async function fetchLoanList(): Promise<LoanListResponse[]> {
    // 실제 API 호출 (백엔드 준비 시 주석 해제)
    /*
    const response = await apiClient.get<SuccessBody<LoanListResponse[]>>("/ledgers");
    if (!response || !response.data) {
      throw new Error("Invalid response from loan list API");
    }
    return response.data;
    */

    // 임시 Mock 데이터
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 딜레이

    return [
        { loanId: 101, loanName: "신한 마이카 대출", riskLevel: "ONE" },
        { loanId: 102, loanName: "카카오뱅크 비상금대출", riskLevel: "THREE" },
        { loanId: 103, loanName: "현대캐피탈 신용대출", riskLevel: "FIVE" },
        { loanId: 104, loanName: "우리은행 주택담보대출", riskLevel: "TWO" },
    ];
}
