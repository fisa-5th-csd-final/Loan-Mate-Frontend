'use client';

import ProgressBar from "@/components/ui/progress/ProgressBar";
import LoanRiskAverageBox from './LoanRiskAverageBox';
import LoanDetailContainer from './LoanRiskDetailContainer';
import { LoanRiskToggle } from './LoanRiskToggle';
import SectionHeading from "@/components/ui/typography/SectionHeading";
import type { LoanSummary } from '@/../types/loan';
import { useTotalLoanRisk } from '@/hooks/loan/useTotalLoanRisk';

import { RISK_LEVEL_MAP, RISK_COLOR_MAP, RISK_LEVEL_TEXT_MAP, RISK_EMOJI_MAP } from '@/consts/loan';

type MonthlyLoanSummaryProps = {
    loans?: LoanSummary[],
    totalLoanRate: number,
    peerAverageLoanRatio: number,
}

export default function MonthlyLoanSummary({
    loans,
    totalLoanRate,
    peerAverageLoanRatio
}: MonthlyLoanSummaryProps) {
    const { data: totalRisk, isLoading, error } = useTotalLoanRisk();

    return (
        <div className="w-full space-y-4">
            {/* 타이틀 */}
            <SectionHeading className="inline-block">
                이번달 나의 위험도 요약
            </SectionHeading>

            <div className="flex flex-col w-full justify-center p-4 gap-3 rounded-xl bg-white shadow-md">
                {/* 전체 대출 평균 위험도 박스 */}
                {isLoading ? (
                    <div className="w-full h-[88px] rounded-[28px] bg-gray-100 animate-pulse" />
                ) : error ? (
                    <div className="w-full p-4 text-center text-red-500 bg-red-50 rounded-xl text-sm">
                        {error instanceof Error ? error.message : "오류가 발생했습니다."}
                    </div>
                ) : (
                    <LoanRiskAverageBox
                        percentage={totalRisk ? Math.round(totalRisk.risk * 1000) / 10 : 0}
                        levelText={totalRisk ? RISK_LEVEL_TEXT_MAP[totalRisk.riskLevel] : "-"}
                        emoji={totalRisk ? RISK_EMOJI_MAP[totalRisk.riskLevel] : "😐"}
                        label="평균"
                    />
                )}

                {/* 전체 대출 비율 프로그레스바 */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <span className="text-gray-600 text-[15px]">나의 대출 비율</span>
                            <span className="text-gray-600 text-[15px]">{Math.round(totalLoanRate)}%</span>
                        </div>
                        <ProgressBar label="" value={totalLoanRate} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <span className="text-gray-600 text-[15px]">또래 평균 대출 비율</span>
                            <span className="text-gray-600 text-[15px]">{Math.round(peerAverageLoanRatio)}%</span>
                        </div>
                        <ProgressBar label="" value={peerAverageLoanRatio} color="#25D08A" />
                    </div>
                </div>

                {/* 개별 대출 위험도 토글들 */}
                <div>
                    {
                        loans?.map(loan => {
                            const riskLabel = RISK_LEVEL_MAP[loan.riskLevel] || loan.riskLevel;
                            const riskColor = RISK_COLOR_MAP[loan.riskLevel] || "text-gray-500";

                            return (
                                <LoanRiskToggle
                                    key={loan.loanId}
                                    title={loan.loanName}
                                    riskLabel={riskLabel}
                                    riskColorClassName={riskColor}
                                    logoUrl={loan.iconUrl}
                                >
                                    <LoanDetailContainer loanId={loan.loanId} />
                                </LoanRiskToggle>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
