"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginFailPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 1500); // 1.5초 뒤 자동 이동

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-2">로그인 실패</h1>
      <p className="text-gray-600 mb-4">
        로그인 과정에서 오류가 발생했습니다.<br />잠시 후 로그인 페이지로 이동합니다.
      </p>

      <a
        href="/login"
        className="text-blue-600 underline"
      >
        바로 로그인 페이지로 이동하기
      </a>
    </div>
  );
}
