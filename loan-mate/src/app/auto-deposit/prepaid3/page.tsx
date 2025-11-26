"use client";

import { useRouter } from "next/navigation";
import NavigationBar from "@/components/navigation/BackRouteNavigation";
import CommonButton from "@/components/button/CommonButton";
import { ChevronDown } from "lucide-react";

export default function Prepaid3Page() {
  const router = useRouter();

  return (
    <div className="px-5 pt-4">

      {/* Header */}
        <NavigationBar
              title="계좌번호를 입력해주세요"
              showBack={true}
              right={<button className="absolute right-0 text-2xl">✕</button>}
              />

      {/* 은행 선택 */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <img src="/logo/shinhan.svg" alt="shinhan" className="h-4" />
        </div>

        <span className="font-medium text-gray-700">신한은행</span>

        {/* 화살표 아이콘 라이브러리 사용*/}
        <ChevronDown size={16} className="text-gray-500" />
      </div>

      {/* 계좌번호 입력 */}
      <input
        type="text"
        defaultValue="110259718376"
        className="w-full text-xl border-b border-gray-300 pb-2 outline-none"
      />

      {/* 다음 버튼 */}
      {/* <CommonButton>

      </CommonButton> */}
      <button 
        onClick={() => router.push("/auto-deposit/select-bank")}
        className="w-full bg-blue-500 text-white py-3 rounded-lg mt-10 font-medium">
        다음
      </button>
    </div>
  );
}
