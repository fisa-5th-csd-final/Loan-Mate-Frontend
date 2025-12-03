"use client";

import { Trash2, Plus } from "lucide-react";
import { useState, useRef } from "react";
import type { ConsumptionCategoryKey } from "@/models/expenditure-limit";

export type Item = {
  id: string | number;
  name: string;
  amount: number;
  category?: ConsumptionCategoryKey;
};

interface Props {
  items: Item[];
  onAdd: () => void;
  onDelete?: (id: Item["id"]) => void;
  onEdit?: (item: Item) => void;
}

export default function EditableAmountList({ items, onAdd, onDelete, onEdit }: Props) {
  const [activeId, setActiveId] = useState<Item["id"] | null>(null);
  const [dragX, setDragX] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  const handlePointerDown = (id: Item["id"], clientX: number) => {
    dragging.current = true;
    setActiveId(id);
    startX.current = clientX;
    setDragX(0);
  };

  const handlePointerMove = (clientX: number) => {
    if (!dragging.current) return;
    const delta = clientX - startX.current;
    setDragX(Math.max(-140, Math.min(delta, 0)));
  };
  const handlePointerUp = (item: Item) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (dragX < -80 && onDelete) {
      onDelete(item.id);
    } else if (Math.abs(dragX) < 10 && onEdit) {
      onEdit(item);
    }
    setActiveId(null);
    setDragX(0);
  };

  return (
    <div className="space-y-4">

      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <div key={item.id} className="relative">

            {/* Swipe delete background */}
            <div className="absolute inset-0 flex items-center justify-end pr-5 rounded-2xl bg-red-100 text-red-600 pointer-events-none">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Trash2 size={16} />
                삭제
              </div>
            </div>

            {/* Foreground card */}
            <div
              className="relative w-full bg-gray-100 rounded-2xl flex justify-between items-center px-5 py-5 text-[16px] select-none"
              style={{
                transform: `translateX(${isActive ? dragX : 0}px)`,
                transition: dragging.current ? "none" : "transform 0.2s ease",
              }}
              onPointerDown={(e) => handlePointerDown(item.id, e.clientX)}
              onPointerMove={(e) => handlePointerMove(e.clientX)}
              onPointerUp={() => handlePointerUp(item)}
              onPointerLeave={() => (dragging.current = false)}
            >
              <span>{item.name}</span>

              <div className="flex items-center gap-3">
                <span className="text-gray-600">{item.amount.toLocaleString()}원</span>

                {/* Always-visible delete button */}
                {onDelete && (
                  <button
                    className="p-2 rounded-full hover:bg-red-100 active:bg-red-200 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onDelete?.(item.id);
                    }}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    onPointerUp={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={onAdd}
        className="w-10 h-10 flex items-center justify-center mx-auto rounded-full border border-gray-300 text-gray-500"
      >
        <Plus size={22} />
      </button>
    </div>
  );
}
