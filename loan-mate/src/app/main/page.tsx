"use client";

import React, { useEffect, useMemo, useState } from "react";
import AssetAndConsumeToggle from "@/components/button/AssetAndConsumeToggle";
import MainTopLevelNavigation, { MAIN_NAV_ITEMS } from "@/components/navigation/MainTopLevelNavigation";
import MonthlyLoanSummary from "@/components/loan/MonthlyLoanSummary";
import QuickActionFunctionList from "./_components/QuickActionFunctionList";
import QuickActionLoanFunctionList from "./_components/QuickActionLoanFunctionList";
import { type LoanSummary } from "@/../types/loan/LoanDetail";
import { fetchLoanList } from "@/lib/api/loan/ListFetch";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

type CategoryId = (typeof MAIN_NAV_ITEMS)[number]["id"];

function CategoryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-4 space-y-2">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <div className="text-gray-700 text-base leading-relaxed">{children}</div>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("loan");
  const [loans, setLoans] = useState<LoanSummary[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLoanList();
        setLoans(data);
      } catch (error) {
        console.error("Failed to fetch loan list:", error);
        // 에러 처리 로직 추가 가능 (예: 토스트 메시지)
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const contentByCategory = useMemo<Record<CategoryId, React.ReactNode>>(
    () => {
      const loanContent = isLoading ? (
        <div className="flex justify-center p-8">
          <LoadingSpinner />
        </div>
      ) : loans ? (
        <MonthlyLoanSummary
          loans={loans}
          totalLoanRate={0} // API에서 제공하지 않으므로 임시값 0
          peerAverageLoanRatio={0} // API에서 제공하지 않으므로 임시값 0
        />
      ) : (
        <div className="text-center p-4 text-gray-500">대출 정보를 불러올 수 없습니다.</div>
      );

      return {
        all: (
          <>
            {loanContent}
            <CategoryCard title="입출금/저축">
              입출금/저축 계좌 현황을 여기에 채워주세요. 예: 총 잔액, 저축 목표 달성률, 이번 달 입출금 추이 등.
            </CategoryCard>
            <CategoryCard title="투자">
              투자 포트폴리오 성과와 위험도를 보여줄 영역입니다. 예: 자산군별 비중, 수익률, 리스크 지표 등을 표시하세요.
            </CategoryCard>
            <CategoryCard title="연금/보험">
              연금/보험 요약 정보를 배치하세요. 예: 납입 현황, 만기 일정, 보장 범위 요약 등.
            </CategoryCard>
          </>
        ),
        deposit: (
          <CategoryCard title="입출금/저축">
            입출금/저축 계좌 현황을 여기에 채워주세요. 예: 총 잔액, 저축 목표 달성률, 이번 달 입출금 추이 등.
          </CategoryCard>
        ),
        loan: loanContent,
        invest: (
          <CategoryCard title="투자">
            투자 포트폴리오 성과와 위험도를 보여줄 영역입니다. 예: 자산군별 비중, 수익률, 리스크 지표 등을 표시하세요.
          </CategoryCard>
        ),
        pension: (
          <CategoryCard title="연금/보험">
            연금/보험 요약 정보를 배치하세요. 예: 납입 현황, 만기 일정, 보장 범위 요약 등.
          </CategoryCard>
        ),
      };
    },
    [isLoading, loans]
  );

  return (
    <>
      <AssetAndConsumeToggle />
      <MainTopLevelNavigation activeId={activeCategory} onChange={setActiveCategory} />
      <div className="p-4 space-y-4 flex flex-col items-center w-full">
        {contentByCategory[activeCategory]}
        <QuickActionFunctionList />
        <QuickActionLoanFunctionList />
      </div>
    </>
  );
}
