// src/components/loan/LoanRiskDetails.tsx
"use client";

import ProgressBar from "@/components/ui/progress/ProgressBar";
import AiCommentBox from "@/components/ui/feedback/AiCommentBox";
import { formatAccountNumberWithBar } from "@/lib/util/NumberFormatter";

type LoanRiskDetailsProps = {
  message: string;
  progress: number; // 상환 진척률
  interestPayment: string;
  nextRepaymentDate: string;
  remainPrincipal: string;
  principal: string;
  monthlyRepayment: string;
  accountNumber: string;
  loanType: string;
  repaymentType: string;
};

export default function LoanRiskDetails({
  message,
  progress,
  interestPayment,
  nextRepaymentDate,
  remainPrincipal,
  principal,
  monthlyRepayment,
  accountNumber,
  loanType,
  repaymentType,
}: LoanRiskDetailsProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full py-4">
      {/* 상단 AI 코멘트 박스 */}
      <AiCommentBox className="mb-6">
        {message}
      </AiCommentBox>

      {/* 상환 진척률 + 공용 ProgressBar 사용 */}
      <div className="mb-6">
        <ProgressBar
          label={`상환 진척률 ${safeProgress}%`}
          value={safeProgress}
        />
      </div>

      {/* 3-컬럼 요약 (이자납입액 / 다음 납입일) */}
      {/* 핵심 정보 요약 */}
      {/* 핵심 정보 요약 */}
      <div className="mb-6 grid grid-cols-2 bg-gray-50 rounded-2xl py-5 px-2">
        <div className="flex flex-col gap-1 items-center justify-center border-r border-gray-200">
          <span className="text-xs text-gray-500 mb-0.5">월 상환액</span>
          <span className="text-[17px] font-bold text-gray-900">{monthlyRepayment}</span>
        </div>

        <div className="flex flex-col gap-1 items-center justify-center">
          <span className="text-xs text-gray-500 mb-0.5">다음 납입일</span>
          <span className="text-[17px] font-bold text-gray-900">{nextRepaymentDate}</span>
        </div>
      </div>

      {/* 상세 정보 그리드 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-1">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-500">남은 원금</span>
          <span className="text-[15px] font-semibold text-gray-800">{remainPrincipal}</span>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-right">
          <span className="text-xs text-gray-500">대출 원금</span>
          <span className="text-[15px] font-semibold text-gray-800">{principal}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-500">이자납입액</span>
          <span className="text-[15px] font-semibold text-gray-800">{interestPayment}</span>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-right">
          <span className="text-xs text-gray-500">상환 계좌</span>
          <span className="text-[15px] font-semibold text-gray-800 tracking-tight">
            {formatAccountNumberWithBar(accountNumber)}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-500">대출 유형</span>
          <span className="text-[15px] font-semibold text-gray-800">{loanType}</span>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-right">
          <span className="text-xs text-gray-500">상환 방식</span>
          <span className="text-[15px] font-semibold text-gray-800">{repaymentType}</span>
        </div>
      </div>
    </div>
  );
}
