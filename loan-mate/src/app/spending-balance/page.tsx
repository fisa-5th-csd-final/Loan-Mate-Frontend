"use client"
import RiskDashboard from "./_components/RiskDashboard";
import FixedBudgetDashboard, { FixedBudgetItem } from "@/app/spending-balance/_components/FixedBudgetDashboard";
import { AiSimulationResponse } from "../../../types/ai/AiSimulationResponse";
import BottomSheet from "@/components/bottomSheet";
import { useState, useCallback } from "react";
import IncomeExpenseForm from "./_components/IncomeExpenseForm";

const MOCK_API_RESPONSE_LOW_RISK: AiSimulationResponse = {
    base_risk_score: 0.15,
    simulated_risk_score: 0.1, // 시뮬레이션 후 위험도 '적어요' (0.2 <= x < 0.4)
    delta: -0.05,               // 위험도 5% 감소
    explanation: "수입/지출 변화로 위험도가 +0.0008 만큼 변했습니다."
};

export default function Page() {
    const currentData = MOCK_API_RESPONSE_LOW_RISK;
    const [open, setIsOpen] = useState(false);

    const [incomeValues, setIncomeValues] = useState<FixedBudgetItem[]>([
        { id: 'inc-1', label: '인형 눈 붙이기', value: 20, max: 100 },
        { id: 'inc-2', label: '부수입', value: 50, max: 200 },
        { id: 'inc-3', label: '상여금', value: 80, max: 100 }
    ]);
    const [expenseValues, setExpenseValues] = useState<FixedBudgetItem[]>([
        { id: 'exp-1', label: '식비', value: 10, max: 100 },
        { id: 'exp-2', label: '교통비', value: 30, max: 100 }
    ]);

    const handleUpdateIncome = useCallback((index: number, newValue: number) => {
        setIncomeValues(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], value: newValue };
            return copy;
        })
    }, []);

    const handleUpdateExpense = useCallback((index: number, newValue: number) => {
        setExpenseValues(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], value: newValue };
            return copy;
        })
    }, []);

    const handleAddItem = (data: { type: "income" | "expense"; name: string; amount: number }) => {
        const newItem: FixedBudgetItem = {
            id: `${data.type}-${Date.now()}`,
            label: data.name,
            value: 0, // 초기값은 0으로 설정
            max: data.amount
        };

        if (data.type === "income") {
            setIncomeValues(prev => [...prev, newItem]);
        } else {
            setExpenseValues(prev => [...prev, newItem]);
        }
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-8 bg-white">
            <RiskDashboard apiResponse={currentData} />
            <FixedBudgetDashboard
                onAddClick={() => setIsOpen(true)}
                incomeValues={incomeValues}
                expenseValues={expenseValues}
                onUpdateIncome={handleUpdateIncome}
                onUpdateExpense={handleUpdateExpense}
            />

            {/* BottomSheet Wrapper for Fixed Positioning and Responsive Width */}
            <div className={`
                fixed inset-0 z-50 
                w-full max-w-dvw sm:max-w-[390px] md:max-w-[430px] lg:max-w-[780px]
                left-1/2 -translate-x-1/2
                ${open ? 'pointer-events-auto' : 'pointer-events-none'}
            `}>
                <BottomSheet open={open} onClose={() => setIsOpen(false)}>
                    <IncomeExpenseForm
                        onCancel={() => setIsOpen(false)}
                        onSubmit={handleAddItem}
                    />
                </BottomSheet>
            </div>
        </div>
    );
}