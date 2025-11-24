"use client";
import InstitutionItem from "./InstitutionItem";
import { CircleHelp } from "lucide-react";

export default function InstitutionList({
  title,
  items,
  onToggle,
  onToggleAll
}: {
  title: string;
  items: {
    logo: string;
    name: string;
    connected?: boolean;
    checked?: boolean;
  }[];
  onToggle?: (index: number) => void;
  onToggleAll?: () => void;
}) {
  return (
    <div className="mt-8">
      {/* 섹션 타이틀 */}
      <div className="flex justify-between items-center mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[18px] font-semibold text-gray-700">{title}</span>
          <CircleHelp size={17} className="text-gray-400" />
        </div>

        {/* 전체선택 버튼 */}
        <button
          className="text-gray-400 text-[13px]"
          onClick={() => onToggleAll && onToggleAll()}
        >
          전체선택
        </button>
      </div>

      {/* 목록 */}
      <div className="flex flex-col">
        {items.map((item, idx) => (
          <InstitutionItem
            key={item.name}
            {...item}
            onToggle={() => onToggle && onToggle(idx)}
          />
        ))}
      </div>
    </div>
  );
}
