"use client";

import { useMemo } from "react";

type Option<T extends string | number> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type Props<T extends string | number> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/**
 * 세그먼티드 토글 버튼 컴포넌트
 * 여러 옵션 중 하나를 선택할 수 있는 토글 버튼
 * 선택된 옵션에 따라 하이라이트가 이동
 */
export default function SegmentedToggle<T extends string | number>({
  options,
  value,
  onChange,
  className = "",
}: Props<T>) {
  const selectedIndex = useMemo(() => options.findIndex((o) => o.value === value), [options, value]);
  const segmentWidth = useMemo(() => 100 / options.length, [options.length]);

  return (
    <div
      className={`
        relative flex items-center justify-between
        bg-white
        rounded-full
        shadow-sm
        px-1 py-1
        border border-[#e3e8ec]
        select-none
        ${className}
      `}
    >
      {/* 움직이는 하이라이트 */}
      <span
        className="absolute rounded-full bg-[#686e75] transition-all duration-200 h-full"
        style={{
          width: `${segmentWidth}%`,
          left: `${selectedIndex * segmentWidth}%`,
        }}
      />

      {/* 옵션 렌더 */}
      {options.map((opt) => {
        const isActive = opt.value === value;
        const isDisabled = opt.disabled;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => !isDisabled && onChange(opt.value)}
            disabled={isDisabled}
            className={`
              relative z-10 flex-1 text-center text-sm font-medium
              transition-colors duration-200
              ${isActive ? "text-white" : ""}
              ${!isActive && !isDisabled ? "text-[#6d7379]" : ""}
              ${isDisabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}