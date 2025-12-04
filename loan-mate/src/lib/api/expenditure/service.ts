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
  ExpenditureAiMessageParams,
  ExpenditureAiMessageResponse,
} from "./types";

const BASE_PATH = "/api/manual-ledgers";

export async function fetchExpenditures(): Promise<ExpenditureItem[]> {
  return apiClient.fetch<ExpenditureItem[]>(BASE_PATH);
}

export async function fetchExpenditure(id: ExpenditureId): Promise<ExpenditureItem> {
  return apiClient.fetch<ExpenditureItem>(`${BASE_PATH}/${id}`);
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
  return apiClient.fetch<SpendingRecommendResponse>(
    "/api/spending/recommended",
    { query: { year: params.year, month: params.month } }
  );
}

export async function fetchMonthlySpending(
  params: MonthlySpendingParams
): Promise<MonthlySpendingResponse> {
  return apiClient.fetch<MonthlySpendingResponse>(
    `/api/spending/${params.year}/${params.month}`
  );
}

export async function updateSpendingLimit(
  payload: SpendingLimitPayload
): Promise<void> {
  await apiClient.put("/api/spending/limits", payload);
}

function extractAiMessage(body: unknown): ExpenditureAiMessageResponse {
  if (typeof body === "string") return body;

  if (body && typeof body === "object") {
    const anyBody = body as any;

    if (typeof anyBody.data === "string") return anyBody.data;

    if (anyBody.data && typeof anyBody.data === "object") {
      const recommendation = (anyBody.data as any).recommendation;
      if (recommendation && typeof recommendation.comment === "string") {
        return recommendation.comment;
      }
    }

    if (typeof anyBody.message === "string") return anyBody.message;
  }

  throw new Error("Invalid response from AI expenditure API");
}

export async function fetchExpenditureAiMessage(
  params: ExpenditureAiMessageParams
): Promise<ExpenditureAiMessageResponse> {
  const res = await apiClient.get<
    SuccessBody<unknown> | ExpenditureAiMessageResponse
  >("/api/ai/expenditure", {
    query: { year: params.year, month: params.month },
  });

  return extractAiMessage(res);
}
