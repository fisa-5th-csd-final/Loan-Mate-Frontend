"use client";

import { useEffect, type ReactNode } from "react";
import { useAuthNavigation } from "@/lib/api/auth/navigation";
import { ToastProvider, useToast } from "@/context/ToastContext";
import { setGlobalErrorHandler, setAuthFailHandler, ApiError } from "@/lib/api/client";
import { getFriendlyErrorMessage } from "@/consts/ERROR_MESSAGES";
import ReactQueryProvider from "./ReactQueryProvider";

interface Props {
  children: ReactNode;
}

function ClientLogic({ children }: { children: ReactNode }) {
  const { goLogin } = useAuthNavigation();
  const { showToast } = useToast();

  useEffect(() => {
    // 인증 실패 시 로그인 페이지로 이동
    setAuthFailHandler(() => goLogin());

    // API 전역 에러 핸들러 (403 재시도 실패 포함)
    setGlobalErrorHandler((error: ApiError | Error | unknown) => {
      let message = "알 수 없는 오류가 발생했습니다.";

      if (error instanceof ApiError) {
        const body = error.body as { error?: string; message?: string };
        // 백엔드 에러 코드(body.error)를 프론트엔드 친화적 메시지로 변환
        // 매핑된 게 없으면 백엔드 메시지(body.message) 사용, 그것도 없으면 기본값
        message = getFriendlyErrorMessage(body?.error, body?.message || message);
      } else if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      // 토스트 띄우기
      showToast(message, "error");
    });
  }, [goLogin, showToast]);

  return <>{children}</>;
}

export default function ClientProviders({ children }: Props) {
  return (
    <ReactQueryProvider>
      <ToastProvider>
        <ClientLogic>{children}</ClientLogic>
      </ToastProvider>
    </ReactQueryProvider>
  );
}
