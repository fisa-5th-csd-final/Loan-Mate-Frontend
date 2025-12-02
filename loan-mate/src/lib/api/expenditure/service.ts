import { apiClient } from "@/lib/api/client";
import type { SuccessBody } from "@/../types/response";
import type {
  CreateExpenditurePayload,
  ExpenditureId,
  ExpenditureItem,
  UpdateExpenditurePayload,
  SpendingRecommendParams,
  SpendingRecommendResponse,
  MonthlySpendingParams,
  MonthlySpendingResponse,
  SpendingLimitPayload,
} from "./types";

const BASE_PATH = "/api/manual-ledgers";

export async function fetchExpenditures(): Promise<ExpenditureItem[]> {
  const { data } = await apiClient.get<SuccessBody<ExpenditureItem[]>>(BASE_PATH);
  return data;
}

export async function fetchExpenditure(id: ExpenditureId): Promise<ExpenditureItem> {
  const { data } = await apiClient.get<SuccessBody<ExpenditureItem>>(
    `${BASE_PATH}/${id}`
  );
  return data;
}

export async function createExpenditure(
  payload: CreateExpenditurePayload
): Promise<ExpenditureItem> {
  const { data } = await apiClient.post<SuccessBody<ExpenditureItem>>(
    BASE_PATH,
    payload
  );
  return data;
}

export async function updateExpenditure(
  id: ExpenditureId,
  payload: UpdateExpenditurePayload
): Promise<ExpenditureItem> {
  const { data } = await apiClient.put<SuccessBody<ExpenditureItem>>(
    `${BASE_PATH}/${id}`,
    payload
  );
  return data;
}

export async function deleteExpenditure(id: ExpenditureId): Promise<void> {
  await apiClient.delete(`${BASE_PATH}/${id}`);
}

export async function fetchSpendingRecommend(
  params: SpendingRecommendParams
): Promise<SpendingRecommendResponse> {
  const res = await apiClient.get<
    SuccessBody<SpendingRecommendResponse> | SpendingRecommendResponse
  >(
    "/api/spending/recommended",
    { query: { year: params.year, month: params.month } }
  );
  
  return (res as SuccessBody<SpendingRecommendResponse>)?.data
    ? (res as SuccessBody<SpendingRecommendResponse>).data
    : (res as SpendingRecommendResponse);
}

export async function fetchMonthlySpending(
  params: MonthlySpendingParams
): Promise<MonthlySpendingResponse> {
  const res = await apiClient.get<
    SuccessBody<MonthlySpendingResponse> | MonthlySpendingResponse
  >(`/api/spending/${params.year}/${params.month}`);

  return (res as SuccessBody<MonthlySpendingResponse>)?.data
    ? (res as SuccessBody<MonthlySpendingResponse>).data
    : (res as MonthlySpendingResponse);
}

export async function updateSpendingLimit(
  payload: SpendingLimitPayload
): Promise<void> {
  await apiClient.put("/api/spending/limits", payload);
}
