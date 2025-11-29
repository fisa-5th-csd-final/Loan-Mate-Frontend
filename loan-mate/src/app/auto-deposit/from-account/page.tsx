"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNavigation } from "@/components/navigation/NavigationContext";
import { apiClient } from "@/lib/api";

// --------------------
// Account Card Component
// --------------------
function AccountCard({ account, onClick }: { account: AccountDetail; onClick: () => void }) {
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
        <div className="text-sm font-medium mt-1">잔액 {Number(account.balance).toLocaleString()}원</div>

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
interface AccountDetail {
  accountId: number;
  accountNumber: string;
  bankCode: string;
  balance: number;
  createdAt: string;
  isForIncome: boolean;
}

type AccountListResponse = AccountDetail[];


function PrepaidContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { setTitle } = useNavigation();

  const mode = params.get("mode");
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mode === "deposit") setTitle("자동예치 신청하기");
    else if (mode === "prepaid") setTitle("선납하기");
    else setTitle("신청하기");
  }, [mode, setTitle]);

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

      <div className="text-xl font-semibold mb-6">
        어디에서 이체하시겠어요?
      </div>

      <div className="flex flex-col gap-3">
        {accounts.map((acc) => (
          <AccountCard
            key={acc.accountId}
            account={acc}
            onClick={() =>
              router.push(
                `/auto-deposit/to-account?mode=${mode}&accountId=${acc.accountId}`
              )
            }
          />
        ))}
      </div>
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
