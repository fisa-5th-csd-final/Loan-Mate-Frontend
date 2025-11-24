"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonSize = "sm" | "md" | "lg";

type CommonButtonProps = {
  label: string;
  colorClassName?: string;
  size?: ButtonSize;
  widthClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * 모든 버튼 컴포넌트에서 공통으로 사용하는 컴포넌트
 * 색상, 크기, 너비 등을 props로 받아서 커스터마이징 가능
 * 새로운 버튼이 필요할 때 이 컴포넌트를 확장하여 사용
 */
export default function CommonButton({
  label,
  colorClassName,
  size = "md",
  widthClassName = "w-[340px]",
  className = "",
  ...props
}: CommonButtonProps) {
  const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-9 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };

  const colorClasses =
    colorClassName ?? "bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-500";

  return (
    <button
      className={`flex flex-col items-center justify-center gap-2 rounded-md ${widthClassName} ${sizeClasses[size]} text-white shadow-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${colorClasses} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
