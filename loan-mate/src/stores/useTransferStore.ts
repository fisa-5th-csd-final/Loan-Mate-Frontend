"use client";
import { create } from "zustand";

interface TransferStore {
  bankName: string;
  bankLogo: string;
  inputAccount: string;
  amount: number | "";
  setBank: (name: string, logo: string) => void;
  setAccount: (v: string) => void;
  setAmount: (v: number | "") => void;
}

export const useTransferStore = create<TransferStore>((set) => ({
  bankName: "",
  bankLogo: "",
  inputAccount: "",
  amount: "",
  setBank: (name, logo) => set({ bankName: name, bankLogo: logo }),
  setAccount: (v) => set({ inputAccount: v }),
  setAmount: (v) => set({ amount: v }),
}));
