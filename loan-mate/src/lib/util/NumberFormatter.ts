// 숫자를 한국식으로 콤마 포맷
export function formatNumber(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "0";
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "0";
  return num.toLocaleString("ko-KR");
}

// "원"까지 포함하는 버전
export function formatCurrency(value: number | string | null | undefined): string {
  return `${formatNumber(value)}원`;
}

// 우리은행 계좌 포맷
export function formatAccountNumber(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return "";

  // 숫자만 추출 (number면 string으로 변환)
  const onlyNumbers = String(value).replace(/\D/g, "");

  // 최소 길이보다 짧으면 원본 반환
  if (onlyNumbers.length < 13) 
    return "계좌번호가 너무 짧습니다. 다시 입력해주세요.";

  const part1 = onlyNumbers.slice(0, 4);
  const part2 = onlyNumbers.slice(4, 7);
  const part3 = onlyNumbers.slice(7, 13);

  return `${part1}-${part2}-${part3}`;
}


