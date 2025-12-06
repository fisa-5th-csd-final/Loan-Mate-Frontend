"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense, useEffect } from "react";
import NavigationBar from "@/components/ui/navigation/BackRouteNavigation";
import CommonButton from "@/components/ui/button/CommonButton";
import BottomSheet from "@/components/ui/modal/BottomSheet";
import NumberKeypad from "@/components/auto-deposit/NumberKeypad";
import { useLoanStore } from "@/stores/useLoanStore";
import { useRouter } from "next/navigation";
import { useTransferStore } from "@/stores/useTransferStore";
import { apiClient } from "@/lib/api";

function TransferFinalInner() {
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [insufficientBalance, setInsufficientBalance] = useState(false);

  const router = useRouter();

  // Store에서 Loan 데이터 가져오기
  const { prepaidLoan } = useLoanStore();
  const { inputAccount, setAccount } = useTransferStore();

  /* ---------------- 데이터 초기 적용 ---------------- */
  useEffect(() => {
    if (!prepaidLoan) return;

    if (prepaidLoan?.accountNumber) {
      setAccount(prepaidLoan.accountNumber);
    }

    if (prepaidLoan.balance < prepaidLoan.mustPaidAmount) {
      setInsufficientBalance(true);
    }
  }, [prepaidLoan]);

  /* ---------------- PIN 처리 ---------------- */
  const addDigit = (num: string) => {
    if (pin.length >= 6) return;
    setPin((prev) => prev + num);
  };

  const deleteDigit = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 6) handleTransfer();
  }, [pin]);

  /* ---------------- 이체 요청 ---------------- */
  const handleTransfer = async () => {
  if (!prepaidLoan) return;
  if (insufficientBalance) {
    alert("잔액이 부족합니다.");
    return;
  }

  alert("정말 이체하시겠습니까?");

  try {
    let response;

    // 선납하기 
    if (prepaidLoan.mode === "prepaid") {
      response = await apiClient.delete(
        `/api/loans/${prepaidLoan.loanLedgerId}`,
      );

    // 상환하기 
    } else if (prepaidLoan.mode === "repay") {
      response = await apiClient.post(
        `/api/loans/${prepaidLoan.loanLedgerId}/repayment`,
        { amount: prepaidLoan.mustPaidAmount }
      );
    }

    router.push("/auto-deposit/complete");

  } catch (err) {
    console.error(err);
    alert("이체 실패");
  }
};


  return (
    <div className="px-5 pt-4 pb-10 bg-white">
      {/* <NavigationBar title="" showBack={true} /> */}

      <div className="text-lg items-end font-medium mb-2">
        <span className="text-xl font-semibold">{prepaidLoan?.loanName}</span> 에
      </div>

      <div className="text-lg items-end font-medium mb-2">
        <span className="text-xl font-semibold">
          {(prepaidLoan?.mustPaidAmount ?? 0).toLocaleString()}원
        </span>{""}
        을 이체하시겠어요?
      </div>



      <div className="h-6" />

      {/* ---------------- Info Box : 무조건 보이게 ---------------- */}
      <div className="bg-gray-100 rounded-2xl p-4 text-sm mb-8">
        <div className="flex justify-between py-2">
          <span className="text-gray-600">수수료</span>
          <span className="text-gray-800">면제</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-600">선납할 대출명</span>
          <span className="text-gray-800">{prepaidLoan?.loanName}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-600">내 통장표기</span>
          <span className="text-gray-800">{inputAccount}</span>
        </div>
      </div>

    {/* 잔액 부족 경고 */}
      {insufficientBalance && (
        <div className="text-red-500 text-sm text-center mb-4">
          계좌 잔액이 부족합니다. 선납할 수 없습니다.
        </div>
      )}

      <div className="flex gap-3">
        {/* <CommonButton
          label="추가이체"
          size="lg"
          widthClassName="w-full"
          onClick={() => router.push("/auto-deposit")}
        /> */}

        <CommonButton
          label="이체"
          size="lg"
          widthClassName="w-full"
          disabled={insufficientBalance}
          className={insufficientBalance ? "opacity-40 cursor-not-allowed" : ""}
          onClick={() => {
            if (!insufficientBalance) setOpen(true);
          }}
        />
      </div>

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <NumberKeypad pinMode onDigit={addDigit} onDelete={deleteDigit} />
      </BottomSheet>
    </div>
  );
}

export default function TransferFinalPage() {
  return (
    <Suspense>
      <TransferFinalInner />
    </Suspense>
  );
}
