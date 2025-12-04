"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { simulationFetch } from "@/lib/api/ai/SimulationFetch";
import type { AiSimulationResponse, ChangeItem } from "../../../types/ai/AiSimulation";
import RiskDashboard from "./RiskDashboard";
import FixedBudgetDashboard, { FixedBudgetItem } from "./FixedBudgetDashboard";
import BottomSheet from "@/components/ui/modal/BottomSheet";
import IncomeExpenseForm from "./IncomeExpenseForm";
import LoadingSpinner from "@/components/ui/loading/LoadingSpinner";

const INITIAL_RISK_DATA: AiSimulationResponse = {
    base_risk_score: 0.15,
    simulated_risk_score: 0.15,
    delta: 0,
    explanation: "현재 재무 상태를 기준으로 계산한\n기본 위험도입니다.",
};

export default function RiskSimulationContainer() {
    // ── 상태 관리 ──
    const [riskData, setRiskData] = useState<AiSimulationResponse>(INITIAL_RISK_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [open, setIsOpen] = useState(false);
    const [incomeValues, setIncomeValues] = useState<FixedBudgetItem[]>([]);
    const [expenseValues, setExpenseValues] = useState<FixedBudgetItem[]>([]);

    // 이전 변경 사항 추적을 위한 ref
    const prevChangesRef = useRef<string | null>(null);

    // ── 핸들러 ──

    // 1. 수입/지출 값 변경 시
    const handleUpdateIncome = useCallback((index: number, newValue: number) => {
        setIncomeValues(prev =>
            prev.map((item, i) => i === index ? { ...item, value: newValue } : item)
        );
    }, []);

    const handleUpdateExpense = useCallback((index: number, newValue: number) => {
        setExpenseValues(prev =>
            prev.map((item, i) => i === index ? { ...item, value: newValue } : item));
    }, []);

    // 2. 새로운 항목 추가
    const handleAddItem = (data: { type: "income" | "expense"; name: string; amount: number }) => {
        const newItem: FixedBudgetItem = {
            id: `${data.type}-${crypto.randomUUID()}`,
            label: data.name,
            value: 0,
            max: data.amount
        };

        if (data.type === "income") {
            setIncomeValues(prev => [...prev, newItem]);
        } else {
            setExpenseValues(prev => [...prev, newItem]);
        }
        setIsOpen(false);
    };

    // 3. 시뮬레이션 실행 (값이 변경될 때마다 또는 버튼 클릭 시)
    useEffect(() => {
        const timer = setTimeout(async () => {
            // 변경된 값들을 ChangeItem 형태로 변환
            const changes: ChangeItem[] = [
                ...incomeValues.map(item => ({ type: "income" as const, name: item.label, amount: (item.value / 100) * item.max })),
                ...expenseValues.map(item => ({ type: "expense" as const, name: item.label, amount: (item.value / 100) * item.max }))
            ];

            // 0이 아닌 값만 필터링하여 유의미한 변경사항인지 확인
            const effectiveChanges = changes.filter(item => item.amount > 0);
            const changesString = JSON.stringify(effectiveChanges);

            // 변경사항이 없으면(이전과 동일하면) API 호출 스킵
            if (prevChangesRef.current === changesString) {
                return;
            }

            // 변경사항 업데이트
            prevChangesRef.current = changesString;

            try {
                setIsLoading(true);
                const response = await simulationFetch({ changes });

                // 특정 멘트에 줄바꿈 적용
                if (response.explanation === "현재 재무 상태를 기준으로 계산한 기본 위험도입니다.") {
                    response.explanation = "현재 재무 상태를 기준으로 계산한\n기본 위험도입니다.";
                }

                setRiskData(response);
                setError(null);
            } catch (err) {
                console.error("Simulation failed:", err);
                setError("시뮬레이션 정보를 불러오지 못했습니다.");
            } finally {
                setIsLoading(false);
            }
        }, 800); // 0.8초 디바운스

        return () => clearTimeout(timer);
    }, [incomeValues, expenseValues]);


    return (
        <div className="flex flex-col gap-8 bg-white relative">
            {/* 로딩 인디케이터 (오버레이 형태) -> 제거됨 */}

            {/* 에러 메시지 (오버레이 형태) */}
            {error && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 bg-red-50 text-red-500 px-4 py-2 rounded-lg shadow-sm text-sm font-medium border border-red-100">
                    {error}
                </div>
            )}

            <RiskDashboard apiResponse={riskData} isLoading={isLoading} />

            <FixedBudgetDashboard
                onAddClick={() => setIsOpen(true)}
                incomeValues={incomeValues}
                expenseValues={expenseValues}
                onUpdateIncome={handleUpdateIncome}
                onUpdateExpense={handleUpdateExpense}
            />

            {/* BottomSheet Wrapper */}
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
