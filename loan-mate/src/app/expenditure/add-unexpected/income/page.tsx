"use client";

import { useState } from "react";
import BottomSheet from "@/components/bottomSheet";
import AddItemModalPage from "@/app/expenditure/_components/AddItemModalPage";
import PageWithCTA from "@/app/expenditure/_components/PageWithCTA";
import EditableAmountList, { Item } from "@/app/expenditure/_components/EditableAmountList";
import { AddItem, AddItemType } from "@/consts/add-item";

export default function IncomePage() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const pageType: AddItemType = AddItemType.INCOME;

  const handleAddItem = (data: AddItem) => {
    // 새로운 item 구성
    const newItem: Item = {
      id: Date.now(),
      name: data.name,
      amount: data.amount,
    };

    setItems(prev => [...prev, newItem]);
    setOpen(false);
  };

  return (
    <PageWithCTA
      ctaLabel="수입 저장하기"
      onClick={() => console.log("수입 저장 로직 들어갈 곳")}
    >
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
