import {
  ConsumptionCategory,
  ExpenditureLimitPageModel,
} from "@/models/expenditure-limit";

export const expenditureLimitSample: ExpenditureLimitPageModel = {
  limit: {
    recommendedAmount: 520000,
    usedAmount: 1236000,
    availableAmount: 500000,
    summaryMessage:
      "이번 달에는 총 52만 원의 지출을 추천드립니다. 외식비 비중이 다소 높았으며, 교통비는 안정적인 수준이라 조금 늘려도 괜찮습니다.",
  },

  categories: [
    {
      id: "shopping",
      name:  ConsumptionCategory.SHOPPING,
      ratio: 55,
      spent: 310000,
      available: 310000,
      icon: "🛒",
    },
    {
      id: "transport",
      name: ConsumptionCategory.TRANSPORT,
      ratio: 35,
      spent: 170000,
      available: 310000,
      icon: "🚌",
    },
    {
      id: "food",
      name: ConsumptionCategory.FOOD,
      ratio: 10,
      spent: 300000,
      available: 310000,
      icon: "🍽️",
    },
  ],

  loanInterests: [
    { id: 1, loanName: "KB준심무이자대출", nextInterest: 0, dueDate: "10/26" },
    { id: 2, loanName: "신한만경대출", nextInterest: 160000, dueDate: "11/3" },
    { id: 3, loanName: "기업밸런스이자백대출", nextInterest: 300000, dueDate: "11/1" },
  ],

  loanRepayments: [
    { id: 1, loanName: "KB준심무이자대출", nextRepayment: 200000, dueDate: "10/26" },
    { id: 2, loanName: "신한만경대출", nextRepayment: 160000, dueDate: "11/3" },
    { id: 3, loanName: "기업밸런스이자백대출", nextRepayment: 300000, dueDate: "11/1" },
  ],
};
