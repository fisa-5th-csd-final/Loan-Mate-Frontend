"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/navigation/BackRouteNavigation";
import CommonButton from "@/components/button/CommonButton";
import BottomSheet from "@/components/bottomSheet";
import NumberKeypad from "../_components/NumberKeypad";
import { useLoanStore } from "@/stores/loanStore";
import { useSelectFromAccount } from "@/lib/api/auto-deposit/useSelectAccount";
import { useNavigation } from "@/components/navigation/NavigationContext";
import { useNavigation as usePageTransition } from "@/context/NavigationContext";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { apiClient } from "@/lib/api/client";

function TransferFinalInner() {
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ⭐ loanStore 사용
  const prepaidLoan = useLoanStore((state) => state.prepaidLoan);

  if (!prepaidLoan) return <div>대출 정보를 찾을 수 없습니다.</div>;

  const { loanLedgerId, balance, mustPaidAmount, loanName } = prepaidLoan;

  const router = useRouter();
  const { setTitle, setShowBack, setRight } = useNavigation();
  const { push } = usePageTransition();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    setTitle("송금하기");
    setShowBack(true);
    setRight(
      <button className="text-blue-500 text-sm" onClick={() => setIsCancelModalOpen(true)}>
        취소
      </button>
    );
  }, []);

  const isDisabled = balance < mustPaidAmount;

  const addDigit = (num: string) => {
    if (pin.length >= 6) return;
    setPin((prev) => prev + num);
  };

  const deleteDigit = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 6) {
      handleLoanDelete();
    }
  }, [pin]);

  async function handleLoanDelete() {
    setLoading(true);

    try {
      await apiClient.delete(`/api/loans/${loanLedgerId}`);
      router.push("/auto-deposit/complete");
    } catch (err) {
      console.error(err);
      setError("대출 해지 실패. 다시 시도해주세요.");
      setPin("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-5 pt-4 pb-10 bg-white">

      <div className="text-xl font-semibold mb-2">
        <span className="text-blue-600">{mustPaidAmount.toLocaleString()}원</span> 선납
      </div>

      <div className="text-gray-500 text-sm mb-6">
        잔액: {balance.toLocaleString()}원
      </div>

      <CommonButton
        label={isDisabled ? "잔액 부족" : "선납하기"}
        size="lg"
        widthClassName="w-full"
        colorClassName={
          isDisabled ? "bg-gray-300 text-gray-500" : "bg-blue-600 text-white"
        }
        disabled={isDisabled}
        onClick={() => !isDisabled && setOpen(true)}
      />

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <NavigationBar
          title=""
          showBack={false}
          right={
            <button className="text-black text-xl" onClick={() => setOpen(false)}>
              ✕
            </button>
          }
        />

        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">계좌 비밀번호</h2>
        </div>

        <NumberKeypad pinMode={true} onDigit={addDigit} onDelete={deleteDigit} />
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
