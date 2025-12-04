import { create } from "zustand";
import { persist } from "zustand/middleware";

type PrepaidLoanInfo = {
  mode: "prepaid" | "repay" | "deposit";
  loanLedgerId: number;
  loanName: string;
  balance: number;
  mustPaidAmount: number;
  accountNumber: string; // 계좌번호 추가
};

type LoanStore = {
  prepaidLoan: PrepaidLoanInfo | null;
  setPrepaidLoan: (info: PrepaidLoanInfo) => void;
  clearPrepaidLoan: () => void;
};

export const useLoanStore = create<LoanStore>()(
  persist(
    (set) => ({
      prepaidLoan: null,
      setPrepaidLoan: (info) => set({ prepaidLoan: info }),
      clearPrepaidLoan: () => set({ prepaidLoan: null }),
    }),
    {
      name: "prepaid-loan-storage", // localStorage key
    }
  )
);
