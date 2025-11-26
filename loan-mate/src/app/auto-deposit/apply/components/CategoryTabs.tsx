"use client";

import { useState } from "react";

const tabs = ["추천", "신용", "담보", "부동산"];

export default function CategoryTabs() {
  const [active, setActive] = useState("추천");

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              ${isActive ? "bg-blue-600 text-white" : "bg-[#EDEFF2] text-gray-600"}
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
