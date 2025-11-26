"use client";
import PercentageSpeechBubble from "./PercentageSpeechBubble";

type ProgressBarProps = {
    progress : number
    min : number
    max : number
};
export default function ProgressBar({progress, min, max}:ProgressBarProps){
    const safeProgress = Math.min(100, Math.max(0, progress))

    return (

        <div className="relative px-2 bg-[#D1EAFF] h-[50px] w-[300px] flex justify-center items-center p-2.5 flex-col gap-2" >
            <div className="h-[15px] w-full flex justify-between text-[#676E74] font-semibold text-[12px] leading-normal">
                <span className="text-left">
                    {min}
                </span>
                <span className="text-right">
                    {max}
                </span>
            </div>

            <div className="w-full h-1 bg-[#F8F9F9] flex justify-start rounded-[18px] relative">
                <div
                    className={`
                        h-1 
                        rounded-[18px] 
                        bg-[#0067AC]
                        transition-all 
                        duration-300 
                        ease-in-out
                        `}
                        style={{ width: `${safeProgress}%` }} 
                />

                <div
                    className="absolute flex flex-col items-center z-20 transition-all duration-300"
                    style={{
                    left: `calc(${safeProgress}% - 10px)`,
                    transform: 'translateY(-50%)',
                }}>
                    <PercentageSpeechBubble percentage={progress}/>
                    <div 
                        className=" w-4 h-4 bg-white border-4 border-[#0067AC] rounded-full shadow-md"
                    />

                </div>
                           
            </div>

            
        </div>
    );
}