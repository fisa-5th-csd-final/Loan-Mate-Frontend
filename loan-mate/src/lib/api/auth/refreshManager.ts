let isRefreshing = false;
let refreshPromise: Promise<Response> | null = null;
const bc = new BroadcastChannel("auth");

import { API } from "@/consts/ROUTES";

export async function refreshToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  bc.postMessage("refresh-start");

  const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "").replace(/\/$/, "");

  refreshPromise = fetch(`${BASE_URL}${API.AUTH.REFRESH}`, {
    method: "POST",
    credentials: "include",
  }).finally(() => {
    isRefreshing = false;
    refreshPromise = null;
    bc.postMessage("refresh-done");
  });

  return refreshPromise;
}


// 다른 탭에서 refresh 하는 동안 기다리는 기능
export function waitForRefresh() {
  return new Promise<void>((resolve) => {

    // 이미 refresh 끝난 상태라면 즉시 resolve
    if (!isRefreshing) {
      resolve();
      return;
    }

    // 갱신 중이면 메시지로 기다림
    const handler = (event: MessageEvent) => {
      if (event.data === "refresh-done") {
        bc.removeEventListener("message", handler);
        resolve();
      }
    };

    bc.addEventListener("message", handler);
  });
}
