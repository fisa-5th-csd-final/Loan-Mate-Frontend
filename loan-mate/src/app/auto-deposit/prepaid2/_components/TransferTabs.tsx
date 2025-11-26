"use client";

import { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function TransferTabs({ value, onChange }: Props) {
  const tabs = [
    { label: "추천", value: "recommended" },
    { label: "자주", value: "often" },
    { label: "내계좌", value: "mine" },
  ];

  return (
    <div className="bg-[#f3f5f7] w-full rounded-2xl py-1 px-2 flex items-center text-sm font-medium text-gray-500">
      {tabs.map((tab, index) => (
        <>
          {/* 버튼 */}
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              px-4 py-2 rounded-xl flex-1 text-center transition
              ${value === tab.value ? "bg-white shadow-sm text-black" : "bg-transparent text-[#9ca3af]"}
            `}
          >
            {tab.label}
          </button>

          {/* 세로 구분선 - 마지막 버튼에는 표시 X */}
          {index < tabs.length - 1 && (
            <div className="w-px h-4 bg-gray-300 mx-1" />
          )}
        </>
      ))}
    </div>
  );
}
