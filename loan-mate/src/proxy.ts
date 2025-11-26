import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
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

  // 보호 페이지 접근 + 비로그인 상태 → /login
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
