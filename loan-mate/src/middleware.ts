import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  const isLoginPage = pathname.startsWith("/login");
  const isProtectedPage = pathname === "/";   

  // 로그인된 상태에서 /login 접근 금지
  if (accessToken && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 메인 페이지 접근 + 비로그인 상태 → /login
  if (isProtectedPage && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico).*)",
    "/login",      // 로그인 페이지 체크
    "/login/:path*", // success, fail도 포함
  ],
};
