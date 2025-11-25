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