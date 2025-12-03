"use client";
export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import InstitutionSearchBar from "@/components/search/SearchBar";
import InstitutionList from "@/components/institution/InstitutionList";
import CommonButton from "@/components/button/CommonButton";
import { useNavigation } from "@/components/navigation/NavigationContext";
import CategoryTabs from "@/components/CategoryTabs";
import { useEffect, useState, Suspense } from "react";
import { apiClient } from "@/lib/api/client";
import { useLoanStore } from "@/stores/useLoanStore";

function ApplyAutoDepositContent() {
  const params = useSearchParams();
  const mode = params.get("mode");
  const { setTitle } = useNavigation();
  const router = useRouter();
  const { setPrepaidLoan } = useLoanStore();

  const tabs = ["추천", "신용", "담보", "부동산"];
  const [activeTab, setActiveTab] = useState(0);

  type LoanItem = {
    loanLedgerId: number;
    logo: string;
    name: string;
    connected: boolean;
    checked: boolean;

    benefit?: number;
    mustPaidAmount?: number;
    balance?: number;
    accountNumber?: string; // 계좌번호 추가
  };

  const [items, setItems] = useState<LoanItem[]>([]);

  /* --------------------- 제목 설정 --------------------- */
  useEffect(() => {
    if (mode === "deposit") setTitle("자동예치 신청하기");
    else if (mode === "prepaid") setTitle("선납하기");
    else setTitle("신청하기");
  }, [mode, setTitle]);

  // 데이터 불러오기 
  useEffect(() => {
    async function fetchItems() {
      try {
        let res;

        if (mode === "deposit") {
          res = await apiClient.get<{
            data: {
              loanLedgerId: { value: number };
              loanName: string;
              accountBalance: number;
              autoDepositEnabled: boolean;
            }[];
          }>("/api/loans/auto-deposit-summary");
        } else if (mode === "prepaid") {
          res = await apiClient.get<{
            data: {
              loanLedgerId: number;
              balance: number;
              loanName: string;
              benefit: number;
              mustPaidAmount: number;
              accountNumber: string; // 계좌번호 추가 
            }[];
          }>("/api/loans/prepayment-infos");
        }

        if (!res || !Array.isArray(res.data)) {
          console.warn("응답 없음 또는 배열 아님");
          return;
        }

        const mapped = res.data.map((item: any) => {
          const isDeposit = mode === "deposit";

          return {
            loanLedgerId: isDeposit ? item.loanLedgerId.value : item.loanLedgerId,

            logo: getBankLogo(item.loanName),

            name: item.loanName,

            connected: isDeposit ? item.autoDepositEnabled : false,

            checked: false,

            benefit: !isDeposit ? item.benefit : undefined,
            mustPaidAmount: !isDeposit ? item.mustPaidAmount : undefined,
            balance: !isDeposit ? item.balance : undefined,
            accountNumber: !isDeposit ? item.accountNumber : undefined
          };
        });

        setItems(mapped);
      } catch (err) {
        console.error("API 호출 오류:", err);
        setItems([]);
      }
    }

    fetchItems();
  }, [mode]);

  // 체크 처리 
  function handleToggle(idx: number) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === idx && !(mode === "deposit" && item.connected)
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  }

  function handleToggleAll() {
    setItems((prev) => {
      const availableItems =
        mode === "deposit" ? prev.filter((i) => !i.connected) : prev;

      const allChecked =
        availableItems.length > 0 &&
        availableItems.every((item) => item.checked);

      return prev.map((item) =>
        mode === "deposit" && item.connected
          ? item
          : { ...item, checked: !allChecked }
      );
    });
  }

  // 제출 
  async function handleSubmit() {
  if (mode === "deposit") {
    const selected = items.filter((i) => i.checked);

    if (selected.length === 0) {
      alert("자동 예치할 대출을 하나 이상 선택해주세요.");
      return;
    }

    try {
      await Promise.all(
        selected.map((item) => updateAutoDeposit(item.loanLedgerId, true))
      );

      alert("자동 예치 설정이 완료되었습니다!");
      router.push("/auto-deposit");
    } catch (error) {
      console.error("자동 예치 수정 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  } 
  else if (mode === "prepaid") {
    const selected = items.filter((i) => i.checked);

    if (selected.length > 1) {
      alert("선납은 한 개의 대출만 선택할 수 있습니다.");
      return;
    }

    const loan = selected[0]; // 단일 선택 안전 확보

    setPrepaidLoan({
      loanLedgerId: loan.loanLedgerId,
      loanName: loan.name,
      mustPaidAmount: loan.mustPaidAmount || 0,
      balance: loan.balance || 0,
      accountNumber: loan.accountNumber || "",
    });

    router.push("/auto-deposit/transfer");
  }
}


  async function updateAutoDeposit(loanLedgerId: number, enabled: boolean) {
    try {
      return await apiClient.patch(
        `/api/loans/ledgers/${loanLedgerId}/auto-deposit`,
        {
          autoDepositEnabled: enabled,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  const buttonLabel =
    mode === "deposit" ? "자동 예치 등록하기" : "선납하기";

  const submitDisabled =
    mode === "deposit"
      ? items.filter((i) => !i.connected && i.checked).length === 0
      : items.filter((i) => i.checked).length === 0;

  return (
    <div className="space-y-6 pt-4">
      <h2 className="text-lg font-semibold">
        {mode === "deposit"
          ? "자동 예치할 대출을 선택해 주세요"
          : "선납할 대출을 선택해 주세요"}
      </h2>

      <InstitutionSearchBar />

      <CategoryTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <InstitutionList
        title="은행 목록"
        items={items}
        onToggle={handleToggle}
        onToggleAll={handleToggleAll}
        disabledKey="connected"
      />

      <CommonButton
        label={buttonLabel}
        size="lg"
        widthClassName="w-full"
        onClick={handleSubmit}
        disabled={submitDisabled}
      />
    </div>
  );
}

function getBankLogo(name: string) {
  if (name.includes("1")) return "/logo/kookmin.svg";
  if (name.includes("2")) return "/logo/hana.svg";
  if (name.includes("테스트")) return "/logo/shinhan.svg";
  return "/logo/woori.svg";
}

export default function ApplyAutoDepositPage() {
  return (
    <Suspense>
      <ApplyAutoDepositContent />
    </Suspense>
  );
}
