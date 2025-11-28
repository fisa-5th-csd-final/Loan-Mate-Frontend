"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";

import type { ApiError } from "@/lib/api/client";

import {
  fetchExpenditures,
  fetchExpenditure,
  createExpenditure,
  updateExpenditure,
  deleteExpenditure,
} from "./service";

import { expenditureKeys } from "./keys";

import type {
  ExpenditureItem,
  ExpenditureId,
  CreateExpenditurePayload,
  UpdateExpenditurePayload,
} from "./types";

// query option 타입
type ListQueryOptions = Omit<
  UseQueryOptions<ExpenditureItem[], ApiError>,
  "queryKey" | "queryFn"
>;

type DetailQueryOptions = Omit<
  UseQueryOptions<ExpenditureItem, ApiError>,
  "queryKey" | "queryFn" | "enabled"
>;

// 목록 조회 
export function useExpenditureListQuery(type?: "INCOME" | "EXPENSE") {
  return useQuery({
    queryKey: expenditureKeys.list(),
    queryFn: fetchExpenditures,
    select: (data) => {
      if (!type) return data;
      return data.filter((item) => item.type?.toUpperCase() === type);
    },
  });
}

// 생성 훅 
type CreateOptions = Omit<
  UseMutationOptions<ExpenditureItem, ApiError, CreateExpenditurePayload>,
  "mutationFn"
>;

export function useCreateExpenditureMutation(options?: CreateOptions) {
  const queryClient = useQueryClient();
  const userSuccess = options?.onSuccess;

  return useMutation<ExpenditureItem, ApiError, CreateExpenditurePayload>({
    ...options,
    mutationFn: createExpenditure,
    onSuccess: (data, variables, onMutateResult, context) => {
      void queryClient.invalidateQueries({
        queryKey: expenditureKeys.list(),
      });
      userSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// 수정 훅  
type UpdateVariables = { id: ExpenditureId; data: UpdateExpenditurePayload };

type UpdateOptions = Omit<
  UseMutationOptions<ExpenditureItem, ApiError, UpdateVariables>,
  "mutationFn"
>;

export function useUpdateExpenditureMutation(options?: UpdateOptions) {
  const queryClient = useQueryClient();
  const userSuccess = options?.onSuccess;

  return useMutation<ExpenditureItem, ApiError, UpdateVariables>({
    ...options,
    mutationFn: ({ id, data }) => updateExpenditure(id, data),
    onSuccess: (data, variables, onMutateResult, context) => {
      void queryClient.invalidateQueries({
        queryKey: expenditureKeys.list(),
      });

      void queryClient.invalidateQueries({
        queryKey: expenditureKeys.detail(variables.id),
      });

      userSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// 삭제 
type DeleteOptions = Omit<
  UseMutationOptions<void, ApiError, ExpenditureId>,
  "mutationFn"
>;

export function useDeleteExpenditureMutation(options?: DeleteOptions) {
  const queryClient = useQueryClient();
  const userSuccess = options?.onSuccess;

  return useMutation<void, ApiError, ExpenditureId>({
    ...options,
    mutationFn: deleteExpenditure,
    onSuccess: (data, id, onMutateResult, context) => {
      void queryClient.invalidateQueries({
        queryKey: expenditureKeys.list(),
      });
      void queryClient.invalidateQueries({
        queryKey: expenditureKeys.detail(id),
      });
      userSuccess?.(data, id, onMutateResult, context);
    },
  });
}
