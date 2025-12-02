"use client";
export const dynamic = "force-dynamic";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CommonButton from "@/components/button/CommonButton";
import { ChevronDown } from "lucide-react";
import type { AccountDetail } from "@/lib/api/auto-deposit/types";
import { useSelectFromAccount } from "@/lib/api/auto-deposit/useSelectAccount";
import { useTransferStore } from "@/stores/useTransferStore";
import { formatCurrency } from "@/lib/util/NumberFormatter";
import { useNavigation } from "@/components/navigation/NavigationContext";
import { useNavigation as usePageTransition } from "@/context/NavigationContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

function ConfirmInner() {
  // const params = useSearchParams();
  const router = useRouter();
  const { setTitle, setShowBack, setRight } = useNavigation();
  const { push } = usePageTransition();

  const { get: getFromAccount } = useSelectFromAccount();
  const [fromAccount, setFromAccount] = useState<AccountDetail | null>(null);
  const { inputAccount, bankName, bankLogo, amount } = useTransferStore();

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
  }, [setTitle, setShowBack, setRight]);

  useEffect(() => {
    const selected = getFromAccount();
    setFromAccount(selected);
  }, []);

  return (
    <div className="px-5 pt-4 pb-10 bg-white">
      {/* Header */}
      {/* NavigationBar removed */}

      {/* From Account */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <img src="/logo/woori.svg" className="h-8" />
          </div>

          <div className="text-gray-900 font-medium flex items-center gap-1">
            {fromAccount
              ? `${fromAccount.bankCode} 계좌에서`
              : "출금 계좌 선택 안됨"}
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          {fromAccount ? `${fromAccount.accountNumber}` : "계좌번호 없음"}
        </div>
      </div>

      {/* To Account */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <img src={bankLogo} className="h-7" />
          </div>

          <div className="text-gray-900 font-medium flex items-center gap-1">
            박준상 님 계좌로
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          {bankName} {inputAccount}
        </div>
      </div>

      {/* Amount */}
      <div className="w-full mt-4 mb-4 text-6xl">
        <span className="inline-block text-xl font-semibold leading-tight">
          {formatCurrency(amount)}
        </span>
      </div>

      <div className="text-m text-gray-500 mb-8">
        {formatCurrency(amount)} · 출금가능금액{" "}
        {fromAccount ? formatCurrency(fromAccount.balance) : "0"}
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
        <ChevronDown size={14} className="ml-1" />
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
        onClick={() => router.push("/auto-deposit/transfer")}
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

export default function AutoDepositConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmInner />
    </Suspense>
  );
}
