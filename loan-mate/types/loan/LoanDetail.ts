// types/loan/LoanDetail.ts

export type LoanDetail = {
  id: number;

  summaryMessage: string;
  progressPercent: number;

  interestRate: string;
  riskLevel: string;
  nextDueDate: string;

  remainingPrincipal: string;
  principal: string;
  monthlyPayment: string;
  repaymentAccount: string;
  loanType: string;
  repaymentMethod: string;
};

export interface LoanSummary {
  loanId: number;
  loanName: string;
  riskLevel: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  iconUrl?: string;
}