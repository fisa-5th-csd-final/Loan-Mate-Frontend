"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type NavigationBarProps = {
  title?: string;
  showBack?: boolean;
  right?: ReactNode;
};

/**
 * 뒤로가기 버튼과 제목을 포함한 상단 네비게이션 바 컴포넌트
 */
export default function NavigationBar({
  title,
  showBack = true,
  right,
}: NavigationBarProps) {
  const router = useRouter();

  return (
    <header className="relative flex h-15 items-center bg-white px-2">

      {/* 뒤로가기 */}
      {showBack && (
        <button
          onClick={() => router.back()}
          className="absolute left-1 flex h-10 w-10 items-center justify-center text-gray-700"
          aria-label="뒤로가기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* 제목 */}
      <h1 className="mx-auto pointer-events-none text-[15px] font-medium text-gray-900">
        {title}
      </h1>

      {/* 오른쪽 영역 */}
      {right && (
        <div className="absolute right-4 flex items-center h-10">
          {right}
        </div>
      )}
    </header>
  );
}
