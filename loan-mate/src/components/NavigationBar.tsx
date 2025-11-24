// Reusable top navigation with optional title and back action.
"use client";

import { useRouter } from "next/navigation";

type NavigationBarProps = {
  title?: string;
  showBack?: boolean;
};

export default function NavigationBar({ title, showBack = true }: NavigationBarProps) {
  const router = useRouter();

  return (
    <div className="relative flex h-14 items-center">
      {showBack && (
        <button
          onClick={() => router.back()}
          className="absolute left-0 flex h-10 w-10 items-center justify-center text-gray-700"
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

      {title && (
        <h1 className="w-full text-center text-lg font-semibold text-gray-800">{title}</h1>
      )}
    </div>
  );
}
