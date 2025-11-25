'use client';

import React, { PropsWithChildren, useState } from "react";
import { ChevronDown } from "lucide-react";

type ChevronToggleProps = PropsWithChildren<{
  header: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
  showDivider?: boolean;
}>;

/**
 * 공통 화살표 토글 컴포넌트
 * - header: 헤더 영역(좌측)으로 사용할 React 노드
 * - defaultOpen: 초기 펼침 여부
 * - showDivider: 하단 구분선 표시 여부
 */
export default function ChevronToggle({
  header,
  children,
  defaultOpen = false,
  className = "",
  contentClassName = "",
  showDivider = true,
}: ChevronToggleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`w-full ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 py-3 px-4 active:opacity-80"
      >
        <div className="flex-1 min-w-0 flex items-center gap-3">{header}</div>

        <span
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown className="h-4 w-4 text-black" strokeWidth={2} />
        </span>
      </button>

      {open && (
        <div className={`px-4 pb-4 ${contentClassName}`}>
          {children}
        </div>
      )}

      {showDivider && <div className="h-px w-full bg-neutral-200" />}
    </div>
  );
}
