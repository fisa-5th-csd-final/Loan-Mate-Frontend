// types/loan/LoanDetail.ts

export type LoanDetail = {
  loanId: number;
  loanName: string;
  remainPrincipal: number;
  principal: number;
  monthlyRepayment: number;
  interestPayment: number;
  accountNumber: string;
  loanType: "MORTGAGE" | "CREDIT" | "PERSONAL";
  repaymentType: "EQUAL_INSTALLMENT" | "EQUAL_PRINCIPAL" | "BULLET";
  progress: number;
  nextRepaymentDate: string;
};

export interface LoanSummary {
  loanId: number;
  loanName: string;
  riskLevel: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  iconUrl?: string;
}