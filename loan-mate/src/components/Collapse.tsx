"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
  contentColor?: string; // ⬅️ 추가
}

export default function Collapse({ title, children, contentColor }: CollapseProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl p-4">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[16px] font-medium text-gray-900">
          {title}
        </span>

        <ChevronDown
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          size={20}
        />
      </div>

      {/* Content */}
      {open && (
        <div className={`mt-4 text-[16px] ${contentColor ?? "text-black"}`}>
          {children}
        </div>
      )}
    </div>
  );
}
