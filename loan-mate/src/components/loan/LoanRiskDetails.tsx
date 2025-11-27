// src/components/loan/LoanRiskDetails.tsx
"use client";

import ProgressBar from "@/components/ProgressBar";
import MessageBox from "../MessageBox";

type LoanRiskDetailsProps = {
  summaryMessage: string;
  progressPercent: number; // 상환 진척률

  interestRate: string;
  riskLevel: string;
  nextDueDate: string;

  remainingPrincipal: string;
  principal: string;
  monthlyPayment: string;
  repaymentAccount: string;
  loanType: string;
  repaymentMethod: string;
};

export default function LoanRiskDetails({
  summaryMessage,
  progressPercent,
  interestRate,
  riskLevel,
  nextDueDate,
  remainingPrincipal,
  principal,
  monthlyPayment,
  repaymentAccount,
  loanType,
  repaymentMethod,
}: LoanRiskDetailsProps){
  const safeProgress = Math.min(100, Math.max(0, progressPercent));

  return (
    <div className="w-full rounded-3xl bg-white px-5 pb-8 pt-5 shadow-sm">
      {/* 상단 안내 문구 박스 */}
      <MessageBox className="mb-6">
        {summaryMessage}
      </MessageBox>

      {/* 상환 진척률 + 공용 ProgressBar 사용 */}
      <div className="mb-6">
        <ProgressBar
          label={`상환 진척률 ${safeProgress}%`}
          value={safeProgress}
        />
      </div>

      {/* 3-컬럼 요약 (금리 / 연체위험도 / 다음 납입일) */}
      <div className="mb-6 grid grid-cols-3 gap-3 text-center">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">{interestRate}</span>
          <span className="text-xs text-gray-500">금리</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">{riskLevel}</span>
          <span className="text-xs text-gray-500">연체위험도</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">{nextDueDate}</span>
          <span className="text-xs text-gray-500">다음 납입일</span>
        </div>
      </div>

      {/* 아래쪽 상세 정보 그리드 */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-[13px]">
        {/* 남은 원금 / 원금 */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">남은 원금</span>
          <span className="text-base font-semibold text-gray-800">
            {remainingPrincipal}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-xs text-gray-500">원금</span>
          <span className="text-base font-semibold text-gray-800">
            {principal}
          </span>
        </div>

        {/* 월 상환액 / 상환 계좌 */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">월 상환액</span>
          <span className="text-base font-semibold text-gray-800">
            {monthlyPayment}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-xs text-gray-500">상환 계좌</span>
          <span className="text-base font-semibold text-gray-800 leading-snug">
            {repaymentAccount}
          </span>
        </div>

        {/* 대출 유형 / 상환 방식 */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">대출 유형</span>
          <span className="text-base font-semibold text-gray-800">
            {loanType}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-xs text-gray-500">상환 방식</span>
          <span className="text-base font-semibold text-gray-800">
            {repaymentMethod}
          </span>
        </div>
      </div>
    </div>
  );
}