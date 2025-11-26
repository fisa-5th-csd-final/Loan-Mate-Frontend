"use client";

interface RiskAverageBoxProps {
  /** 예: 10.2 (백분율 값, %는 내부에서 붙임) */
  percentage: number;
  /** 예: "보통 수준" */
  levelText: string;
  /** 이모지나 이미지 대신 쓸 문자 */
  emoji?: string;
  /** 상단 굵은 텍스트 앞에 붙는 레이블 (기본: "평균") */
  label?: string;
}

export default function RiskAverageBox({
  percentage,
  levelText,
  emoji = "😊",
  label = "평균",
}: RiskAverageBoxProps) {
  return (
    <div className="w-full rounded-[28px] bg-[#E8F4FF] px-5 py-4 flex items-center gap-4">
      {/* 왼쪽 이모지 */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#FFE9B8] shadow-sm text-3xl">
        <span className="leading-none">{emoji}</span>
      </div>

      {/* 오른쪽 텍스트 */}
      <div className="flex flex-col">
        <p className="text-[20px] font-semibold text-gray-900">
          {label}{" "}
          <span>
            {percentage}
            <span className="text-[18px]"> %</span>
          </span>
        </p>
        <p className="mt-1 text-[16px] text-gray-500">{levelText}</p>
      </div>
    </div>
  );
}