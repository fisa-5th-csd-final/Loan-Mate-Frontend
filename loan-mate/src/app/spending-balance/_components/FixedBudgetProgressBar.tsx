"use client";
import PercentageSpeechBubble from "./PercentageSpeechBubble";
import { useEffect, useRef, useState, useCallback } from "react";

type ProgressBarProps = {
    progress: number
    min: number
    max: number
    label: string
    onChange?: (value: number) => void;
};

export default function ProgressBar({ progress, min, max, label, onChange }: ProgressBarProps) {
    const barRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const safeProgress = Math.min(100, Math.max(0, progress));

    // 바 길이에 따라 progress 계산
    const updateProgressFromPosition = useCallback((clientX: number) => {
        if (!barRef.current) return;

        const rect = barRef.current.getBoundingClientRect();
        const x = clientX - rect.left; // 바 왼쪽에서부터의 거리
        const ratio = x / rect.width;
        const newProgress = Math.min(100, Math.max(0, ratio * 100));

        onChange?.(Math.round(newProgress));
    }, [onChange]);

    // 마우스 드래그 이벤트
    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                updateProgressFromPosition(e.clientX);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging) {
                updateProgressFromPosition(e.touches[0].clientX);
            }
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleMouseUp);
        };
    }, [isDragging, updateProgressFromPosition, handleMouseUp]);

    return (
        <div className="flex flex-col gap-2">
            <div className="font-semibold text-[12px] text-[#2E393D]">{label}</div>
            <div className="relative px-2 bg-[#D1EAFF] h-[50px] w-full flex justify-center items-center p-2.5 flex-col gap-2 rounded-[5px]" >
                <div className="h-[15px] w-full flex justify-between text-[#676E74] font-semibold text-[12px] leading-normal">
                    <span className="text-left">
                        {min}
                    </span>
                    <span className="text-right">
                        {max}
                    </span>
                </div>

                <div ref={barRef} className="w-full h-1 bg-[#F8F9F9] flex justify-start rounded-[18px] relative">
                    {/* 색칠된 바 */}
                    <div
                        className={`
                        h-1 
                        rounded-[18px] 
                        bg-[#0067AC]
                        `}
                        style={{ width: `${safeProgress}%` }}
                    />

                    <div
                        className="absolute flex flex-col items-center z-20 -top-2"
                        style={{
                            left: `min(
                            calc(100% - 16px),
                            calc(${safeProgress}% - 8px)
                        )`,
                            transform: 'translateY(-50%)',
                        }}>

                        {/* 말풍선 + % */}
                        <PercentageSpeechBubble percentage={progress} />
                        {/* 조절 원 */}
                        <div
                            className="w-4 h-4 bg-white border-4 border-[#0067AC] rounded-full shadow-md"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setIsDragging(true);
                                updateProgressFromPosition(e.clientX);
                            }}
                            onTouchStart={(e) => {
                                setIsDragging(true);
                                updateProgressFromPosition(e.touches[0].clientX);
                            }}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}