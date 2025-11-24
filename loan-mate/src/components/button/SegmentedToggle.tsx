"use client";

type Option<T extends string | number> = {
  label: string;
  value: T;
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
  const selectedIndex = options.findIndex((o) => o.value === value);
  const segmentWidth = 100 / options.length;

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
        className="absolute top-1 bottom-1 rounded-full bg-[#686e75] transition-all duration-200"
        style={{
          width: `${segmentWidth}%`,
          left: `${selectedIndex * segmentWidth}%`,
        }}
      />

      {/* 옵션 렌더 */}
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`
              relative z-10 flex-1 text-center text-sm font-medium
              transition-colors duration-200
              ${isActive ? "text-white" : "text-[#6d7379]"}
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}