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

function ApplyAutoDepositContent() {
  const params = useSearchParams();
  const mode = params.get("mode");
  const { setTitle } = useNavigation();
  const router = useRouter();

  const tabs = ["추천", "신용", "담보", "부동산"];
  const [activeTab, setActiveTab] = useState(0);

  type LoanItem = { 
    loanLedgerId: number, 
    logo: string; 
    name: string; 
    connected: boolean, 
    checked: boolean 
  
    benefit?: number;
    mustPaidAmount?: number;};

  const [items, setItems] = useState<LoanItem[]>([]);

  // 화면 상단 제목 설정
  useEffect(() => {
    if (mode === "deposit") setTitle("자동예치 신청하기");
    else if (mode === "prepaid") setTitle("선납하기");
    else setTitle("신청하기");
  }, [mode, setTitle]);

  // API 호출하여 목록 불러오기
  // API 호출하여 목록 불러오기
useEffect(() => {
  async function fetchItems() {
    try {
      let res;

      if (mode === "deposit") {
        // 기존 API
        res = await apiClient.get<{
          data: {
            loanLedgerId: { value: number };
            loanName: string;
            accountBalance: number;
            autoDepositEnabled: boolean;
          }[];
        }>("/api/loans/auto-deposit-summary");
      } 
      else if (mode === "prepaid") {
        // 새 API
        res = await apiClient.get<{
          data: {
            loanName: string;
            benefit: number;
            mustPaidAmount: number;
          }[];
        }>("/api/loans/prepayment-infos");
      }

      if (!res || !Array.isArray(res.data)) {
        console.warn("응답 없음 또는 배열 아님");
        return;
      }

      const mapped = res.data.map((item: any, index: number) => {
  
  const isDeposit = mode === "deposit";

  return {
    loanLedgerId: isDeposit 
      ? item.loanLedgerId.value 
      : index,

    logo: getBankLogo(item.loanName),

    name: item.loanName,

    connected: isDeposit 
      ? item.autoDepositEnabled 
      : false,

    checked: false,

    // deposit에는 없음 → undefined 허용
    benefit: !isDeposit ? item.benefit : undefined,

    mustPaidAmount: !isDeposit ? item.mustPaidAmount : undefined
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

  // 체크
  function handleToggle(idx: number) {
  setItems(prev =>
    prev.map((item, i) =>
      i === idx && !(mode === "deposit" && item.connected)
        ? { ...item, checked: !item.checked }
        : item
    )
  );
}

// 전체 선택/해제
function handleToggleAll() {
  setItems((prev) => {
    const availableItems =
      mode === "deposit"
        ? prev.filter(i => !i.connected)
        : prev;

    const allChecked = availableItems.length > 0 && availableItems.every(item => item.checked);

    return prev.map(item =>
      mode === "deposit" && item.connected
        ? item
        : { ...item, checked: !allChecked }
    );

  });
}

async function handleSubmit() {
  if (mode === "deposit") {
    const selected = items.filter((i) => i.checked);

    if (selected.length === 0) {
      alert("자동 예치할 대출을 하나 이상 선택해주세요.");
      return;
    }

    try {
      await Promise.all(
        selected.map((item) =>
          updateAutoDeposit(item.loanLedgerId, true)
        )
      );

      alert("자동 예치 설정이 완료되었습니다!");

      router.push("/auto-deposit");

    } catch (error) {
      console.error("자동 예치 수정 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }

  } else if (mode === "prepaid") {
    const selected = items.filter(i => i.checked);
    const first = selected[0];  
    router.push(`/auto-deposit/from-account?mode=${mode}&logo=${first.logo}&loanName=${first.name}&mustPaidAmount=${first.mustPaidAmount}`);
    // router.push(`/auto-deposit/from-account?mode=${mode}`);
  }
}


async function updateAutoDeposit(loanLedgerId: number, enabled: boolean) {
  console.log("PATCH 요청:", loanLedgerId, enabled);

  try {
    const res = await apiClient.patch(`/api/loans/ledgers/${loanLedgerId}/auto-deposit`, {
      autoDepositEnabled: enabled
    });
    return res;

  } catch (err: any) {
    throw err;
  }
}

  const buttonLabel =
    mode === "deposit" ? "자동 예치 등록하기" : "선납하기";

  const submitDisabled =
  mode === "deposit"
    ? items.filter(i => !i.connected && i.checked).length === 0
    : items.filter(i => i.checked).length === 0;


  return (
    <div className="space-y-6 pt-4">
      <h2 className="text-lg font-semibold">
        {mode === "deposit"
          ? "자동 예치할 대출을 선택해 주세요"
          : "선납할 대출을 선택해 주세요"}
      </h2>

      <InstitutionSearchBar />

      <CategoryTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {/* API로 불러온 items 들어감 */}
      <InstitutionList 
        title="은행 목록" 
        items={items} 
        onToggle={handleToggle} 
        onToggleAll={handleToggleAll}
        disabledKey="connected"/>

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

// 로고는 임의로 매핑
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
