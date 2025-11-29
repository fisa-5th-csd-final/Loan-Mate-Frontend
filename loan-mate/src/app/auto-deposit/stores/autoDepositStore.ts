"use client";

import { create } from "zustand";

// API 응답에 맞게 Account 타입 정의
export interface Account {
  accountId: number;
  accountNumber: string;
  bankCode: string;
  balance: number;
  createdAt: string;
  isForIncome: boolean;
}

interface AccountStore {
  accounts: Account[];
  selectedAccount: Account | null;

  setAccounts: (list: Account[]) => void;
  setSelectedAccount: (acc: Account) => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],
  selectedAccount: null,

  setAccounts: (list) => set({ accounts: list }),
  setSelectedAccount: (acc) => set({ selectedAccount: acc }),
}));
