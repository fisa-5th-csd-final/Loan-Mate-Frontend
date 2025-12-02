"use client";

import { useQueryClient } from "@tanstack/react-query";
import { accountKeys } from "./accountKeys";
import type { AccountDetail } from "./types";

export function useSelectFromAccount() {
  const queryClient = useQueryClient();

  const select = (account: AccountDetail) => {
    queryClient.setQueryData(accountKeys.selectedFrom, account);
  };

  const get = () =>
    queryClient.getQueryData<AccountDetail | null>(accountKeys.selectedFrom) ??
    null;

  return { select, get };
}

export function useSelectToAccount() {
  const queryClient = useQueryClient();

  const select = (account: AccountDetail) => {
    queryClient.setQueryData(accountKeys.selectedTo, account);
  };

  const get = () =>
    queryClient.getQueryData<AccountDetail | null>(accountKeys.selectedTo) ??
    null;

  return { select, get };
}
