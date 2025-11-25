'use client';

import ProgressBar from '../ProgressBar';
import LoanRiskAverageBox from './LoanRiskAverageBox';
import LoanDetailContainer from './LoanRiskDetailContainer';
import { LoanRiskToggle } from './LoanRiskToggle';

type MonthlyLoanSummaryProps = {
    loanIds?: number[],
    totalLoanRate: number,
    peerAverageLoanRatio: number,
}

export default function MonthlyLoanSummary({
    loanIds,
    totalLoanRate,
    peerAverageLoanRatio
}: MonthlyLoanSummaryProps) {
    return (
        <div className="w-full max-w-2xl space-y-4">
            {/* 타이틀 */}
            <h2 className="inline-block text-2xl font-bold text-gray-800">
                이번달 나의 위험도 요약
            </h2>

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
                        loanIds?.map(loanId => {
                            return (
                                <LoanRiskToggle key={loanId} title={`대출 #${loanId}`} riskLabel="보통">
                                    <LoanDetailContainer loanId={loanId} />
                                </LoanRiskToggle>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
