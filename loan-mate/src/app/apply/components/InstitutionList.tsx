"use client";

import { useState } from "react";
import InstitutionItem from "./InstitutionItem";

const mockData = [
  { id: 1, name: "우리은행", logo: "/logo/woori.svg", checked: false },
  { id: 2, name: "IBK기업은행", logo: "/logo/ibk.svg", checked: false },
  { id: 3, name: "신한은행", logo: "/logo/shinhan.svg", status: "연결됨", checked: false },
  { id: 4, name: "하나은행", logo: "/logo/hana.svg", checked: false },
  { id: 5, name: "국민은행", logo: "/logo/kookmin.svg", checked: true }
];

export default function InstitutionList() {
  const [items, setItems] = useState(mockData);

  const handleSelectAll = () => {
    setItems(items.map((item) => ({ ...item, checked: true })));
  };

  const toggleChecked = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* 상단 헤더 */}
      <div className="flex justify-between text-sm text-gray-700">
        <span className="font-medium">추천</span>
        <button onClick={handleSelectAll} className="text-blue-600">
          전체선택
        </button>
      </div>

      {/* 리스트 */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {items.map((item) => (
          <InstitutionItem
            key={item.id}
            {...item}
            onToggle={() => toggleChecked(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
