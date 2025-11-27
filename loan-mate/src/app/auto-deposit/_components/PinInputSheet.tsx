"use client";

import { useState } from "react";

export default function PinInputSheet({
  onSubmit,
  onCancel,
}: {
  onSubmit: (value: string) => void;
  onCancel: () => void;
}) {
  const [pin, setPin] = useState("");

  const addDigit = (num: string) => {
    if (pin.length >= 6) return;
    setPin((prev) => prev + num);
  };

  const deleteDigit = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const isComplete = pin.length === 6;

  return (
    <div>
      {/* 상단 X 버튼 */}
      <div className="flex justify-end mb-5">
        <button onClick={onCancel} className="text-gray-500 text-xl">
          ✕
        </button>
      </div>

      {/* 타이틀 */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold">계좌 비밀번호</h2>
      </div>

      {/* PIN 표시 ●●●● */}
      <div className="flex justify-center gap-3 mb-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center"
          >
            {pin.length > i && (
              <div className="w-3 h-3 bg-gray-800 rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* 키패드 */}
      <div className="grid grid-cols-3 gap-5 text-center text-xl font-medium">
        {["1","2","3","4","5","6","7","8","9"].map((n) => (
          <button
            key={n}
            onClick={() => addDigit(n)}
            className="py-3 active:bg-gray-100 rounded-lg"
          >
            {n}
          </button>
        ))}

        {/* 빈칸 */}
        <div></div>

        {/* 0 */}
        <button
          onClick={() => addDigit("0")}
          className="py-3 active:bg-gray-100 rounded-lg"
        >
          0
        </button>

        {/* 삭제 */}
        <button
          onClick={deleteDigit}
          className="py-3 active:bg-gray-100 rounded-lg text-base"
        >
          전체삭제
        </button>
      </div>

      {/* 완료 버튼 */}
      <button
        className={`w-full mt-8 py-4 rounded-xl font-semibold ${
          isComplete ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"
        }`}
        disabled={!isComplete}
        onClick={() => onSubmit(pin)}
      >
        확인
      </button>
    </div>
  );
}
