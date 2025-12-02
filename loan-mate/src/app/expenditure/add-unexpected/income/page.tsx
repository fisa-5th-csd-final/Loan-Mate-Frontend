"use client";

import { useState } from "react";
import BottomSheet from "@/components/bottomSheet";
import AddItemModalPage from "@/app/expenditure/_components/modal/AddItemModalPage";
import PageWithCTA from "@/app/expenditure/_components/PageWithCTA";
import EditableAmountList, { Item } from "@/app/expenditure/_components/EditableAmountList";
import { AddItem, AddItemType } from "@/consts/add-item";
import { useRouter } from "next/navigation";
import {
  useCreateExpenditureMutation,
  useDeleteExpenditureMutation,
  useExpenditureListQuery,
  useUpdateExpenditureMutation,
} from "@/lib/api/expenditure/hooks";
import { useSwipeDeleteHint } from "@/hooks/useSwipeDeleteHint";

export default function IncomePage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const pageType: AddItemType = AddItemType.INCOME;
  const router = useRouter();

  const listQuery = useExpenditureListQuery("INCOME");

  const items: Item[] =
    listQuery.data?.map((income) => ({
      id: income.id,
      name: income.description,
      amount: income.amount,
    })) ?? [];

  useSwipeDeleteHint(); // swipe로 삭제 가능하단는 것을 알려주는 토스트 메시지 띄우기 

  const createMutation = useCreateExpenditureMutation({
    onSuccess: () => setOpen(false),
  });
  const updateMutation = useUpdateExpenditureMutation({
    onSuccess: () => {
      setEditing(null);
      setOpen(false);
    },
  });
  const deleteMutation = useDeleteExpenditureMutation();

  const handleAddItem = (data: AddItem & { id?: string | number }) => {
    const savedAt = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    createMutation.mutate({
      type: "INCOME",
      amount: data.amount,
      description: data.name,
      savedAt,
    });
  };

  const handleOpenEdit = (item: Item) => {
    setEditing(item);
    setOpen(true);
  };

  const handleEditItem = (data: AddItem & { id?: string | number }) => {
  if (!editing) return;

  updateMutation.mutate({
    id: Number(editing.id),
    data: {
      amount: data.amount,
      description: data.name,
    },
  });
};


  const handleDelete = (id: Item["id"]) => {
    deleteMutation.mutate(id as number);
  };


  return (
    <PageWithCTA
      ctaLabel="수입 저장하기"
      onClick={() => router.push("/expenditure/add-unexpected/outlay")}
    >
      <p className="text-sm text-gray-900 text-[18px] font-semibold mb-5 px-1">
        이번 달 예상하지 못한{" "}
        <span className="text-blue-500 font-semibold">{"수입"}</span>
        을 추가해주세요.
      </p>

      {/* 리스트 UI */}
      <div className="min-h-[120px] space-y-3">
        {listQuery.isLoading ? (
          <p className="text-gray-500 text-sm px-1">불러오는 중...</p>
        ) : listQuery.isError ? (
          <p className="text-red-500 text-sm px-1">수입 데이터를 불러오지 못했습니다.</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500 text-sm px-1">추가된 수입이 없습니다. 추가 버튼을 눌러주세요.</p>
        ) : null}

        {!listQuery.isLoading && !listQuery.isError && (
          <EditableAmountList
            items={items}
            onAdd={() => {
              setEditing(null);
              setOpen(true);
            }}
            onDelete={handleDelete}
            onEdit={handleOpenEdit}
          />
        )}
      </div>

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <AddItemModalPage
          type={pageType}
          initialData={
            editing
              ? {
                  id: editing.id,
                  name: editing.name,
                  amount: editing.amount,
                }
              : undefined
          }
          onCancel={() => {
            setEditing(null);
            setOpen(false);
          }}
          onSubmit={(data) => {
            if (editing) handleEditItem(data);
            else handleAddItem(data);
          }}
        />
      </BottomSheet>
    </PageWithCTA>
  );
}
