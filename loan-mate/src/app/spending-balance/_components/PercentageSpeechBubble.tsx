type PercentageSpeechBubbleProps = {
    percentage : number
}
export default function PercentageSpeechBubble( { percentage } : PercentageSpeechBubbleProps){
    
    return(
        <div className="flex flex-col items-center">
            <div className="bg-[#0067AC] text-white relative 
                   w-7 h-4 flex items-center justify-center 
                   text-center text-[10px] font-bold rounded-xs"
                   >
                {percentage}
            </div>
            <div 
                className="border-[6px] 
                           border-transparent 
                           border-t-[#0067AC]" // 상단 테두리만 색상 지정하여 아래로 향하는 삼각형 생성
            />
        </div>

    );

}