"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CommonButton from "@/components/button/CommonButton";
import NavigationBar from "@/components/navigation/BackRouteNavigation";

export default function AutoDepositAmountPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 허용
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  };

  return (
    <div className="px-5 pt-4 pb-10 bg-white">

      {/* ------------------ Header ------------------ */}
      <NavigationBar
      title="자동이체 등록"
      showBack={true}
      right={<button className="text-blue-500 text-sm">취소</button>}
      />
      <div className="text-sm text-gray-500 mt-2">01 / 07</div>


      {/* ------------------ From Account ------------------ */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <img src="/logo/woori.svg" className="h-5" />
          </div>

          <div className="text-gray-900 font-medium">우리은행 계좌에서</div>
        </div>

        <div className="text-gray-500 text-sm">
          우리 1002-865-685398
        </div>
      </div>

      {/* ------------------ To Account ------------------ */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <img src="/logo/shinhan.svg" className="h-5" />
          </div>

          <div className="text-gray-900 font-medium">박준삼님 계좌로</div>
        </div>

        <div className="text-gray-500 text-sm">
          신한 110259718376
        </div>
      </div>

      {/* ------------------ 네이티브 키패드 입력창 ------------------ */}
      <input
        type="tel"                 // 숫자 키패드 활성화
        inputMode="numeric"        // iOS/Android 숫자패드 강제
        pattern="[0-9]*" 
        value={amount}
        onChange={handleChange}
        placeholder="얼마를 이체하시겠어요?"
        className="
          w-full text-4xl font-semibold text-center py-4 mb-6 outline-none border-b
        placeholder:text-gray-300 placeholder:text-xl
        "
      />

      <div className="text-gray-500 text-sm mb-4">
        잔액 360,588원
      </div>

      {/* ------------------ Quick Buttons------------------ */}
      {/* ------------------ Quick Buttons (옵션: 필요하면 유지) ------------------ */}
      {/* 필요 없다면 이 영역 삭제 가능 */}

      <div className="flex gap-2 mb-8">
        <button className="px-3 py-2 bg-gray-100 text-sm rounded-lg"
          onClick={() => setAmount((+amount + 10000).toString())}>+1만</button>

        <button className="px-3 py-2 bg-gray-100 text-sm rounded-lg"
          onClick={() => setAmount((+amount + 50000).toString())}>+5만</button>

        <button className="px-3 py-2 bg-gray-100 text-sm rounded-lg"
          onClick={() => setAmount((+amount + 100000).toString())}>+10만</button>

        <button className="px-3 py-2 bg-gray-100 text-sm rounded-lg"
          onClick={() => setAmount((+amount + 1000000).toString())}>+100만</button>

        <button className="px-3 py-2 bg-gray-100 text-sm rounded-lg"
          onClick={() => setAmount("360588")}>전액</button>
      </div>

      <CommonButton
        label="확인"
        size="lg"                          
        widthClassName="w-full"            
        colorClassName="bg-blue-500 hover:bg-blue-600 text-white"
        className="rounded-xl text-lg font-medium"                 
        onClick={() => router.push(`/confirm?amount=${amount}`)}
      />


    </div>
  );
}
