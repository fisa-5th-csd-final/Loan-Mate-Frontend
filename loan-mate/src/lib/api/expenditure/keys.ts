export const expenditureKeys = {
  all: ["expenditure"] as const,

  list: () => [...expenditureKeys.all, "list"] as const,

  detail: (id: number | string) =>
    [...expenditureKeys.all, "detail", id] as const,

  spendingRecommend: (year: number, month: number) =>
    [...expenditureKeys.all, "spending", "recommend", year, month] as const,

  monthlySpending: (year: number, month: number) =>
    [...expenditureKeys.all, "spending", "monthly", year, month] as const,

  aiMessage: (year: number, month: number) =>
    [...expenditureKeys.all, "ai", "message", year, month] as const,
};
