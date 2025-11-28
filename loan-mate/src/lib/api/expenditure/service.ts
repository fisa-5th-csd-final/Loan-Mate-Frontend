import { apiClient } from "@/lib/api/client";
import type { SuccessBody } from "@/../types/response";
import type {
  CreateExpenditurePayload,
  ExpenditureId,
  ExpenditureItem,
  UpdateExpenditurePayload,
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
  const { data } = await apiClient.patch<SuccessBody<ExpenditureItem>>(
    `${BASE_PATH}/${id}`,
    payload
  );
  return data;
}

export async function deleteExpenditure(id: ExpenditureId): Promise<void> {
  await apiClient.delete(`${BASE_PATH}/${id}`);
}
