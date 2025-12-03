import { refreshToken, waitForRefresh } from "@/lib/api/auth/refreshManager";
import { SuccessBody } from "@/../types/response";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type QueryValue = string | number | boolean | null | undefined;

let authFailHandler: null | (() => void) = null;
let globalErrorHandler: null | ((error: ApiError) => void) = null;

export function setAuthFailHandler(fn: () => void) {
  authFailHandler = fn;
}

export function setGlobalErrorHandler(fn: (error: ApiError) => void) {
  globalErrorHandler = fn;
}

export type RequestOptions = Omit<RequestInit, "method" | "body" | "headers"> & {
  method?: HttpMethod;
  query?: Record<string, QueryValue>;
  body?: unknown;
  headers?: HeadersInit;
  token?: string;
  skipGlobalErrorHandler?: boolean;
};

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `Request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "").replace(/\/$/, "");
const defaultHeaders: HeadersInit = {
  Accept: "application/json",
};

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  const originFallback =
    typeof window !== "undefined" ? window.location.origin : "";
  const url = new URL(`${BASE_URL || originFallback}${trimmed}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

function resolveHeaders(options: RequestOptions) {
  const headers = new Headers({ ...defaultHeaders, ...options.headers });
  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }
  const isJsonBody =
    options.body !== undefined &&
    options.body !== null &&
    !(options.body instanceof FormData) &&
    !(options.body instanceof Blob);
  if (isJsonBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return headers;
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  if (response.status === 204) return null;
  if (isJson) {
    return await response.json();
  }
  return await response.text();
}

export async function request<T = unknown>(path: string, options: RequestOptions = {}) {
  const { query, body, method = "GET", skipGlobalErrorHandler, ...fetchOptions } = options;
  const url = buildUrl(path, query);
  const headers = resolveHeaders(options);
  const preparedBody =
    body && headers.get("Content-Type") === "application/json"
      ? JSON.stringify(body)
      : (body as BodyInit | null | undefined);

  try {
    let response = await fetch(url, {
      ...fetchOptions,
      method,
      headers,
      credentials: "include",
      body: preparedBody
    });

    // 액세스 재발급 과정
    if (response.status === 403) {
      const refreshResponse = await refreshToken();
      await waitForRefresh();

      if (!refreshResponse || !refreshResponse.ok) {
        if (authFailHandler) authFailHandler();
        else window.location.href = "/login";
        throw new Error("Refresh expired");
      }

      // 안전한 쿼리 파라미터 추가 방식
      const retryUrlObj = new URL(url);
      retryUrlObj.searchParams.set('_t', Math.random().toString());
      const retryUrl = retryUrlObj.toString();

      response = await fetch(retryUrl, {
        ...fetchOptions,
        method,
        headers,
        credentials: 'include',
        body: preparedBody,
        cache: 'no-store',
      });
    }

    const data = await parseResponse(response);

    if (!response.ok) {
      throw new ApiError(response.status, data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError && !skipGlobalErrorHandler && globalErrorHandler) {
      globalErrorHandler(error);
    }
    throw error;
  }
}

export const apiClient = {
  get<T = unknown>(path: string, options?: Omit<RequestOptions, "method" | "body">) {
    return request<T>(path, { ...options, method: "GET" });
  },
  post<T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) {
    return request<T>(path, { ...options, method: "POST", body });
  },
  put<T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) {
    return request<T>(path, { ...options, method: "PUT", body });
  },
  patch<T = unknown>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) {
    return request<T>(path, { ...options, method: "PATCH", body });
  },
  delete<T = unknown>(path: string, options?: Omit<RequestOptions, "method" | "body">) {
    return request<T>(path, { ...options, method: "DELETE" });
  },
  // Helper to unwrap SuccessBody automatically
  async fetch<T>(path: string, options?: RequestOptions): Promise<T> {
    const response = await request<SuccessBody<T> | T>(path, options);
    if (response && typeof response === 'object' && 'data' in response) {
      return (response as SuccessBody<T>).data;
    }
    return response as T;
  }
};