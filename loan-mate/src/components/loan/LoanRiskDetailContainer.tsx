// src/components/loan/LoanRiskDetailsContainer.tsx
"use client";

import { useEffect, useState } from "react";
import type { LoanDetail } from "@/../types/loan/LoanDetail";
import { fetchLoanDetail } from "@/lib/api/loan/DetailFetch";
import LoanRiskDetails from "@/components/loan/LoanRiskDetails";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

type LoanDetailContainerProps = {
  loanId: number;
};

export default function LoanDetailContainer({
  loanId,
}: LoanDetailContainerProps) {
  const [data, setData] = useState<LoanDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchLoanDetail(loanId);
        if (!cancelled) {
          setData(result);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "대출 정보를 불러오지 못했습니다."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [loanId]);

  if (loading) {
    return (
      <div className="w-full rounded-3xl bg-white px-5 py-8 flex items-center justify-center">
        <LoadingSpinner label="대출 정보를 불러오는 중입니다" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full rounded-3xl bg-white px-5 py-8 text-center">
        <p className="text-sm text-gray-600">데이터를 불러오지 못했습니다</p>
      </div>
    );
  }

  // 데이터 정상 로드 시: LoanDetailPanel에 그대로 전달
  return (
    <LoanRiskDetails
      summaryMessage={data.summaryMessage}
      progressPercent={data.progressPercent}
      interestRate={data.interestRate}
      riskLevel={data.riskLevel}
      nextDueDate={data.nextDueDate}
      remainingPrincipal={data.remainingPrincipal}
      principal={data.principal}
      monthlyPayment={data.monthlyPayment}
      repaymentAccount={data.repaymentAccount}
      loanType={data.loanType}
      repaymentMethod={data.repaymentMethod}
    />
  );
}
