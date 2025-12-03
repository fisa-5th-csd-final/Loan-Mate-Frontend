'use client';

import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * 화면 섹션 제목 공통 컴포넌트
 * - 기본 스타일: 2xl, bold, text-gray-800
 * - 추가 여백/정렬은 className으로 제어
 */
export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2 className={`text-lg font-bold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
}
