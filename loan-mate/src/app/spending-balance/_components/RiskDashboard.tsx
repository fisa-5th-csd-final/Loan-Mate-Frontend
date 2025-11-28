// RiskDashboard.tsx (Updated with API Logic)
import React, { useMemo } from 'react';
import RiskIndicator from './RiskIndicator';
import RiskGaugeMeter from './RiskGaugeMeter';
// API 응답 구조 정의
interface RiskAPIResponse {
    base_risk_score: number;       // 0.0 ~ 1.0
    simulated_risk_score: number;  // 0.0 ~ 1.0 (시뮬레이션 후 값, 0일 수 있음)
    delta: number;                 // 변화량 (줄어든/늘어난 위험도)
    explanation: string;           // 하단 설명 텍스트
}

// 5단계 위험도 분류 로직 (0.0~1.0 기준)
function getRiskClassification(level: number) {
    if (level < 0.2) {
        return { riskText: "매우 적어요", emoji: "😄" };
    } else if (level < 0.4) {
        return { riskText: "적어요", emoji: "🙂" };
    } else if (level < 0.6) {
        return { riskText: "보통이에요", emoji: "😐" };
    } else if (level < 0.8) {
        return { riskText: "높아요", emoji: "😟" };
    } else { // 0.8 <= level <= 1.0
        return { riskText: "매우 높아요", emoji: "😨" };
    }
}

interface RiskDashboardProps {
    apiResponse: RiskAPIResponse;
}

export default function RiskDashboard({
    apiResponse,
}: RiskDashboardProps) {

    // apiResponse explanation 분리
    let head = apiResponse.explanation;
    let tail = "";
    const match = apiResponse.explanation.match(/([\+\-]?\d*\.?\d+)/);
    if (match) {
        const number = match[1];
        [head, tail] = apiResponse.explanation.split(number);
    }

    // 1. 게이지 및 멘트에 사용할 최종 risk score 결정
    const finalRiskScore = useMemo(() => {
        // simulated_risk_score가 0인 경우 (초기 상태), base_risk_score를 사용합니다.
        if (apiResponse.simulated_risk_score === 0) {
            return apiResponse.base_risk_score;
        }
        return apiResponse.simulated_risk_score;
    }, [apiResponse]);

    // 2. 최종 risk score를 0~100%로 변환
    const riskLevelPercent = finalRiskScore * 100;

    // 3. 델타 값을 %로 변환 및 부호 결정
    const deltaPercent = Math.round(Math.abs(apiResponse.delta) * 100);
    const isDecreased = apiResponse.delta < 0; // 위험도가 줄었는지 확인

    // 4. 위험도 텍스트 및 이모지 결정
    const { riskText, emoji } = useMemo(() => getRiskClassification(finalRiskScore), [finalRiskScore]);

    return (
        <div className="flex justify-center items-center bg-white">
            <div className="flex flex-col justify-center items-center p-4 gap-8 w-full">

                {/* 상단 텍스트 영역 */}
                <div className=" w-full text-left">
                    <div className="text-[17px] font-bold text-[#2E393D]">나의 계획에 따라</div>
                    <div className="text-[17px] font-bold text-[#2E393D]">AI가 예측한 위험도예요</div>
                    <div className="text-[12px] text-[#A8A9AE]">
                        이대로만 가면, 연체 걱정은{` `}
                        <span className={"text-[#A8A9AE]"}>
                            {deltaPercent}%
                        </span>
                        {isDecreased ? ' 줄어요!' : ' 늘어요!'}
                    </div>
                </div>

                {/* 게이지 및 지표 영역 (시각화) */}
                {/* <div className="relative flex justify-center items-center" style={{ height: `${containerWidth / 2}px`, width: `${containerWidth}px` }}> */}
                <div className='-space-y-12'>
                    {/* 1. GaugeMeter */}
                    <RiskGaugeMeter riskLevel={riskLevelPercent} />

                    {/* 2. 위험 지표 */}
                    <RiskIndicator emoji={emoji} riskText={riskText} />
                </div>
                {/* </div> */}

                {/* 하단 정보 영역 */}
                <div className="w-full p-2.5 text-center bg-[#D1EAFF] rounded-4xl text-[#2E393D] font-semibold">
                    {head} <br />
                    {match?.[1]}{tail}
                </div>
            </div>
        </div>
    );
}