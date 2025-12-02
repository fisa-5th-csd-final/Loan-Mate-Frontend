"use client";

import { AlertTriangle } from "lucide-react";

import BottomSheet from "@/components/bottomSheet";

interface WarningConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

export default function WarningConfirmModal({
  open,
  onConfirm,
  onCancel,
  isProcessing = false,
}: WarningConfirmModalProps) {
  return (
    <BottomSheet open={open} onClose={onCancel}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
            <AlertTriangle className="text-yellow-500" size={42} strokeWidth={2.5} />
          </div>
        </div>

        <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
          현재 한도로 확정할 시 연체 위험이 있습니다.{"\n"}
          그래도 확정하시겠습니까?
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className="flex-1 py-3 rounded-lg bg-[#1565FF] text-white font-medium hover:bg-[#0B50D6] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            확정하기
          </button>

          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition"
          >
            취소하기
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
