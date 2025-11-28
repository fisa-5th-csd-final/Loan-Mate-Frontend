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

    type LoanItem = { logo: string; name: string; connected: boolean, checked: boolean };
  const [items, setItems] = useState<LoanItem[]>([]);

  // 화면 상단 제목 설정
  useEffect(() => {
    if (mode === "deposit") setTitle("자동예치 신청하기");
    else if (mode === "prepaid") setTitle("선납하기");
    else setTitle("신청하기");
  }, [mode, setTitle]);

  // API 호출하여 목록 불러오기
  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await apiClient.get<{
          data: {
            loanName: string;
            accountBalance: number;
            autoDepositEnabled: boolean;
          }[];
        }>("/api/loans/auto-deposit-summary");

        if (!res) {
          console.warn("응답 없음");
          return;   // 여기서 종료되므로 이후 res 는 무조건 정의됨
        }
        const mapped = Array.isArray(res.data)
          ? res.data.map((item) => ({
              logo: getBankLogo(item.loanName),
              name: item.loanName,
              connected: item.autoDepositEnabled,
              checked: false
            }))
          : [];

        setItems(mapped);
      } catch (err) {
        console.error("API 호출 오류:", err);
        setItems([]);
      }
    }

    fetchItems();
  }, []);

  // 체크
  function handleToggle(idx: number) {
  setItems(prev =>
    prev.map((item, i) =>
      i === idx ? { ...item, checked: !item.checked } : item
    )
  );
}

// 전체 선택/해제
function handleToggleAll() {
  setItems((prev) => {
    const allChecked = prev.every((item) => item.checked); // 모두 체크되어 있는지 확인
    return prev.map((item) => ({ ...item, checked: !allChecked }));
  });
}

async function handleSubmit() {
  if (mode === "deposit") {
     router.push("/auto-deposit");
     // Todo: 자동 예치 수정 api 추가해야함 

  }
  else if (mode === "prepaid") {
    router.push(`/auto-deposit/from-account?mode=${mode}`);
  }
}

  const buttonLabel =
    mode === "deposit" ? "자동 예치 등록하기" : "선납하기";

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
      <InstitutionList title="은행 목록" items={items} onToggle={handleToggle} onToggleAll={handleToggleAll}/>

      <CommonButton
        label={buttonLabel}
        size="lg"
        widthClassName="w-full"
        onClick={handleSubmit}
      />
    </div>
  );
}

// 로고는 임의로 매핑
function getBankLogo(name: string) {
  if (name.includes("1")) return "/logo/kookmin.svg";
  if (name.includes("2")) return "/logo/hana.svg";
  if (name.includes("테스트")) return "/logo/shinhan.svg";
  return "/logo/default.svg";
}

export default function ApplyAutoDepositPage() {
  return (
    <Suspense>
      <ApplyAutoDepositContent />
    </Suspense>
  );
}
