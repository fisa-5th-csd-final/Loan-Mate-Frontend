let refreshPromise: Promise<Response> | null = null;
const bc = new BroadcastChannel("auth");

import { API } from "@/consts/ROUTES";

export async function refreshToken() {
  // 이미 다른 탭에서 refresh 중이면 기다림
  if (refreshPromise) {
    return refreshPromise;
  }

  // 브로드캐스트: refresh 시작
  bc.postMessage("refresh-start");

  refreshPromise = fetch(API.AUTH.REFRESH, {
    method: "POST",
    credentials: "include",
  }).finally(() => {
    refreshPromise = null;
    bc.postMessage("refresh-done");
  });

  return refreshPromise;
}

// 다른 탭에서 refresh 하는 동안 기다리는 기능
export function waitForRefresh() {
  return new Promise<void>((resolve) => {
    bc.onmessage = (event) => {
      if (event.data === "refresh-done") {
        resolve();
      }
    };
  });
}
