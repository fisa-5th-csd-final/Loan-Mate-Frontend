import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonSize = "sm" | "md" | "lg";

type CommonButtonProps = {
  label: string;
  colorClassName?: string;
  textColorClassName?: string;
  size?: ButtonSize;
  widthClassName?: string;
  disabled?: boolean;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * 모든 버튼 컴포넌트에서 공통으로 사용하는 컴포넌트
 * 색상, 크기, 너비 등을 props로 받아서 커스터마이징 가능
 * 새로운 버튼이 필요할 때 이 컴포넌트를 확장하여 사용
 */
export default function CommonButton({
  label,
  colorClassName,
  textColorClassName = "text-white",
  size = "md",
  widthClassName = "w-full",
  className = "",
  href,
  disabled,
  ...props
}: CommonButtonProps) {
  const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-9 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };

  const colorClasses =
    colorClassName ?? "bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-500";

  const baseClasses = `flex flex-col items-center justify-center gap-2 rounded-md ${widthClassName} ${sizeClasses[size]} ${textColorClassName} shadow-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${colorClasses} ${className}`;

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={baseClasses}
        {...props as AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      className={baseClasses}
      disabled={disabled}
      {...props as ButtonHTMLAttributes<HTMLButtonElement>}
    >
      {label}
    </button>
  );
}
