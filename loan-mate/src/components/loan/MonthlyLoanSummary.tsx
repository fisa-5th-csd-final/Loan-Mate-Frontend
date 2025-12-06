'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

import ProgressBar from "@/components/ui/progress/ProgressBar";
import LoanRiskAverageBox from './LoanRiskAverageBox';
import LoanDetailContainer from './LoanRiskDetailContainer';
import { LoanRiskToggle } from './LoanRiskToggle';
import SectionHeading from "@/components/ui/typography/SectionHeading";
import type { LoanSummary } from '@/../types/loan';
import { useTotalLoanRisk } from '@/hooks/loan/useTotalLoanRisk';

import { RISK_LEVEL_MAP, RISK_COLOR_MAP, RISK_LEVEL_TEXT_MAP, RISK_EMOJI_MAP, getCyclicBankIcon } from '@/consts/loan';

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
    const [isExpanded, setIsExpanded] = useState(false);

    // 상위 3개와 나머지 분리
    const initialLoans = loans?.slice(0, 3);
    const extraLoans = loans?.slice(3);
    const hasMoreLoans = (loans?.length ?? 0) > 3;

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
                <div className="flex flex-col gap-2">
                    {/* 상위 3개는 항상 표시 */}
                    {
                        initialLoans?.map((loan, index) => {
                            const riskLabel = RISK_LEVEL_MAP[loan.riskLevel] || loan.riskLevel;
                            const riskColor = RISK_COLOR_MAP[loan.riskLevel] || "text-gray-500";
                            const logoUrl = getCyclicBankIcon(index);

                            return (
                                <LoanRiskToggle
                                    key={loan.loanId}
                                    title={loan.loanName}
                                    riskLabel={riskLabel}
                                    riskColorClassName={riskColor}
                                    logoUrl={logoUrl}
                                >
                                    <LoanDetailContainer loanId={loan.loanId} />
                                </LoanRiskToggle>
                            );
                        })
                    }

                    {/* 나머지는 펼쳐보기 시 표시 (슬라이딩 애니메이션) */}
                    <AnimatePresence>
                        {isExpanded && extraLoans && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="flex flex-col gap-2 overflow-hidden"
                            >
                                {extraLoans.map((loan, index) => {
                                    // index에 3을 더해 전체 리스트 기준 인덱스 유지
                                    const realIndex = index + 3;
                                    const riskLabel = RISK_LEVEL_MAP[loan.riskLevel] || loan.riskLevel;
                                    const riskColor = RISK_COLOR_MAP[loan.riskLevel] || "text-gray-500";
                                    const logoUrl = getCyclicBankIcon(realIndex);

                                    return (
                                        <LoanRiskToggle
                                            key={loan.loanId}
                                            title={loan.loanName}
                                            riskLabel={riskLabel}
                                            riskColorClassName={riskColor}
                                            logoUrl={logoUrl}
                                        >
                                            <LoanDetailContainer loanId={loan.loanId} />
                                        </LoanRiskToggle>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 펼쳐보기 / 접기 버튼 */}
                {hasMoreLoans && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center justify-center gap-1 w-full py-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <span className="text-sm font-medium">
                            {isExpanded ? '접기' : '펼쳐보기'}
                        </span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                )}
            </div>
        </div>
    );
}
