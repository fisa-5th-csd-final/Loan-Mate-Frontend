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

  // 데이터 정상 로드 시: LoanRiskDetails에 포맷팅하여 전달
  const formatCurrency = (value: number | null | undefined) =>
    value != null ? `${value.toLocaleString()}원` : "-";

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    } catch {
      return "-";
    }
  };

  const loanTypeMap: Record<string, string> = {
    MORTGAGE: "전세/담보대출",
    CREDIT: "신용대출",
    PERSONAL: "개인대출",
  };

  const repaymentTypeMap: Record<string, string> = {
    EQUAL_INSTALLMENT: "원리금균등상환",
    EQUAL_PRINCIPAL: "원금균등상환",
    BULLET: "만기일시상환",
  };

  return (
    <LoanRiskDetails
      message="이 대출의 상환 진행 상태가 양호합니다. 계속해서 안정적으로 관리하고 계십니다."
      progress={data.progress ?? 0}
      interestPayment={formatCurrency(data.interestPayment)}
      nextRepaymentDate={formatDate(data.nextRepaymentDate)}
      remainPrincipal={formatCurrency(data.remainPrincipal)}
      principal={formatCurrency(data.principal)}
      monthlyRepayment={formatCurrency(data.monthlyRepayment)}
      accountNumber={data.accountNumber || "-"}
      loanType={loanTypeMap[data.loanType] || data.loanType || "-"}
      repaymentType={repaymentTypeMap[data.repaymentType] || data.repaymentType || "-"}
    />
  );
}
