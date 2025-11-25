"use client";

import { useState } from "react";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
  contentColor?: string; // ← 색상 props 추가
}

export default function Collapse({ title, children, contentColor = "text-blue-600" }: CollapseProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl p-4">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[16px] font-medium text-gray-900">{title}</span>

        <button
          type="button"
          className={`text-gray-400 text-[20px] transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ⌃
        </button>
      </div>

      {/* Content */}
      {open && (
        <div className={`mt-4 text-[16px] ${contentColor}`}>
          {children}
        </div>
      )}
    </div>
  );
}
