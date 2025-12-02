// AiSimulation.ts

// 수입/지출 변경사항
export interface ChangeItem {
    type: "income" | "expense"; // 수입/지출 구분
    name: string; // 수입/지출 이름
    amount: number; // 수입/지출 금액
}

// AI 시뮬레이션 요청 바디
export interface SimulationRequest {
    // 서비스 서버에서 user_id를 가져오므로 주석 처리
    // user_id: number; // 유저 ID
    changes: ChangeItem[]; // 모든 수입/지출 변경사항
}

/**
 * @description
 * AI 시뮬레이션 API의 응답 구조를 정의합니다.
 * 위험 점수와 시뮬레이션 후 변화량을 포함합니다.
 */
export interface AiSimulationResponse {
    /**
     * @description
     * 시뮬레이션 전의 기본 위험 점수 (0.0 ~ 1.0).
     */
    base_risk_score: number;

    /**
     * @description
     * 시뮬레이션 적용 후의 위험 점수 (0.0 ~ 1.0).
     * 시뮬레이션이 적용되지 않았거나 유효하지 않으면 0일 수 있습니다.
     */
    simulated_risk_score: number;

    /**
     * @description
     * base_risk_score와 simulated_risk_score 간의 변화량 (simulated - base).
     * 위험도가 줄어들면 음수, 늘어나면 양수가 됩니다.
     */
    delta: number;

    /**
     * @description
     * 시뮬레이션 결과에 대한 설명 텍스트.
     */
    explanation: string;
}