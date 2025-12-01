"use client";
import { create } from "zustand";

interface TransferStore {
  bankName: string;
  bankLogo: string;
  bankCode: string;
  inputAccount: string;
  amount: number | "";
  setBank: (name: string, logo: string, code: string) => void;
  setAccount: (v: string) => void;
  setAmount: (v: number | "") => void;
}

export const useTransferStore = create<TransferStore>((set) => ({
  bankName: "",
  bankLogo: "",
  bankCode: "",
  inputAccount: "",
  amount: "",
  setBank: (name, logo, code) => set({ bankName: name, bankLogo: logo , bankCode: code }),
  setAccount: (v) => set({ inputAccount: v }),
  setAmount: (v) => set({ amount: v }),
}));
