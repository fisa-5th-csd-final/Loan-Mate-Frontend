// src/lib/api/loan/DetailFetch.ts

import type { LoanDetail } from "@/../types/loan/LoanDetail";

// 나중에 실제 API 호출 시 여기만 바꾸면 됨
export async function fetchLoanDetail(loanId: number): Promise<LoanDetail> {
  // ── mock 데이터 ──
  const mock: LoanDetail = {
    id: loanId,
    summaryMessage:
      "부채 관리가 안정적으로 이루어지고 있습니다. 지금처럼 꾸준히 유지해보세요.",
    progressPercent: 78,

    interestRate: "12.5%",
    riskLevel: "높음",
    nextDueDate: "12월 4일",

    remainingPrincipal: "20,000,000 원",
    principal: "50,000,000 원",
    monthlyPayment: "2,000,000 원",
    repaymentAccount: "신한 110-259-1234567",
    loanType: "신용 대출",
    repaymentMethod: "원금 균등 분할",
  };

  // 네트워크 딜레이 흉내
  await new Promise((res) => setTimeout(res, 500));

  return mock;
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