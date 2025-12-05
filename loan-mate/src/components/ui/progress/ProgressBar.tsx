"use client";

interface ProgressBarProps {
  label: string;
  value: number; // 0 ~ 100 (%)
  color?: string; // Optional: Custom color
}

/**
 * 진행률 바 컴포넌트
 * @param label - 상단 라벨 텍스트
 * @param value - 진행률 값 (0~100)
 * @param color - (Optional) 진행바 색상 (기본값: blue)
 */
export default function ProgressBar({
  label,
  value,
  color = "#2789F4",
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value)); // 0~100 사이 값 보정

  return (
    <div className="w-full">
      {/* 상단 라벨 */}
      <p className="text-gray-600 text-[15px]">{label}</p>

      {/* Progress Bar Wrapper */}
      <div className="w-full h-4 bg-gray-500/80 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${safeValue}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
