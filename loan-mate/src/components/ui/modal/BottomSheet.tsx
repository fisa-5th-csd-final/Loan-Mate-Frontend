"use client";

import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  // 배경 스크롤 방지
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* 배경 */}
          <motion.button
            type="button"
            aria-label="bottom sheet overlay"
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 시트 */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="w-full bg-white rounded-t-2xl shadow-xl p-5 z-50 max-h-[85vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            {/* 상단 핸들 */}
            <div className="w-full flex justify-center mb-3">
              <div className="w-10 h-1.5 rounded-full bg-gray-300" />
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
