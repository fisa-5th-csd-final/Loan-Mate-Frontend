// src/lib/api/loan/DetailFetch.ts

import type { LoanDetail } from "@/../types/loan/LoanDetail";
import { MOCK_LOAN_DETAIL } from "@/data/loan.sample";

// 나중에 실제 API 호출 시 여기만 바꾸면 됨
export async function fetchLoanDetail(loanId: number): Promise<LoanDetail> {
  // 개발 환경일 때만 Mock 데이터 반환
  if (process.env.NODE_ENV === "development") {
    // 네트워크 딜레이 흉내
    await new Promise((res) => setTimeout(res, 500));

    return (
      (MOCK_LOAN_DETAIL as Record<number, LoanDetail>)[loanId] || {
        id: loanId,
        summaryMessage: "대출 정보를 불러올 수 없습니다.",
        progressPercent: 0,
        interestRate: "-",
        riskLevel: "-",
        nextDueDate: "-",
        remainingPrincipal: "-",
        principal: "-",
        monthlyPayment: "-",
        repaymentAccount: "-",
        loanType: "-",
        repaymentMethod: "-",
      }
    );
  }

  // 실제 API 호출 (예시)
  // const response = await apiClient.get<SuccessBody<LoanDetail>>(`/loans/${loanId}`);
  // return response.data;
  throw new Error("API not implemented");
}

/*
  실제 API 붙일 때는 예를 들어 이렇게만 바꾸면 됨

  export async function fetchLoanDetail(loanId: string): Promise<LoanDetail> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/loans/${loanId}`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("대출 정보를 불러오지 못했습니다.");
    }

    const data = await res.json();
    return data;
  }
*/