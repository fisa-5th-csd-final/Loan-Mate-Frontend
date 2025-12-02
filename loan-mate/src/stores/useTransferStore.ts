"use client";
import { create } from "zustand";

interface TransferStore {
  bankName: string;
  bankLogo: string;
  bankCode: string;
  inputAccount: string;
  amount: number | "";
  loanName?: string;
  mustPaidAmount?: number;

  setBank: (name: string, logo: string, code: string) => void;
  setBankLogo: (logo: string) => void; 
  setAccount: (v: string) => void;
  setAmount: (v: number | "") => void;
  setLoanName: (name: string) => void;
  setMustPaidAmount: (amount: number) => void;
}

export const useTransferStore = create<TransferStore>((set) => ({
  bankName: "",
  bankLogo: "",
  bankCode: "",
  inputAccount: "",
  amount: "",
  loanName: undefined,
  mustPaidAmount: undefined,
  setBank: (name, logo, code) => set({ bankName: name, bankLogo: logo , bankCode: code }),
  setBankLogo: (logo) => set({ bankLogo: logo }),
  setAccount: (v) => set({ inputAccount: v }),
  setAmount: (v) => set({ amount: v }),
  setLoanName: (name) => set({ loanName: name }),
  setMustPaidAmount: (amount) => set({ mustPaidAmount: amount }),
}));
