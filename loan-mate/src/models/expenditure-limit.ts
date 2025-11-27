export interface ExpenditureLimit {
  recommendedAmount: number;
  usedAmount: number;
  availableAmount: number;
  summaryMessage: string;
}

export interface ExpenditureCategory {
  id: string;
  name: ConsumptionCategory; 
  ratio: number;       // %
  spent: number;       // 지출 금액
  available: number;   // 사용 가능 금액
  icon: string;        // emoji or image
}

export interface LoanInterest {
  id: number;
  loanName: string;
  nextInterest: number;
  dueDate: string; // "10/26"
}

export interface LoanRepayment {
  id: number;
  loanName: string;
  nextRepayment: number;
  dueDate: string;
}

export interface ExpenditureLimitPageModel {
  limit: ExpenditureLimit;
  categories: ExpenditureCategory[];
  loanInterests: LoanInterest[];
  loanRepayments: LoanRepayment[];
}

export enum ConsumptionCategory {
  TRANSFER = "이체",
  FOOD = "음식",
  TRANSPORT = "교통",
  SHOPPING = "쇼핑",
  ENTERTAINMENT = "여가",
  ETC = "기타",
}
