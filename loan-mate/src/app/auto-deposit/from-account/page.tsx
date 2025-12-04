"use client";
export const dynamic = "force-dynamic";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import type { AccountDetail } from "@/lib/api/auto-deposit/types";
import CheckIcon from "@/components/ui/icon/CheckIcon";
import PageWithCTA from "@/components/expenditure/PageWithCTA";
import { apiClient } from "@/lib/api/client";
import { useToast } from "@/context/ToastContext";
import { useLoanStore } from "@/stores/useLoanStore";

// 은행별 아이콘 스타일 매핑
const bankStyle: Record<
  string,
  { bg: string }
> = {
  "우리은행": { bg: "bg-blue-100"},
  "신한은행": { bg: "bg-blue-300"},
  "국민은행": { bg: "bg-amber-100"},
};

// 은행별 로고 크기만 다르게 적용
const logoSizeMap: Record<string, string> = {
  "우리은행": "h-12 w-12",
  "신한은행": "h-9 w-9",
  "국민은행": "h-12 w-12",
};


function AccountCard({
  account,
  checked,
  onToggle,
}: {
  account: AccountDetail;
  checked: boolean;
  onToggle: () => void;
}) {
  const logoSize = logoSizeMap[account.bankCode] ?? "h-6 w-6";

  return (
    <button
      onClick={onToggle}
      className="
        w-full bg-white p-2 rounded-xl flex gap-4 items-center justify-between
      "
    >
      <div className="flex gap-4 items-center">
        
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center ${bankStyle[account.bankCode]?.bg}`}
        >
          <img
            src={account.bankLogo}
            alt={account.bankCode}
            className={`${logoSize} object-contain`}
          />
        </div>

        <div className="flex flex-col text-left">
          <div className="font-semibold">{account.bankCode} 통장</div>
          <div className="text-sm text-gray-500">{account.accountId}</div>
          <div className="text-sm font-medium mt-1">
            잔액 {Number(account.balance).toLocaleString()}원
          </div>
          <span className="text-red-500 text-xs border border-red-300 px-2 py-0.5 rounded-full w-fit mt-1">
            한도제한
          </span>
        </div>
      </div>

      <CheckIcon checked={checked} size={20} />
    </button>
  );
}



function FromAccountContent() {
  const router = useRouter();
  const { prepaidLoan } = useLoanStore();
  const { showToast } = useToast();

  // 목 데이터
  const [items, setItems] = useState<AccountDetail[]>([
  {
    bankLogo : "/logo/woori.svg",
    bankCode: "우리은행",
    accountId: "1002-123-456789",
    balance: 200000,
    checked: false,
    connected: false,
  },
  {
    bankLogo : "/logo/shinhan.svg",
    bankCode: "신한은행",
    accountId: "3333-02-987654",
    balance: 550000,
    checked: false,
    connected: false,
  },
  {
    bankLogo : "/logo/kookmin.svg",
    bankCode: "국민은행",
    accountId: "812702-04-466621",
    balance: 550000,
    checked: false,
    connected: false,
  },
]);


  // 체크 토글 함수
  function handleToggle(idx: number) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, checked: !item.checked } : item
      )
    );
  }

  // 자동예치 등록하기 API
  async function handleSubmit() {
    const selected = items.filter((i) => i.checked);

    if (selected.length === 0) {
      showToast("하나의 계좌를 선택해주세요.", "error");
      return;
    }
    if (selected.length > 1) {
      showToast("하나의 계좌만 선택할 수 있습니다.", "error");
      return;
    }

    try {
      await apiClient.patch(
        `/api/loans/ledgers/${prepaidLoan?.loanLedgerId}/auto-deposit`,
        { autoDepositEnabled: true }
      );

      showToast("자동 예치 등록이 완료되었습니다!", "success");
      router.push("/auto-deposit");
    } catch (err) {
      console.error(err);
      showToast("오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  }

   return (
    <PageWithCTA ctaLabel="자동예치 등록하기" onClick={handleSubmit}>
      <div className="px-5 pt-4 bg-white">
        <div className="text-xl font-semibold mb-6">어디에서 이체하시겠어요?</div>

        <div className="flex flex-col gap-3">
          {items.map((acc, idx) => (
            <AccountCard
              key={idx}
              account={acc}
              checked={acc.checked}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </PageWithCTA>
  );
}

export default function FromAccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FromAccountContent />
    </Suspense>
  );
}
