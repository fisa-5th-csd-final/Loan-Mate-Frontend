"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
  contentColor?: string;
  defaultOpen?: boolean;
}

export default function Collapse({
  title,
  children,
  contentColor,
  defaultOpen = false,
}: CollapseProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[16px] font-medium text-gray-900">
          {title}
        </span>

        <ChevronDown
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
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