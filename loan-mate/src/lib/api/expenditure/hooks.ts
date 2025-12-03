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
  fetchSpendingRecommend,
  fetchMonthlySpending,
  updateSpendingLimit,
  fetchExpenditureAiMessage,
} from "./service";

import { expenditureKeys } from "./keys";

import type {
  ExpenditureItem,
  ExpenditureId,
  CreateExpenditurePayload,
  UpdateExpenditurePayload,
  SpendingRecommendParams,
  SpendingRecommendResponse,
  MonthlySpendingParams,
  MonthlySpendingResponse,
  SpendingLimitPayload,
  ExpenditureAiMessageParams,
  ExpenditureAiMessageResponse,
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

type RecommendOptions = Omit<
  UseQueryOptions<
    SpendingRecommendResponse,
    ApiError,
    SpendingRecommendResponse,
    ReturnType<typeof expenditureKeys.spendingRecommend>
  >,
  "queryKey" | "queryFn"
>;


function getRecommendCache(params: SpendingRecommendParams): SpendingRecommendResponse | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(
      `spending-recommend-${params.year}-${params.month}`
    );
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SpendingRecommendResponse;

    if (
      typeof parsed.variableSpendingBudget === "number" &&
      parsed.categoryRecommendation &&
      typeof parsed.categoryRecommendation === "object"
    ) {
      return parsed;
    }
  } catch {}

  return null;
}

export function useSpendingRecommendQuery(
  params: SpendingRecommendParams,
  userOptions?: { onSuccess?: (data: SpendingRecommendResponse) => void }
) {
  const queryClient = useQueryClient();
  const cached = getRecommendCache(params);
  const storageKey = `spending-recommend-${params.year}-${params.month}`;

  const query = useQuery({
    queryKey: expenditureKeys.spendingRecommend(params.year, params.month),
    queryFn: () => fetchSpendingRecommend(params),
    ...(cached ? { initialData: cached } : {}),
  });

  if (query.isSuccess) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(query.data));
    } catch {}

    userOptions?.onSuccess?.(query.data);
  }

  return query;
}

function getAiMessageCache(params: ExpenditureAiMessageParams): ExpenditureAiMessageResponse | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(
      `ai-expenditure-${params.year}-${params.month}`
    );
    if (!raw) return null;

    return JSON.parse(raw) as ExpenditureAiMessageResponse;
  } catch {}

  return null;
}

export function useExpenditureAiMessageQuery(
  params: ExpenditureAiMessageParams,
  userOptions?: { onSuccess?: (data: ExpenditureAiMessageResponse) => void }
) {
  const cached = getAiMessageCache(params);
  const storageKey = `ai-expenditure-${params.year}-${params.month}`;

  const query = useQuery({
    queryKey: expenditureKeys.aiMessage(params.year, params.month),
    queryFn: () => fetchExpenditureAiMessage(params),
    ...(cached ? { initialData: cached } : {}),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  if (query.isSuccess) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(query.data));
    } catch {}

    userOptions?.onSuccess?.(query.data);
  }

  return query;
}

type MonthlySpendingOptions = Omit<
  UseQueryOptions<
    MonthlySpendingResponse,
    ApiError,
    MonthlySpendingResponse,
    ReturnType<typeof expenditureKeys.monthlySpending>
  >,
  "queryKey" | "queryFn"
>;

export function useMonthlySpendingQuery(
  params: MonthlySpendingParams,
  options?: MonthlySpendingOptions
) {
  return useQuery({
    queryKey: expenditureKeys.monthlySpending(params.year, params.month),
    queryFn: () => fetchMonthlySpending(params),
    ...options,
  });
}

type UpdateLimitOptions = Omit<
  UseMutationOptions<void, ApiError, SpendingLimitPayload>,
  "mutationFn"
>;

export function useUpdateSpendingLimitMutation(options?: UpdateLimitOptions) {
  return useMutation<void, ApiError, SpendingLimitPayload>({
    ...options,
    mutationFn: updateSpendingLimit,
  });
}
