import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type AiCommentBoxProps = {
  children: ReactNode;
  className?: string;
};

export default function AiCommentBox({ children, className }: AiCommentBoxProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-100 shadow-sm ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-shrink-0">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-blue-100">
            <Sparkles className="h-3 w-3 text-blue-600 fill-blue-600" />
          </div>
        </div>
        <p className="text-[13px] font-bold text-blue-900">AI 분석 리포트</p>
      </div>
      <div className="text-[14px] leading-relaxed text-slate-700 font-normal">
        {children}
      </div>

      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-100/50 blur-2xl" />
    </div>
  );
}
