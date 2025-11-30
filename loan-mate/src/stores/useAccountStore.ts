"use client";
import { create } from "zustand";

interface AccountInputStore {
  inputAccount: string;
  setInputAccount: (v: string) => void;
}

export const useAccountStore = create<AccountInputStore>((set) => ({
  inputAccount: "",
  setInputAccount: (v) => set({ inputAccount: v }),
}));
