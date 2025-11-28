// types/loan.ts
// Loan 관련 모든 타입 정의

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

export type LoanSummary = {
    loanId: number;
    loanName: string;
    riskLevel: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
    iconUrl?: string;
};

export type LoanAiCommentResponse = {
    loanLedgerId: number;
    comment: string;
};
