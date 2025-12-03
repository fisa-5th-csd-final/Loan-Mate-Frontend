"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useState, useEffect } from "react";
import CommonButton from "@/components/button/CommonButton";
import NumberKeypad from "../_components/NumberKeypad";
import { useTransferStore } from "@/stores/useTransferStore";
import { useSelectFromAccount } from "@/lib/api/auto-deposit/useSelectAccount";
import type { AccountDetail } from "@/lib/api/auto-deposit/types";
import { useNavigation } from "@/components/navigation/NavigationContext";
import { useNavigation as usePageTransition } from "@/context/NavigationContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function AutoDepositAmountPage() {

  const { get: getFromAccount } = useSelectFromAccount();
  const [fromAccount, setFromAccount] = useState<AccountDetail | null>(null);
  const { setTitle, setShowBack, setRight } = useNavigation();
  const { push } = usePageTransition();

  const { inputAccount, bankName, bankLogo, amount, setAmount } =
    useTransferStore();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    setTitle("금액 입력하기");
    setShowBack(true);
    setRight(
      <button
        className="text-blue-500 text-sm"
        onClick={() => setIsCancelModalOpen(true)}
      >
        취소
      </button>
    );
    const selected = getFromAccount();
    setFromAccount(selected);
  }, []);

  const isOverBalance =
    fromAccount && amount !== ""
      ? Number(amount) > Number(fromAccount.balance)
      : false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값에서 숫자만 추출됨
    const rawValue = e.target.value.replace(/\D/g, "");

    // 숫자 없으면 빈 문자열
    if (!rawValue) {
      setAmount("");
      return;
    }

    // 상태에는 number로 저장
    setAmount(Number(rawValue));
  };

  // input에 표시할 값 (콤마 포맷)
  const formattedAmount = amount !== "" ? amount.toLocaleString("ko-KR") : "";

  return (
    <div className="px-5 pt-4 pb-10 bg-white">
      {/* ------------------ Header ------------------ */}
      <div className="text-sm text-gray-500 mt-2">01 / 07</div>

      {/* ------------------ From Account ------------------ */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <img src="/logo/woori.svg" className="h-7" />
          </div>

          <div className="text-gray-900 font-medium">
            {fromAccount
              ? `${fromAccount.bankCode} 계좌에서`
              : "출금 계좌 선택 안됨"}
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          {fromAccount ? fromAccount.accountNumber : "계좌번호 없음"}
        </div>
      </div>

      {/* ------------------ To Account ------------------ */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <img src={bankLogo} className="h-7" />
          </div>

          <div className="text-gray-900 font-medium">박준삼님 계좌로</div>
        </div>

        <div className="text-gray-500 text-sm">
          {bankName} <p>{inputAccount}</p>
        </div>
      </div>

      {/* ------------------ 네이티브 키패드 입력창 ------------------ */}
      <input
        value={formattedAmount}
        onChange={handleChange}
        placeholder="얼마를 이체하시겠어요?"
        className="
          w-full text-4xl font-semibold text-center py-4 mb-6 outline-none border-b
        placeholder:text-gray-300 placeholder:text-xl
        "
      />

      {isOverBalance && (
        <p className="text-red-500 text-sm mb-2">
          ⚠ 잔액보다 큰 금액은 이체할 수 없습니다.
        </p>
      )}

      <div className="text-gray-500 text-sm mb-4">
        잔액 {fromAccount ? Number(fromAccount.balance).toLocaleString() : 0}원
      </div>

      {/* ------------------ Quick Buttons------------------ */}
      <div className="flex gap-2 mb-8">
        <button
          className="px-3 py-2 bg-gray-100 text-sm rounded-lg"
          onClick={() => setAmount((amount || 0) + 10000)}
        >
          +1만
        </button>

        <button
          className="px-3 py-2 bg-gray-100 text-sm rounded-lg"
          onClick={() => setAmount((amount || 0) + 50000)}
        >
          +5만
        </button>

        <button
          className="px-3 py-2 bg-gray-100 text-sm rounded-lg"
          onClick={() => setAmount((amount || 0) + 100000)}
        >
          +10만
        </button>

        <button
          className="px-3 py-2 bg-gray-100 text-sm rounded-lg"
          onClick={() => setAmount((amount || 0) + 1000000)}
        >
          +100만
        </button>

        <button
          className="px-3 py-2 bg-gray-100 text-sm rounded-lg"
          onClick={() =>
            setAmount(fromAccount ? Number(fromAccount.balance) : 0)
          }
        >
          전액
        </button>
      </div>

      <NumberKeypad
        onDigit={(n) => {
          const prev = amount === "" ? "" : amount.toString();
          const newNumber = Number(prev + n);
          setAmount(newNumber);
        }}
        onDelete={() => {
          if (amount === "") {
            setAmount("");
            return;
          }

          const str = amount.toString().slice(0, -1);
          setAmount(str === "" ? "" : Number(str));
        }}
      />

      <CommonButton
        label="확인"
        size="lg"
        widthClassName="w-full"
        colorClassName={
          isOverBalance
            ? `bg-gray-300 text-white cursor-not-allowed`
            : `bg-blue-500 hover:bg-blue-600 text-white`
        }
        className="rounded-xl text-lg font-medium"
        disabled={isOverBalance}
        href="/auto-deposit/confirm"
      />

      <ConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => push("/main", "back")}
        title="취소하시겠습니까?"
        description="작성 중인 내용은 저장되지 않습니다."
        confirmLabel="확인"
      />
    </div>
  );
}
