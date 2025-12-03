export const ERROR_MESSAGES: Record<string, string> = {
  // 공통
  C001: "이미 삭제된 항목입니다.",

  // 수입/지출
  ML002: "요청하신 내역을 찾을 수 없습니다.",
  ML003: "해당 내역에 접근할 권한이 없습니다.",

  // 계좌
  ACC001: "급여 통장 정보를 찾을 수 없습니다.",

  // 시스템
  EXTERNAL_API_ERROR: "외부 시스템 연동 중 오류가 발생했습니다.",
  INTERNAL_SERVER_ERROR: "일시적인 서버 오류입니다. 잠시 후 다시 시도해주세요.",
};

export function getFriendlyErrorMessage(code: string | undefined, defaultMessage: string): string {
  if (!code) return defaultMessage;
  return ERROR_MESSAGES[code] || defaultMessage;
}
