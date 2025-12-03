"use client";
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useTransferStore } from "@/stores/useTransferStore";
import { formatAccountNumber, isValidAccountNumber } from "@/lib/util/NumberFormatter"
import CommonButton from "@/components/button/CommonButton";

import { useNavigation } from "@/components/navigation/NavigationContext";
import { useEffect } from "react";

export default function Prepaid3Page() {
  const router = useRouter();
  const { setTitle, setShowBack, setRight } = useNavigation();

  useEffect(() => {
    setTitle("계좌번호 입력하기");
    setShowBack(true);
    setRight(
      <button className="text-black text-sm">✕</button>
    );
  }, [setTitle, setShowBack, setRight]);

  const { inputAccount, setAccount, bankName, bankLogo } = useTransferStore();

  return (
    <div className="px-5 pt-4">

      {/* Header */}
      {/* NavigationBar removed */}

      {/* 은행 선택 */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <img src={bankLogo} alt={bankName} className="h-7" />
        </div>

        <span className="font-medium text-gray-700">{bankName}</span>

        {/* 화살표 아이콘 라이브러리 사용*/}
        <ChevronDown size={16} className="text-gray-500" />
      </div>

      {/* 계좌번호 입력 */}
      <input
        type="text"
        value={formatAccountNumber(inputAccount)}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, ""); // 숫자만 저장
          setAccount(raw);
        }}
        className="w-full text-xl border-b border-gray-300 pb-2 outline-none"
      />

      {!isValidAccountNumber(inputAccount) && (
        <p className="text-red-500 text-sm mt-1">
          ⚠ 계좌번호는 13자리여야 합니다.
        </p>
      )}

      {/* 다음 버튼 */}
      <CommonButton
        label="다음"
        size="lg"
        widthClassName="w-full"
        colorClassName={
          isValidAccountNumber(inputAccount)
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-300 text-white cursor-not-allowed"
        }
        disabled={!isValidAccountNumber(inputAccount)}
        onClick={() => {
          if (!isValidAccountNumber(inputAccount)) return;
          router.push("/auto-deposit/amount");
        }}
      />

    </div>
  );
}
