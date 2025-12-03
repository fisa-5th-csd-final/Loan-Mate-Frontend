"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

type CheckIconProps = {
  checked: boolean;
  size?: number;
};

export default function CheckIcon({ checked, size = 28 }: CheckIconProps) {
  return (
    <div style={{ width: size, height: size }} className="relative">
      <AnimatePresence mode="popLayout">
        {checked ? (
          <motion.div
            key="checked"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 28,
            }}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-500"
          >
            <Check
              strokeWidth={3}
              size={size * 0.55}
              className="text-white"
            />
          </motion.div>
        ) : (
          <motion.div
            key="unchecked"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 28,
            }}
            className="absolute inset-0 flex items-center justify-center rounded-full border border-gray-400 bg-white"
          >
            <Check
              strokeWidth={2.5}
              size={size * 0.55}
              className="text-gray-400"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
