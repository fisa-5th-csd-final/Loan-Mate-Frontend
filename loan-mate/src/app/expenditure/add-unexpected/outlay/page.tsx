"use client";

import { useState } from "react";
import BottomSheet from "@/components/bottomSheet";
import AddItemModalPage from "@/app/expenditure/_components/AddItemModalPage";
import PageWithCTA from "@/app/expenditure/_components/PageWithCTA";
import EditableAmountList, { Item } from "@/app/expenditure/_components/EditableAmountList";
import { AddItem, AddItemType } from "@/consts/add-item";
import { useRouter } from "next/navigation"

export default function OutlayPage() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const pageType: AddItemType = AddItemType.EXPENSE;

  const handleAddItem = (data: AddItem) => {
    // 새로운 item 구성
    const newItem: Item = {
      id: crypto.randomUUID(),
      name: data.name,
      amount: data.amount,
    };

    setItems(prev => [...prev, newItem]);
    setOpen(false);
  };

  return (
    <PageWithCTA
      ctaLabel="분석하기"
      onClick={() => console.log("지출 저장 로직 들어갈 곳")}
    >
      <p className="text-sm text-gray-900 text-[18px] font-semibold mb-5 px-1">
        이번 달 예상하지 못한{" "}
        <span
          className={
            "text-red-500 font-semibold"
          }
        >
          {"지출"}
        </span>
        을 추가해주세요.
      </p>

      {/* 리스트 UI */}
      <EditableAmountList
        items={items}
        onAdd={() => setOpen(true)}
      />

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <AddItemModalPage
          type={pageType}
          onCancel={() => setOpen(false)}
          onSubmit={handleAddItem}
        />
      </BottomSheet>
    </PageWithCTA>
  );
}
