"use client";
import { create } from "zustand";

interface BankStore {
  bankName: string;
  bankLogo: string;
  setBank: (name: string, logo: string) => void;
}

export const useBankStore = create<BankStore>((set) => ({
  bankName: "",
  bankLogo: "",
  setBank: (name, logo) => set({ bankName: name, bankLogo: logo }),
}));
