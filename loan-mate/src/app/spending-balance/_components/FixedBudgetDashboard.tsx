"use client";
import { useCallback, useState } from "react";
import FixedBudgetBox from "./FixedBudgetBox";

export type FixedBudgetItem = {
    id: string;
    label: string;
    value: number;
    max: number;
};

export default function FixedBudgetDashboard() {
    const [incomeValues, setIncomeValues] = useState<FixedBudgetItem[]>([
        { id: 'inc-1', label: '인형 눈 붙이기', value: 20, max: 100 },
        { id: 'inc-2', label: '부수입', value: 50, max: 200 },
        { id: 'inc-3', label: '상여금', value: 80, max: 100 }
    ]);
    const [expenseValues, setExpenseValues] = useState<FixedBudgetItem[]>([
        { id: 'exp-1', label: '식비', value: 10, max: 100 },
        { id: 'exp-2', label: '교통비', value: 30, max: 100 }
    ]);

    const updateIncomeBar = useCallback((index: number, newValue: number) => {
        setIncomeValues(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], value: newValue };
            return copy;
        })
    }, []);

    const updateExpenseBar = useCallback((index: number, newValue: number) => {
        setExpenseValues(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], value: newValue };
            return copy;
        })
    }, []);

    return (
        <div className="bg-white flex flex-col justify-center items-center gap-4 ">
            <div className="w-full bg-[#F0F4F5] flex flex-col justify-center items-center gap-4 px-2.5 py-5 rounded-2xl">
                <div className="w-full flex justify-between items-center">
                    <div
                        className="text-[#676E74] font-semibold rounded-md"
                    >
                        수입/지출을 추가해주세요
                    </div>
                    {/* 추가 버튼 */}
                    <button
                        className="
                        w-6 h-6 
                        flex items-center justify-center
                        border-2 border-[#676E74]
                        rounded-full
                        text-[#676E74] font-semibold      
                        hover:bg-[#c7ccd0]
                        transition-colors duration-200
                        active:scale-95
                        leading-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="11" y="5" width="2" height="14" rx="1" fill="#676E74" />
                            <path d="M6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6Z" fill="#676E74" />
                        </svg>
                    </button>
                </div>

                <FixedBudgetBox
                    title="수입"
                    description="급여를 제외한 매달 고정 수입을 추가해주세요"
                    values={incomeValues}
                    updateBar={(i, newValue) => updateIncomeBar(i, newValue)}
                />
                <FixedBudgetBox
                    title="지출"
                    description="매달 고정 지출을 추가해주세요"
                    values={expenseValues}
                    updateBar={(i, newValue) => updateExpenseBar(i, newValue)}
                />
            </div>
        </div>
    );
}
