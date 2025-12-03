"use client";

import { useRouter } from "next/navigation";
import CommonButton from "@/components/button/CommonButton";
import Card from "@/components/card/Card";
import { ChevronDown, ChevronRight, Star } from "lucide-react";
import { useTransferStore } from "@/stores/useTransferStore";
import { formatCurrency } from "@/lib/util/NumberFormatter"

import { useNavigation } from "@/components/navigation/NavigationContext";
import { useEffect } from "react";

export default function TransferCompletePage() {
  const router = useRouter();
  const { bankName, inputAccount, amount } = useTransferStore();
  const { setIsVisible } = useNavigation();

  useEffect(() => {
    setIsVisible(false);
    return () => setIsVisible(true);
  }, [setIsVisible]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white w-full rounded-2xl p-6 pt-14">
        {/* 체크 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-blue-600"
            >
              <title>이체 완료</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* 제목 */}
        <div className="text-center text-lg font-semibold mb-6">
          박준상 님에게<br />이체했어요
        </div>

        {/* 정보 카드 */}
        <Card>
          <div className="space-y-4 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-500">받는 계좌</span>
              <div className="flex items-center gap-1.5">
                <span className="font-medium">{bankName} {inputAccount}</span>
                <Star size={16} className="text-gray-400" />
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">이체금액</span>
              <span className="font-medium">{formatCurrency(amount)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">메모</span>
              <button className="flex items-center gap-1 text-gray-400 font-medium">
                내용을 입력할 수 있어요<ChevronRight size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">이체확인증</span>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-xs font-medium">
                보기
              </button>
            </div>

            <div className="border-t border-gray-200 pt-1" />

            <button className="text-gray-500 text-sm w-full text-center flex justify-center items-center gap-1">
              더보기
              <ChevronDown size={16} className="text-gray-500" />
            </button>

          </div>
        </Card>

        {/* 하단 버튼들 */}
        <div className="flex gap-3 mt-8">
          {/* 공유 버튼: 흰색 배경 + 보더 */}
          <CommonButton
            label="공유"
            size="lg"
            widthClassName="flex-[1]"
            colorClassName="bg-[#EEF5FF] !text-[#3B82F6] hover:bg-[#DCEBFF]"
            onClick={() => console.log("공유 클릭")}
          />

          {/* 확인 버튼: 파란색 버튼 */}
          <CommonButton
            label="확인"
            size="lg"
            widthClassName="flex-[2]"
            colorClassName="bg-[#4F8BFF] hover:bg-[#3D7CFF] text-white"
            onClick={() => router.push("/auto-deposit")}
          />
        </div>
      </div>
    </div>
  );
}