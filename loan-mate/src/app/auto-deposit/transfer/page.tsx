"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavigationBar from "@/components/navigation/BackRouteNavigation";
import CommonButton from "@/components/button/CommonButton";
import BottomSheet from "@/components/bottomSheet";
import NumberKeypad from "../_components/NumberKeypad";
import { useEffect } from "react";
import { useTransferStore } from "@/stores/useTransferStore";

function TransferFinalInner() {
  const [open, setOpen] = useState(false);
  const {bankName, bankLogo, inputAccount, amount, setAmount} = useTransferStore();

  const router = useRouter();
  const [pin, setPin] = useState("");

  const addDigit = (num: string) => {
    if (pin.length >= 6) return;
    setPin((prev) => prev + num);
  };

  const deleteDigit = () => {
    setPin((prev) => prev.slice(0, -1));
  }

  // const handleSubmitPin = (pin: string) => {
  //   setOpen(false);

  //   // 실제 이체 완료 로직 넣기
  // };

  useEffect(() => {
    if (pin.length === 6) {
      router.push("/auto-deposit/complete"); // ← 원하는 화면으로 이동
    }
  }, [pin]);


  return (
    <div className="px-5 pt-4 pb-10 bg-white">

      {/* ---------------- Header ---------------- */}
      <NavigationBar
        title=""
        showBack={true}
        right={<button className="text-blue-500 text-sm">취소</button>}
      />

      {/* ---------------- Icons ---------------- */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <img src="/logo/woori.svg" className="h-12" />
        </div>

        <div className="h-12 w-12 rounded-full bg-blue-300 flex items-center justify-center">
          <img src={bankLogo} className="h-9" />
        </div>
      </div>

      {/* ---------------- Title Text ---------------- */}
      <div className="text-xl font-semibold mb-2">
        <span className="text-blue-600 font-semibold">박준상</span> 님에게
      </div>

      <div className="text-xl font-semibold mb-2">
        <span className="text-blue-600">
          {amount !== "" ? amount.toLocaleString("ko-KR") : ""}
          원</span>을 이체하시겠어요?
      </div>

      <div className="text-gray-500 text-sm mb-8">
        {bankName} {inputAccount} 계좌로 보냅니다.
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

        <CommonButton
          label="추가이체"
          size="lg"
          widthClassName="w-full"
          textColorClassName="text-blue-500"
          className="flex-1 py-4 bg-blue-100 rounded-xl font-medium"
          onClick={() => router.push("/auto-deposit")}
        />

        <CommonButton
          label="이체"
          size="lg"
          widthClassName="w-full"
          textColorClassName="text-white"
          className="flex-1 py-4 bg-blue-500 rounded-xl font-medium"
          onClick={() => setOpen(true)}
        />
      </div>

      <BottomSheet open={open} onClose={() => setOpen(false)}>

      <NavigationBar
        title=""
        showBack={false}
        right={
          <button
            className="text-black text-xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        }
      />

      {/* 타이틀 */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold">계좌 비밀번호</h2>
      </div>

      <NumberKeypad
        pinMode={true}
        onDigit={addDigit}
        onDelete={deleteDigit}
      />

      </BottomSheet>
    </div>
  );
}


export default function TransferFinalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransferFinalInner />
    </Suspense>
  );
}
