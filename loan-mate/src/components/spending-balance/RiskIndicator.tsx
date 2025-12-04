import React from 'react';

interface RiskIndicatorProps {
    emoji: string;
    riskText: string;
}

export default function RiskIndicator({ emoji, riskText }: RiskIndicatorProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-1">
            {/* 이모티콘 */}
            <div className="text-4xl">{emoji}</div> 
            
            {/* 위험도 텍스트 */}
            <p className="text-xl font-bold text-[#2E393D]">{riskText}</p>
        </div>
    );
}