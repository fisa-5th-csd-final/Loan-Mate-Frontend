// GaugeMeter.tsx
import React, { useMemo } from 'react';

interface RiskGaugeMeterProps {
    riskLevel: number; // 0 ~ 100
}

export default function RiskGaugeMeter({ riskLevel }: RiskGaugeMeterProps) {

    const maxLevel = 100;
    const width = 230;
    const radius = width / 2;
    const strokeWidth = 20; // 바의 굵기
    const effectiveRadius = radius - strokeWidth / 2;

    // 0 ~ 100 레벨을 각도 (180도 ~ 0도)로 변환
    // 게이지는 왼쪽(180도)에서 오른쪽(0도)으로 채워집니다.
    const angleRad = useMemo(() => {
        const angleDeg = 180 - (riskLevel / maxLevel) * 180;
        return (angleDeg * Math.PI) / 180;
    }, [riskLevel]);

    // 핸들(원)의 위치 계산 (반원형 궤적)
    const { x, y } = useMemo(() => {
        // SVG 좌표계: 원점 (0, R)
        const currentX = radius + effectiveRadius * Math.cos(angleRad);
        const currentY = radius - effectiveRadius * Math.sin(angleRad);
        return { x: currentX, y: currentY };
    }, [angleRad, radius, effectiveRadius]);

    return (
        <svg
            width={width}
            height={radius}
            viewBox={`0 0 ${width} ${radius}`}
            style={{ overflow: 'visible' }} // 핸들이 SVG 밖으로 튀어나올 수 있도록
        >
            <defs>
                {/* 게이지 바의 배경 그라데이션 */}
                <linearGradient id="backgroundGradient" x1="0%" y1="100%" x2="100%" y2="100%">
                    {/* 연한 주황색 (이미지의 왼쪽 부분) */}
                    <stop offset="0%" style={{ stopColor: "#FFCFA0", stopOpacity: 0.5 }} />
                    {/* 연한 분홍색 (이미지의 오른쪽 부분) */}
                    <stop offset="100%" style={{ stopColor: "#FFD7E4", stopOpacity: 0.5 }} />
                </linearGradient>

                {/* 그림자 필터 */}
                <filter id="handleShadow" x="-50%" y="-50%" width="200%" height="200%">
                    {/*
                        dx/dy: 그림자 오프셋 (수평/수직)
                        flood-color: 그림자 색상
                    */}
                    <feDropShadow
                        dx="0"
                        dy="2"
                        floodColor="#000"
                        floodOpacity="0.3"
                    />
                </filter>
            </defs>

            {/* 게이지 바의 배경 */}
            <path
                d={`M ${strokeWidth / 2} ${radius} A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${width - strokeWidth / 2} ${radius}`}
                fill="none"
                stroke="url(#backgroundGradient)"
                strokeWidth={strokeWidth - 5}
                strokeLinecap="round"
            />

            {/* 채워진 게이지 바 (파란색) */}
            <path
                d={`M ${strokeWidth / 2} ${radius} A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${x} ${y}`}
                fill="none"
                stroke="#2789F4" // 색상
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                filter='url(#handleShadow)'
            />

            {/* 핸들 (원) - SVG 좌표계 사용 */}
            <circle
                cx={x}
                cy={y}
                r={8} // 원의 크기
                fill="none"
                stroke="#ffffff"
                strokeWidth={8}
                filter='url(#handleShadow)'
            />
        </svg>
    );
}