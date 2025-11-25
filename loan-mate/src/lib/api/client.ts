import { refreshToken, waitForRefresh } from "@/lib/api/auth/refreshManager";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type QueryValue = string | number | boolean | null | undefined;

export type RequestOptions = Omit<RequestInit, "method" | "body" | "headers"> & {
  method?: HttpMethod;
  query?: Record<string, QueryValue>;
  body?: unknown;
  headers?: HeadersInit;
  token?: string;
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

const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");

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
  const { query, body, method = "GET", ...fetchOptions } = options;
  const url = buildUrl(path, query);
  const headers = resolveHeaders(options);

  const preparedBody =
    body && headers.get("Content-Type") === "application/json"
      ? JSON.stringify(body)
      : (body as BodyInit | null | undefined);

  let response = await fetch(url, {
    method,
    headers,
    body: preparedBody,
    credentials: "include",
    ...fetchOptions,
  });

  // 액세스 만료 시 재발급 요청 //
  if (response.status === 401) {
    console.log("401 detected. Refreshing token...");

    // 다른 탭에서 refresh 중인지 확인
    const refreshResponse = await refreshToken();

    if (refreshResponse.ok) {
      // refresh 끝났으면 원래 요청 재시도
      response = await fetch(url, {
        method,
        headers,
        body: preparedBody,
        credentials: "include",
        ...fetchOptions,
      });
    } else {
      window.location.href = "/login";
      return;
    }
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }

  return data as T;
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
};

