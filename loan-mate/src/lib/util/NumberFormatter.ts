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

// 계좌 13자리까지만  
export function formatAccountNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.slice(0, 13);
}

export function isValidAccountNumber(value: string): boolean {
  return value.replace(/\D/g, "").length === 13;
}

export function formatAccountNumberWithBar(value: string): string {
  const digits = value.replace(/\D/g, "");
  const clean = digits.slice(0, 13);

  if (clean.length <= 4) return clean;
  if (clean.length <= 7) return `${clean.slice(0, 4)}-${clean.slice(4)}`;
  return `${clean.slice(0, 4)}-${clean.slice(4, 7)}-${clean.slice(7)}`;
}
