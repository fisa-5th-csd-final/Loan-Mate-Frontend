"use client";

interface Segment {
  label: string;
  percent: number; // 0~1 비율
  color: string;   // tailwind 색상 클래스
}

interface SegmentProgressBarProps {
  segments: Segment[];
}

/**
 * 여러 개 조각으로 구성된 Segment ProgressBar
 */
export default function SegmentProgressBar({ segments }: SegmentProgressBarProps) {
  return (
    <div className="flex w-full overflow-hidden rounded-full text-xs font-medium">
      {segments.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className={`${item.color} text-white text-center py-1 px-2 truncate ${
            index > 0 ? "border-l border-white/40" : ""
          }`}
          style={{ flexGrow: item.percent }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
