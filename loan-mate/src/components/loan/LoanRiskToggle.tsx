// src/components/loan/LoanRiskToggle.tsx
"use client";

import React, { PropsWithChildren } from "react";
import ChevronToggle from "@/components/ui/utility/ChevronToggle";

import Image from "next/image";

type LoanRiskToggleProps = PropsWithChildren<{
  /** 은행/상품 로고 안에 표시할 이니셜 텍스트 */
  logoText?: string;
  /** 로고 이미지 URL (있으면 텍스트 대신 표시) */
  logoUrl?: string;
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
  children: React.ReactNode;
}>;

export function LoanRiskToggle({
  logoText = "우리",
  logoUrl,
  logoBgClassName = "bg-blue-600",
  title,
  riskLabel,
  riskColorClassName = "text-red-500",
  defaultOpen = false,
  children,
}: LoanRiskToggleProps) {
  const header = (
    <>
      <div
        className={`relative flex h-8 w-8 items-center justify-center rounded-full overflow-hidden ${logoBgClassName}`}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-[14px] font-semibold text-white">
            {logoText}
          </span>
        )}
      </div>

      <span className="flex-1 text-[15px] font-semibold text-slate-600 truncate">
        {title}
      </span>

      <span className={`mr-1 text-[15px] font-semibold ${riskColorClassName}`}>
        {riskLabel}
      </span>
    </>
  );

  return (
    <ChevronToggle
      header={header}
      defaultOpen={defaultOpen}
      contentClassName="text-[13px] leading-relaxed text-slate-500"
    >
      {children}
    </ChevronToggle>
  );
}
