"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TransferFinalPage() {
  const router = useRouter();
  const params = useSearchParams();
  const amount = params.get("amount") || "0";

  const formatted = Number(amount).toLocaleString();

  return (
    <div className="px-5 pt-4 pb-10">

      {/* ---------------- Header ---------------- */}
      <div className="relative flex items-center justify-center mb-6">
        <button onClick={() => router.back()} className="absolute left-0 text-2xl">
          ←
        </button>

        <button className="absolute right-0 text-blue-500 text-sm">
          취소
        </button>
      </div>

      {/* ---------------- Icons ---------------- */}
      <div className="flex items-center gap-4 mb-6">
        {/* 보내는 계좌 은행 */}
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <img src="/logo/woori.svg" className="h-7" />
        </div>

        {/* 받는 계좌 은행 */}
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <img src="/logo/shinhan.svg" className="h-7" />
        </div>
      </div>

      {/* ---------------- Title Text ---------------- */}
      <div className="text-xl font-semibold mb-2">
        <span className="text-blue-600 font-semibold">박준상</span> 님에게
      </div>

      <div className="text-xl font-semibold mb-2">
        <span className="text-blue-600">{formatted}원</span>을 이체하시겠어요?
      </div>

      <div className="text-gray-500 text-sm mb-8">
        신한 110259718376 계좌로 보냅니다.
      </div>

      {/* ---------------- Info Box ---------------- */}
      <div className="bg-gray-100 rounded-2xl p-4 text-sm mb-8">

        <div className="flex justify-between py-2">
          <span className="text-gray-600">수수료</span>
          <span className="text-gray-800">면제</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-600">받는 분 통장표기</span>
          <span className="text-gray-800">박준상</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-600">내 통장표기</span>
          <span className="text-gray-800">박준상</span>
        </div>

      </div>

      {/* ---------------- Info Notice ---------------- */}
      <div className="text-center text-gray-400 text-sm mb-6">
        인증서 비밀번호 입력 없이 바로 이체됩니다.
      </div>

      {/* ---------------- Buttons ---------------- */}
      <div className="flex gap-3">
        
        {/* 추가이체 */}
        <button
          className="flex-1 py-4 bg-gray-100 rounded-xl text-gray-700 font-medium"
          onClick={() => router.push("/auto-deposit/amount")}
        >
          추가이체
        </button>

        {/* 이체 */}
        <button
          className="flex-1 py-4 bg-blue-500 text-white rounded-xl font-medium"
          onClick={() => alert('이체 완료')}
        >
          이체
        </button>

      </div>

    </div>
  );
}
