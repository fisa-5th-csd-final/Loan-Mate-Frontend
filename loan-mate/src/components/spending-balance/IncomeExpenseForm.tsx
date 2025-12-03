// src/components/IncomeExpenseForm.tsx

"use client";

import React, { useState } from "react";
import IncomeExpenseSegmentedControl from './IncomeExpenseSegmentedControl';

// 프로젝트의 consts/add-item에서 오는 타입이라고 가정합니다.
type AddItemType = "income" | "expense";
interface AddItem { type: AddItemType; name: string; amount: number; }

interface IncomeExpenseFormProps {
    initialType?: AddItemType;
    onCancel: () => void;
    onSubmit: (data: AddItem) => void;
}

// export default function IncomeExpenseForm으로 변경
export default function IncomeExpenseForm({
    initialType = "expense",
    onCancel,
    onSubmit,
}: IncomeExpenseFormProps) {
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number | "">("");
    const [type, setType] = useState<AddItemType>(initialType);

    const title = "수입 or 지출 추가하기";
    const handleSubmit = () => {
        if (!name || amount === "" || isNaN(Number(amount))) {
            console.error("이름과 금액을 모두 입력해주세요.");
            return;
        }

        onSubmit({
            type,
            name,
            amount: Number(amount),
        });
    };

    return (
        <div className="w-full flex flex-col gap-5">
            {/* 제목 */}
            <h3 className="text-[17px] font-semibold">
                {title}
            </h3>
            <div>
                <div className="flex flex-col gap-3">

                    {/* 이름 입력 */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[15px] font-semibold text-[#676E74]">이름</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=""
                            className="w-full h-[39px] p-2 bg-[#F0F4F5] rounded-[10px] outline-none"
                        />
                    </div>

                    {/* 수입/지출 구분 */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[15px] font-semibold text-[#676E74]">수입/지출 구분</label>
                        <IncomeExpenseSegmentedControl selectedType={type} onSelect={setType} />
                    </div>

                    {/* 예상 최대 금액 */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[15px] font-semibold text-[#676E74]">예상 최대 금액</label>
                        <input
                            value={amount}
                            onChange={(e) => {
                                const value = e.target.value;
                                setAmount(value === "" ? "" : Number(value));
                            }}
                            placeholder=""
                            type="number"
                            className="w-full h-[39px] p-2 bg-[#F0F4F5] rounded-[10px] outline-none"
                        />
                    </div>
                </div>

            </div>
            {/* 버튼 */}
            <div className="flex gap-2 ">
                <button
                    onClick={onCancel}
                    className="text-[15px] flex-1 h-[39px] bg-[#F0F4F5] rounded-[10px] font-semibold text-[#676E74]"
                >
                    취소하기
                </button>

                <button
                    onClick={handleSubmit}
                    className="text-[15px] flex-2 h-[39px] bg-[#2789F4] text-white rounded-[10px] font-semibold"
                >
                    추가하기
                </button>
            </div>
        </div>
    );
}