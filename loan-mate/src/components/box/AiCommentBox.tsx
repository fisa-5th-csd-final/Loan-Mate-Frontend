import { Sparkles } from "lucide-react";

type AiCommentBoxProps = {
    children: React.ReactNode;
    className?: string;
};

export default function AiCommentBox({ children, className }: AiCommentBoxProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-100 shadow-sm ${className ?? ""
                }`}
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-blue-100">
                        <Sparkles className="h-4 w-4 text-blue-600 fill-blue-600" />
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-[13px] font-medium text-blue-900 mb-1">AI 분석 리포트</p>
                    <div className="text-[14px] leading-relaxed text-slate-700 font-normal">
                        {children}
                    </div>
                </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-100/50 blur-2xl" />
        </div>
    );
}
