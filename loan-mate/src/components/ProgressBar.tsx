"use client";

interface ProgressBarProps {
  label: string;
  value: number; // 0 ~ 100 (%)
}

/**
 * 진행률 바 컴포넌트
 * @param label - 상단 라벨 텍스트
 * @param value - 진행률 값 (0~100)
 */
export default function ProgressBar({ label, value }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value)); // 0~100 사이 값 보정

  return (
    <div className="w-full">
      {/* 상단 라벨 */}
      <p className="text-gray-600 text-lg mb-2">{label}</p>

      {/* Progress Bar Wrapper */}
      <div className="w-full h-8 bg-gray-500/80 rounded-full overflow-hidden flex">
        {/* 채워진 영역 */}
        <div
          className="bg-[#4B8DF8] transition-all duration-300"
          style={{ width: `${safeValue}%` }}
        />

        {/* 남은 영역 (자동으로 flex-grow) */}
        <div className="bg-gray-500 flex-1" />
      </div>
    </div>
  );
}
