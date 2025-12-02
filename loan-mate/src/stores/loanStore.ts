import { create } from "zustand";

type PrepaidLoanInfo = {
  loanLedgerId: number;
  loanName: string;
  balance: number;
  mustPaidAmount: number;
};

type LoanStore = {
  prepaidLoan: PrepaidLoanInfo | null;
  setPrepaidLoan: (info: PrepaidLoanInfo) => void;
  clearPrepaidLoan: () => void;
};

export const useLoanStore = create<LoanStore>((set) => ({
  prepaidLoan: null,

  setPrepaidLoan: (info) => set({ prepaidLoan: info }),

  clearPrepaidLoan: () => set({ prepaidLoan: null }),
}));
