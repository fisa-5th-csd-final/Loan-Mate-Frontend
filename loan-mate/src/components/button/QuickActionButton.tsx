"use client";

import { ChevronRight } from "lucide-react";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface QuickActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description: string;
  leading?: ReactNode;
}

/**
 * 퀵 액션 버튼 컴포넌트
 * 제목과 설명이 포함된 버튼으로, 우측에 화살표 아이콘이 표시됨
 */
export default function QuickActionButton({
  title,
  description,
  leading,
  className,
  ...props
}: QuickActionButtonProps) {
  return (
    <button
      type="button"
      className={`w-full flex items-start justify-between p-5 bg-white rounded-2xl shadow-sm hover:bg-gray-50 transition ${className || ''}`}
      {...props}
    >
      <div className="flex items-start gap-3 flex-1">
        {/* 왼쪽 아이콘/이미지 */}
        {leading && (
          <div className="flex-shrink-0">
            {leading}
          </div>
        )}

        {/* 텍스트 영역 */}
        <div className="text-left">
          <div className="text-lg font-bold text-gray-900">{title}</div>
          <div className="mt-1 text-sm text-gray-500 leading-5">{description}</div>
        </div>
      </div>

      {/* 아이콘 */}
      <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
    </button>
  );
}
