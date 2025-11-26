import React from "react";

type MobileNotchProps = {
    /** 추가 커스텀 클래스 (기본값: w-[40%] max-w-[120px] h-4 bg-black) */
    className?: string;
};

export default function MobileNotch({
    className = "",
}: MobileNotchProps) {
    return (
        <div className="w-full flex flex-col items-center absolute top-0 left-0 z-50 pointer-events-none">
            <div
                className={`bg-black rounded-b-[18px] w-[40%] max-w-[120px] h-4 transition-all duration-300 ease-in-out ${className}`}
            />
        </div>
    );
}
