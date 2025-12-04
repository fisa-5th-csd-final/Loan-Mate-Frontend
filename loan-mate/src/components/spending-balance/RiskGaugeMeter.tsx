// GaugeMeter.tsx
"use client";
import React, { useMemo } from "react";
interface RiskGaugeMeterProps {
    riskLevel: number; // 0 ~ 100
}
export default function RiskGaugeMeter({ riskLevel }: RiskGaugeMeterProps) {
    const maxLevel = 100;
    const width = 220;
    const radius = width / 2;
    const strokeWidth = 20;
    const effectiveRadius = radius - strokeWidth / 2;
    // 180도 → 0도
    const angleRad = useMemo(() => {
        const angleDeg = 180 - (riskLevel / maxLevel) * 180;
        return (angleDeg * Math.PI) / 180;
    }, [riskLevel]);
    // 핸들 위치 계산
    const { x, y } = useMemo(() => {
        const px = radius + effectiveRadius * Math.cos(angleRad);
        const py = radius - effectiveRadius * Math.sin(angleRad);
        return { x: px, y: py };
    }, [angleRad, radius, effectiveRadius]);
    // arc 길이(반원)
    const arcLength = Math.PI * effectiveRadius;
    // 진행률
    const progress = riskLevel / 100;
    return (
        <svg
            width={width}
            height={radius}
            viewBox={`0 0 ${width} ${radius}`}
            style={{ overflow: "visible" }}
        >
            <defs>
                <linearGradient
                    id="backgroundGradient"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#FFCFA0" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#FFD7E4" stopOpacity="0.5" />
                </linearGradient>
                <filter
                    id="handleShadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feDropShadow dx="0" dy="2" floodColor="#000" floodOpacity="0.3" />
                </filter>
            </defs>
            {/* 배경 arc (전체) */}
            <path
                d={`M ${strokeWidth / 2} ${radius} A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${width - strokeWidth / 2
                    } ${radius}`}
                fill="none"
                stroke="url(#backgroundGradient)"
                strokeWidth={strokeWidth - 5}
                strokeLinecap="round"
            />
            {/* 채워진 arc (길이로 제어 — 깨짐 없음) */}
            <path
                d={`M ${strokeWidth / 2} ${radius} A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${width - strokeWidth / 2
                    } ${radius}`}
                fill="none"
                stroke="#2789F4"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={arcLength}
                strokeDashoffset={arcLength * (1 - progress)}
                filter="url(#handleShadow)"
            />
            {/* 핸들 */}
            <circle
                cx={x}
                cy={y}
                r={8}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={8}
                filter="url(#handleShadow)"
            />
        </svg>
    );
}