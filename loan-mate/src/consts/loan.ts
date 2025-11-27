export const RISK_LEVELS = ["ONE", "TWO", "THREE", "FOUR", "FIVE"] as const;
export type RiskLevel = typeof RISK_LEVELS[number];
export const RISK_LEVEL_MAP: Record<RiskLevel, string> = {
    ONE: "매우 양호",
    TWO: "양호",
    THREE: "보통",
    FOUR: "주의",
    FIVE: "위험",
};
export const RISK_COLOR_MAP: Record<RiskLevel, string> = {
    ONE: "text-green-600",
    TWO: "text-green-500",
    THREE: "text-yellow-500",
    FOUR: "text-orange-500",
    FIVE: "text-red-500",
};