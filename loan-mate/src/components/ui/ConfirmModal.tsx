"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "확인",
    cancelLabel = "취소",
}: ConfirmModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[320px] bg-white rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 whitespace-pre-line">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-sm text-gray-500 whitespace-pre-line">
                            {description}
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 h-12 rounded-xl bg-gray-100 text-gray-600 font-medium text-[15px] hover:bg-gray-200 transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 h-12 rounded-xl bg-blue-600 text-white font-medium text-[15px] hover:bg-blue-700 transition-colors"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
