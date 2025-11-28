type PercentageSpeechBubbleProps = {
    percentage : number
}
export default function PercentageSpeechBubble( { percentage } : PercentageSpeechBubbleProps){
    
    return(
        <div className="flex flex-col items-center">
            <div className="bg-[#0067AC] text-white relative 
                   w-7 h-4 flex items-center justify-center 
                   text-center text-[10px] font-semibold rounded-xs"
                   >
                {percentage}%
            </div>
            <div 
                className="
                        w-0 h-0 
                        border-solid
                        border-l-transparent border-r-transparent 
                        border-b-transparent
                        border-t-[6px] border-t-[#0067AC]
                        border-l-4 border-r-4"
            />
        </div>

    );

}