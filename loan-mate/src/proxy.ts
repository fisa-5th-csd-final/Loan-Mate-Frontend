import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { API } from "@/consts/ROUTES";

async function refreshTokenServer(refreshToken: string, baseUrl: string) {
  return fetch(`${baseUrl}${API.AUTH.REFRESH}`, {
    method: "POST",
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });
}

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const pathname = req.nextUrl.pathname;

  const isLoginPage = pathname === "/login";

  // /login/success, /login/fail 등 OAuth callback 페이지는 예외 처리
  const isAuthCallback = pathname.startsWith("/login/");

  const isProtectedPage = pathname === "/main";

  if (isAuthCallback) {
    return NextResponse.next();
  }

  // 로그인된 상태에서 /login 접근하면 홈으로 이동
  if (accessToken && isLoginPage) {
    return NextResponse.redirect(new URL("/main", req.url));
  }

  // 보호 페이지 접근 + 비로그인 상태
  if (isProtectedPage && !accessToken) {
    // 리프레시 토큰이 있다면 재발급 시도
    if (refreshToken) {
      try {
        const backendUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
        const refreshResponse = await refreshTokenServer(refreshToken, backendUrl);

        if (refreshResponse.ok) {
          // 재발급 성공 시, 백엔드에서 받은 쿠키를 클라이언트에 설정하고 진행
          const res = NextResponse.next();
          const setCookie = refreshResponse.headers.get("Set-Cookie");

          if (setCookie) {
            res.headers.set("Set-Cookie", setCookie);
          }

          return res;
        }
      } catch (error) {
        console.error("Middleware refresh error:", error);
      }
    }

    // 리프레시 토큰이 없거나 재발급 실패 시 로그인 페이지로 이동
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 기본 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
