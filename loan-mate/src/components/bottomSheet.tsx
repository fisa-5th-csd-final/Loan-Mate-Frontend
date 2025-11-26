"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomSheet({
  open,
  onClose,
  children,
  height = "auto", 
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: "auto" | number;
}) {
  // 배경 스크롤 방지
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* 배경 */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 시트 */}
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-xl p-5"
            style={{
              height: height === "auto" ? "auto" : `${height}px`,
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
