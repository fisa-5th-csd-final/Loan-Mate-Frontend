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
