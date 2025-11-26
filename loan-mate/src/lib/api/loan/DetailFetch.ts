// src/lib/api/loan/DetailFetch.ts

import type { LoanDetail } from "@/../types/loan/LoanDetail";

// 나중에 실제 API 호출 시 여기만 바꾸면 됨
export async function fetchLoanDetail(loanId: number): Promise<LoanDetail> {
  // 개발 환경일 때만 Mock 데이터 반환
  if (process.env.NODE_ENV === "development") {
    // 네트워크 딜레이 흉내
    await new Promise((res) => setTimeout(res, 500));

    const MOCK_DATA: Record<number, LoanDetail> = {
      101: {
        id: 101,
        summaryMessage: "상환이 매우 원활하게 진행되고 있습니다. 신용 점수 관리에 긍정적입니다.",
        progressPercent: 92,
        interestRate: "3.5%",
        riskLevel: "매우 양호",
        nextDueDate: "12월 10일",
        remainingPrincipal: "1,200,000 원",
        principal: "15,000,000 원",
        monthlyPayment: "350,000 원",
        repaymentAccount: "신한 110-123-456789",
        loanType: "자동차 대출",
        repaymentMethod: "원리금 균등",
      },
      102: {
        id: 102,
        summaryMessage: "안정적인 상환 흐름을 보이고 있습니다. 연체 없이 관리해보세요.",
        progressPercent: 45,
        interestRate: "5.2%",
        riskLevel: "보통",
        nextDueDate: "12월 15일",
        remainingPrincipal: "1,650,000 원",
        principal: "3,000,000 원",
        monthlyPayment: "150,000 원",
        repaymentAccount: "국민 3333-01-234567",
        loanType: "직장인 신용대출",
        repaymentMethod: "만기 일시",
      },
      103: {
        id: 103,
        summaryMessage: "최근 연체 이력이 있어 주의가 필요합니다. 상환 계획을 점검해보세요.",
        progressPercent: 15,
        interestRate: "14.5%",
        riskLevel: "위험",
        nextDueDate: "12월 5일",
        remainingPrincipal: "8,500,000 원",
        principal: "10,000,000 원",
        monthlyPayment: "450,000 원",
        repaymentAccount: "현대 555-12-345678",
        loanType: "신용 대출",
        repaymentMethod: "원금 균등",
      },
      104: {
        id: 104,
        summaryMessage: "꾸준히 상환하고 계시네요. 현재 속도라면 예상보다 일찍 상환 가능합니다.",
        progressPercent: 60,
        interestRate: "4.1%",
        riskLevel: "양호",
        nextDueDate: "12월 25일",
        remainingPrincipal: "120,000,000 원",
        principal: "200,000,000 원",
        monthlyPayment: "1,200,000 원",
        repaymentAccount: "우리 1002-987-654321",
        loanType: "주택담보대출",
        repaymentMethod: "원리금 균등",
      },
    };

    return (
      MOCK_DATA[loanId] || {
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