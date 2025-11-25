// src/components/loan/LoanRiskToggle.tsx
"use client";

import React, { useState, PropsWithChildren } from "react";

type LoanRiskToggleProps = PropsWithChildren<{
  /** 은행/상품 로고 안에 표시할 이니셜 텍스트 */
  logoText?: string;
  /** 로고 배경색 클래스 */
  logoBgClassName?: string;
  /** 상품 이름 */
  title: string;
  /** 위험도 라벨 (예: "위험", "보통", "양호") */
  riskLabel: string;
  /** 위험도 색상 클래스 */
  riskColorClassName?: string;
  /** 처음부터 펼쳐둘지 여부 */
  defaultOpen?: boolean;
}>;

export function LoanRiskToggle({
  logoText = "KB",
  logoBgClassName = "bg-neutral-500",
  title,
  riskLabel,
  riskColorClassName = "text-red-500",
  defaultOpen = false,
  children,
}: LoanRiskToggleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full">
      {/* 상단 행 (클릭 영역) */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 py-3 px-4 active:opacity-80"
      >
        {/* 동그란 로고 */}
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full ${logoBgClassName}`}
        >
          <span className="text-[14px] font-semibold text-yellow-200">
            {logoText}
          </span>
        </div>

        {/* 상품명 */}
        <span className="flex-1 text-[15px] font-semibold text-slate-600 truncate">
          {title}
        </span>

        {/* 위험도 라벨 */}
        <span
          className={`mr-1 text-[15px] font-semibold ${riskColorClassName}`}
        >
          {riskLabel}
        </span>

        {/* 아래 화살표 아이콘 (회전 애니메이션) */}
        <span
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            className="h-4 w-4 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* 펼쳐지는 영역 */}
      {open && (
        <div className="px-4 pb-4 text-[13px] leading-relaxed text-slate-500">
          {children ?? (
            <p>
              여기 아래에는 해당 대출 상품에 대한 상세 설명, 금리, 한도, 상환 방식,
              추천 행동(상환/대환) 등을 넣으면 좋아.
            </p>
          )}
        </div>
      )}

      {/* 구분선 */}
      <div className="h-px w-full bg-neutral-200" />
    </div>
  );
}