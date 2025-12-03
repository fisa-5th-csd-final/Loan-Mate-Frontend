"use client";
import FixedBudgetBox from "./FixedBudgetBox";

export type FixedBudgetItem = {
    id: string;
    label: string;
    value: number;
    max: number;
};

interface FixedBudgetDashboardProps {
    incomeValues: FixedBudgetItem[];
    expenseValues: FixedBudgetItem[];
    onUpdateIncome: (index: number, newValue: number) => void;
    onUpdateExpense: (index: number, newValue: number) => void;
    onAddClick: () => void;
}

export default function FixedBudgetDashboard({
    incomeValues,
    expenseValues,
    onUpdateIncome,
    onUpdateExpense,
    onAddClick
}: FixedBudgetDashboardProps) {

    return (
        <div className="bg-white flex flex-col justify-center items-center gap-4 ">
            <div className="w-full bg-(--gray-100) flex flex-col justify-center items-center gap-4 px-2.5 py-5 rounded-2xl">
                <div className="w-full flex justify-between items-center">
                    <div
                        className="text-(--gray-700) font-semibold rounded-md"
                    >
                        수입/지출을 추가해주세요
                    </div>
                    {/* 추가 버튼 */}
                    <button
                        onClick={onAddClick}
                        className="
                        w-6 h-6 
                        flex items-center justify-center
                        border-2 border-(--gray-700)
                        rounded-full
                        text-(--gray-700) font-semibold      
                        hover:bg-[#c7ccd0]
                        transition-colors duration-200
                        active:scale-95
                        leading-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="11" y="5" width="2" height="14" rx="1" fill="var(--gray-700)" />
                            <path d="M6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6Z" fill="var(--gray-700)" />
                        </svg>
                    </button>
                </div>

                <FixedBudgetBox
                    title="수입"
                    description="급여를 제외한 매달 고정 수입을 추가해주세요"
                    values={incomeValues}
                    updateBar={onUpdateIncome}
                />
                <FixedBudgetBox
                    title="지출"
                    description="매달 고정 지출을 추가해주세요"
                    values={expenseValues}
                    updateBar={onUpdateExpense}
                />
            </div>
        </div>
    );
}
