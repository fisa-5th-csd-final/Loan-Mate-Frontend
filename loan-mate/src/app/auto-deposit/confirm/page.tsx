"use client";
export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";

import NavigationBar from "@/components/navigation/BackRouteNavigation";
import CommonButton from "@/components/button/CommonButton";
import { ChevronDown } from "lucide-react";


export default function AutoDepositConfirmPage() {

  const params = useSearchParams();
  const amount = params.get("amount") || "0";

  const formatted = Number(amount).toLocaleString();

  const router = useRouter();
  return (

    <div className="px-5 pt-4 pb-10 bg-white">

      {/* Header */}

      <NavigationBar
            title=""
            showBack={true}
            right={<button className="text-blue-500 text-sm">취소</button>}
      />

      {/* From Account */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <img src="/logo/woori.svg" className="h-8" />
          </div>

          <div className="text-gray-900 font-medium flex items-center gap-1">
            우리은행 계좌에서
            {/* 화살표 아이콘 라이브러리 사용*/}
          <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          WON통장 1002-865-685398
        </div>
      </div>

      {/* To Account */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <img src="/logo/shinhan.svg" className="h-6" />
          </div>

        <div className="text-gray-900 font-medium flex items-center gap-1">
            박준상 님 계좌로
            {/* 화살표 아이콘 라이브러리 사용*/}
          <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          신한 110259718376
        </div>
      </div>

      {/* Amount */}
      <div className="w-full mt-4 mb-4 text-6xl">
        <span className="inline-block text-xl font-semibold **:leading-tight">
            {formatted}원
        </span>
        </div>


      <div className="text-m text-gray-500 mb-8">
        {formatted}원 · 출금가능금액 360,588원
      </div>

      {/* Labels */}
      <div className="flex justify-between py-4">
        <div className="text-gray-500 text-sm">받는 분 통장표기</div>
        <div className="text-gray-700 text-sm">박준상</div>
      </div>

      <div className="flex justify-between py-4 border-b border-gray-200 mb-8">
        <div className="text-gray-500 text-sm">내 통장표기</div>
        <div className="text-gray-700 text-sm">박준상</div>
      </div>

      {/* More */}
      <div className="flex justify-center py-5 text-gray-500">
        <span>더보기</span>
        <svg
          className="ml-1 w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Warning */}
      <div className="py-6 text-center text-gray-400 text-sm">
        이체 유의사항 및 안내
      </div>

      {/* Next Button */}
      <CommonButton
              label="다음"
              size="lg"                          
              widthClassName="w-full"            
              colorClassName="bg-blue-500 hover:bg-blue-600 text-white"
              className="rounded-xl text-lg font-medium"                 
              onClick={() => router.push(`/confirm?amount=${amount}`)}
            />
    </div>
  );
}
