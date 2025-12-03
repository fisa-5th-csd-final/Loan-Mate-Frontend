"use client";

import { useState } from "react";

export default function NumberKeypad({
  onDigit,
  onDelete,
  pinMode = false,   
}: {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  pinMode?: boolean;
}) {
  const [pin, setPin] = useState("");

  const handleDigit = (n: string) => {
    if (pinMode) {
      if (pin.length >= 6) return;
      setPin(prev => prev + n);
    }
    onDigit(n);
  };

  const handleDelete = () => {
    if (pinMode) {
      setPin(prev => prev.slice(0, -1));
    }
    onDelete();
  };

  return (
    <div className="flex flex-col items-center">

      {pinMode && (
        <div className="flex justify-center gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-4 h-6 flex items-center justify-center">
              {pin[i]
                ? <div className="w-3 h-3 bg-black rounded-full"></div>  // ● 표시
                : <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
              }
            </div>
          ))}
        </div>
      )}

      {/* ---------------- 숫자 키패드 ---------------- */}
      <div className="grid grid-cols-3 gap-5 text-center text-xl font-medium w-full">
        {["1","2","3","4","5","6","7","8","9"].map((n) => (
          <button
            key={n}
            onClick={() => handleDigit(n)}
            className="py-3 active:bg-gray-100 rounded-lg"
          >
            {n}
          </button>
        ))}

        <div></div>

        <button
          onClick={() => handleDigit("0")}
          className="py-3 active:bg-gray-100 rounded-lg"
        >
          0
        </button>

        <button
          onClick={handleDelete}
          className="py-3 active:bg-gray-100 rounded-lg text-base"
        >
          ←
        </button>
      </div>
    </div>
  );
}
