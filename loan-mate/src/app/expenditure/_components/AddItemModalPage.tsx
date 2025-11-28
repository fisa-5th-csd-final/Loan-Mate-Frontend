"use client";

import { useEffect, useState } from "react";
import { AddItem, AddItemType } from "@/consts/add-item";

type InitialData = Partial<AddItem> & { id?: string | number };

interface Props {
  type: AddItemType; // 수입 or 지출
  onCancel: () => void;
  onSubmit: (data: AddItem & { id?: string | number }) => void;
  initialData?: InitialData;
}

export default function AddItemModalPage({
  type,
  onCancel,
  onSubmit,
  initialData,
}: Props) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [amount, setAmount] = useState<number | "">(initialData?.amount ?? "");

  useEffect(() => {
    setName(initialData?.name ?? "");
    setAmount(initialData?.amount ?? "");
  }, [initialData?.id, initialData?.name, initialData?.amount]);

  const isEditMode = Boolean(initialData?.id);
  const title =
    type === AddItemType.INCOME
      ? isEditMode
        ? "수입 수정하기"
        : "수입 추가하기"
      : isEditMode
        ? "지출 수정하기"
        : "지출 추가하기";
  const submitLabel = isEditMode ? "수정하기" : "추가하기";

  const handleSubmit = () => {
    if (!name || !amount) return;
    onSubmit({
      id: initialData?.id,
      type,
      name,
      amount: Number(amount),
    });
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="flex flex-col gap-4">
        {/* 이름 */}
        <div>
          <label className="text-sm font-medium text-gray-700">이름</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 아르바이트, 로또 당첨"
            className="w-full mt-1 p-3 border bg-gray-100 rounded-xl focus:outline-none"
          />
        </div>

        {/* 금액 */}
        <div>
          <label className="text-sm font-medium text-gray-700">예상 최대 금액</label>
          <input
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              setAmount(value === "" ? "" : Number(value));
            }}
            placeholder="예: 3,000,000"
            type="number"
            className="w-full mt-1 p-3 border bg-gray-100 rounded-xl focus:outline-none"
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-gray-200 rounded-xl font-medium"
          >
            취소하기
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
