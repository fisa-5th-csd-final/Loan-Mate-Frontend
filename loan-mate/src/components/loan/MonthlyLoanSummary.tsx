'use client';

import ProgressBar from '../ProgressBar';
import LoanRiskAverageBox from './LoanRiskAverageBox';
import LoanDetailContainer from './LoanRiskDetailContainer';
import { LoanRiskToggle } from './LoanRiskToggle';
import SectionHeading from '../SectionHeading';
import type { LoanSummary } from '@/../types/loan/LoanDetail';

import { RISK_LEVEL_MAP, RISK_COLOR_MAP } from '@/consts/loan';

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
    return (
        <div className="w-full max-w-2xl space-y-4">
            {/* 타이틀 */}
            <SectionHeading className="inline-block">
                이번달 나의 위험도 요약
            </SectionHeading>

            <div className="flex flex-col w-full justify-center p-4 gap-5 rounded-xl space-y-4 bg-white shadow-md">
                {/* 전체 대출 평균 위험도 박스 */}
                <LoanRiskAverageBox
                    percentage={10.2}
                    levelText="보통 수준"
                    emoji="😐"
                    label="평균"
                />

                {/* 전체 대출 비율 프로그레스바 */}
                <div className="flex flex-col gap-5">
                    <ProgressBar label="나의 대출 비율" value={totalLoanRate} />
                    <ProgressBar label="또래 평균 대출 비율" value={peerAverageLoanRatio} />
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
