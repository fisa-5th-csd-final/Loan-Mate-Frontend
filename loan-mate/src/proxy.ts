import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  // 정확히 /login 페이지만 로그인 페이지로 간주
  const isLoginPage = pathname === "/login";

  // /login/success, /login/fail 등 OAuth callback 페이지는 예외 처리
  const isAuthCallback = pathname.startsWith("/login/");

  // 보호 페이지 (공주님이 필요한 만큼 여기에 추가 가능)
  const isProtectedPage = pathname === "/";

  // 1) OAuth callback 페이지는 middleware가 절대 방해하면 안 됨
  if (isAuthCallback) {
    return NextResponse.next();
  }

  // 2) 로그인된 상태에서 /login 접근하면 홈으로 이동
  if (accessToken && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 3) 보호 페이지 접근 + 비로그인 상태 → /login
  if (isProtectedPage && !accessToken) {
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
