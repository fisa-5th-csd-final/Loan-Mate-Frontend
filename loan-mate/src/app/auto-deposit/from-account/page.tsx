"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNavigation } from "@/components/navigation/NavigationContext";
import { useNavigation as usePageTransition } from "@/context/NavigationContext";
import { apiClient } from "@/lib/api";
import { useSelectFromAccount } from "@/lib/api/auto-deposit/useSelectAccount";
import type { AccountDetail } from "@/lib/api/auto-deposit/types";
import ConfirmModal from "@/components/ui/ConfirmModal";

// --------------------
// Account Card Component
// --------------------
function AccountCard({
  account,
  onClick,
}: {
  account: AccountDetail;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white p-4 rounded-xl flex gap-4 active:scale-[0.98] transition"
    >
      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
        <img src="/logo/woori.svg" alt="woori" className="h-12" />
      </div>

      <div className="flex flex-col text-left">
        <div className="font-semibold">{account.bankCode} 통장</div>
        <div className="text-sm text-gray-500">{account.accountNumber}</div>
        <div className="text-sm font-medium mt-1">
          잔액 {Number(account.balance).toLocaleString()}원
        </div>

        <span className="text-red-500 text-xs border border-red-300 px-2 py-0.5 rounded-full w-fit mt-1">
          한도제한
        </span>
      </div>
    </button>
  );
}

// --------------------
// Content: Suspense 내부에서 실행될 부분
// --------------------
type AccountListResponse = AccountDetail[];

function PrepaidContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { setTitle, setShowBack, setRight } = useNavigation();
  const { push } = usePageTransition();

  const mode = params.get("mode");
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // State for modal
  const { select: selectFromAccount } = useSelectFromAccount();

  useEffect(() => {
    setTitle("계좌 선택하기");
    setShowBack(true);
    setRight(
      <button
        className="text-blue-600 text-sm"
        onClick={() => setIsCancelModalOpen(true)} // Open modal on click
      >
        취소
      </button>
    );
  }, [mode, setTitle, setShowBack, setRight]); // Removed router from dependency array as it's not directly used in setRight's JSX

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const res = await apiClient.get<AccountListResponse>("/api/accounts");

        if (!res || !Array.isArray(res)) {
          setAccounts([]);
          return;
        }

        setAccounts(res);
      } catch (error) {
        console.error("계좌 조회 실패:", error);
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAccounts();
  }, []);

  return (
    <div className="px-5 pt-4 bg-white">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mt-2">01 / 07</div>
      </div>

      <div className="text-xl font-semibold mb-6">어디에서 이체하시겠어요?</div>

      <div className="flex flex-col gap-3">
        {accounts.map((acc) => (
          <AccountCard
            key={acc.accountId}
            account={acc}
            onClick={() => {
              selectFromAccount(acc);
              router.push(
                `/auto-deposit/to-account?mode=${mode}&accountId=${acc.accountId}`
              );
            }}
          />
        ))}
      </div>

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

// --------------------
// 페이지 컴포넌트
// --------------------
export default function PrepaidPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrepaidContent />
    </Suspense>
  );
}
