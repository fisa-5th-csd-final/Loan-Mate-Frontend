export const expenditureKeys = {
  all: ["expenditure"] as const,

  list: () => [...expenditureKeys.all, "list"] as const,

  detail: (id: number | string) =>
    [...expenditureKeys.all, "detail", id] as const,
};
