"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavigationBar from "@/components/navigation/BackRouteNavigation";
import CommonButton from "@/components/button/CommonButton";
import BottomSheet from "@/components/bottomSheet";
import NumberKeypad from "../_components/NumberKeypad";
import { useTransferStore } from "@/stores/useTransferStore";
import { useSelectFromAccount } from "@/lib/api/auto-deposit/useSelectAccount";
import { transferMoney } from "@/lib/api/auto-deposit/transferApi";
import { useNavigation } from "@/components/navigation/NavigationContext";
import { useNavigation as usePageTransition } from "@/context/NavigationContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

function TransferFinalInner() {
  const [open, setOpen] = useState(false);
  const { bankName, bankLogo, bankCode, inputAccount, amount, setAmount } = useTransferStore();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { setTitle, setShowBack, setRight } = useNavigation();
  const { push } = usePageTransition();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    setTitle("송금하기");
    setShowBack(true);
    setRight(
      <button
        className="text-blue-500 text-sm"
        onClick={() => setIsCancelModalOpen(true)}
      >
        취소
      </button>
    );
  }, [setTitle, setShowBack, setRight]);

  const { get: getFromAccount } = useSelectFromAccount();
  const fromAccount = getFromAccount();

  const addDigit = (num: string) => {
    if (pin.length >= 6) return;
    setPin((prev) => prev + num);
  };

  const deleteDigit = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 6) {
      handleTransfer();
    }
  }, [pin]);

  async function handleTransfer() {
    if (!fromAccount) {
      setError("출금 계좌 정보가 없습니다.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await transferMoney({
        fromAccountNumber: fromAccount.accountNumber,
        toAccountNumber: inputAccount,
        toBankCode: bankCode,
        amount: Number(amount),
      });

      router.push("/auto-deposit/complete");
    } catch (err) {
      console.error("이체 실패", err);
      setError("이체에 실패했습니다. 다시 시도해주세요.");
      setPin(""); // 비밀번호 초기화
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-5 pt-4 pb-10 bg-white">
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
          className="flex-1 py-4 rounded-xl font-medium"
          colorClassName="bg-[#EEF5FF] !text-[#3B82F6] hover:bg-[#DCEBFF]"
          onClick={() => router.push("/auto-deposit")}
        />

        <CommonButton
          label="이체"
          size="lg"
          widthClassName="w-full"
          className="flex-1 py-4 rounded-xl font-medium"
          colorClassName="bg-[#4F8BFF] hover:bg-[#3D7CFF] text-white"
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

export default function TransferFinalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransferFinalInner />
    </Suspense>
  );
}
