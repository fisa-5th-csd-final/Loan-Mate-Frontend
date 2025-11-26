"use client";

import { Plus } from "lucide-react";

export type Item = {
  id: string | number;
  name: string;
  amount: number;
};

export default function EditableAmountList({
  items,
  onAdd,
}: {
  items: Item[];
  onAdd: () => void;
}) {
  return (
    <div className="space-y-4">
      {items.map(item => (
        <div
          key={item.id}
          className="w-full bg-gray-100 rounded-2xl flex justify-between px-5 py-5 text-[16px]"
        >
          <span>{item.name}</span>
          <span className="text-gray-600">
            {item.amount.toLocaleString()}원
          </span>
        </div>
      ))}

      {/* 추가 버튼 */}
      <button
        onClick={onAdd}
        className="w-10 h-10 flex items-center justify-center mx-auto rounded-full border border-gray-300 text-gray-500"
      >
        <Plus size={22} />
      </button>
    </div>
  );
}
