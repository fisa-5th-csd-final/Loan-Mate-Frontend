"use client"
import RiskDashboard from "./_components/RiskDashboard";
import FixedBudgetDashboard from "@/app/spending-balance/_components/FixedBudgetDashboard";

// API 응답 구조 정의 (임시 데이터용)
interface RiskAPIResponse {
    base_risk_score: number;
    simulated_risk_score: number;
    delta: number;
    explanation: string;
}

const MOCK_API_RESPONSE_LOW_RISK: RiskAPIResponse = {
    base_risk_score: 0.15,
    simulated_risk_score: 0.38, // 시뮬레이션 후 위험도 '적어요' (0.2 <= x < 0.4)
    delta: -0.05,               // 위험도 5% 감소
    explanation: "수입/지출 변화로 위험도가 +0.0008 만큼 변했습니다."
};

export default function Page() {
    const currentData = MOCK_API_RESPONSE_LOW_RISK;

    return (
        <div className="flex flex-col gap-8 bg-white">
            <RiskDashboard apiResponse={currentData} />
            <FixedBudgetDashboard />
        </div>
    );
}