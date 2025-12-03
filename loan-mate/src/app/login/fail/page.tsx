"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading/LoadingSpinner";

export default function LoginFailPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-xl font-bold mb-2">로그인 실패</h1>
      <p className="text-gray-600 mb-6 leading-relaxed">
        로그인 과정에서 오류가 발생했습니다.<br />
        잠시 후 로그인 페이지로 이동합니다.
      </p>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner size="md" label="로그인 페이지로 이동 중..." />
      </div>
    </div>
  );
}
