"use client";

import { AlertTriangle } from "lucide-react";

interface WarningConfirmContentProps {
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

export default function WarningConfirmContent({
  onConfirm,
  onCancel,
  isProcessing = false,
}: WarningConfirmContentProps) {
  return (
    <div className="w-full text-center px-4 py-6">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
          <AlertTriangle className="text-yellow-500" size={42} strokeWidth={2.5} />
        </div>
      </div>

      {/* Text */}
      <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
        현재 한도로 확정할 시 연체 위험이 있습니다.
        {"\n"}
        그래도 확정하시겠습니까?
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          disabled={isProcessing}
          onClick={onConfirm}
          className={`flex-1 py-3 rounded-lg text-white font-medium transition ${
            isProcessing
              ? "bg-blue-300"
              : "bg-[#1565FF] hover:bg-[#0B50D6]"
          }`}
        >
          확정하기
        </button>

        <button
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition disabled:opacity-50"
        >
          취소하기
        </button>
      </div>
    </div>
  );
}
