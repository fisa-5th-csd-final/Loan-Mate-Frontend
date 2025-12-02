"use client";
export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import InstitutionSearchBar from "@/components/search/SearchBar";
import InstitutionList from "@/components/institution/InstitutionList";
import CommonButton from "@/components/button/CommonButton";
import { useNavigation } from "@/components/navigation/NavigationContext";
import { useNavigation as usePageTransition } from "@/context/NavigationContext";
import CategoryTabs from "@/components/CategoryTabs";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useEffect, useState, Suspense } from "react";
import { apiClient } from "@/lib/api/client";
import { useLoanStore } from "@/stores/loanStore";

function ApplyAutoDepositContent() {
  const params = useSearchParams();
  const mode = params.get("mode");
  const { setTitle, setShowBack, setRight } = useNavigation();
  const { push } = usePageTransition();
  const router = useRouter();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const setPrepaidLoan = useLoanStore((state) => state.setPrepaidLoan);

  const tabs = ["추천", "신용", "담보", "부동산"];
  const [activeTab, setActiveTab] = useState(0);

  type LoanItem = {
    loanLedgerId: number;
    logo: string;
    name: string;
    balance?: number;   // 추가됨
    connected: boolean;
    checked: boolean;
    mustPaidAmount?: number;
  };

  const [items, setItems] = useState<LoanItem[]>([]);

  // 화면 상단 설정
  useEffect(() => {
    if (mode === "deposit") setTitle("자동예치 등록하기");
    else if (mode === "prepaid") setTitle("선납하기");
    else setTitle("신청하기");

    setShowBack(true);
    setRight(
      <>
        <button
          className="text-blue-600 text-sm"
          onClick={() => setIsCancelModalOpen(true)}
        >
          취소
        </button>

        <ConfirmModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={() => push("/main", "back")}
          title="취소하시겠습니까?"
          description="작성 중인 내용은 저장되지 않습니다."
          confirmLabel="확인"
        />
      </>
    );
  }, []);

  // API 호출
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
              loanLedgerId: string;
              balance: number;
              loanName: string;
              mustPaidAmount: number;
            }[];
          }>("/api/loans/prepayment-infos");

        }

        if (!res || !res.data) {
          console.warn("응답 없음 또는 데이터 없음");
          return;
        }

        const mapped = res.data.map((item: any, index: number) => ({
          loanLedgerId: mode === "deposit" ? item.loanLedgerId.value : index,
          logo: getBankLogo(item.loanName),
          name: item.loanName,
          connected: mode === "deposit" ? item.autoDepositEnabled : false,
          checked: false,
          balance: item.balance,               
          mustPaidAmount: item.mustPaidAmount,
        }));

        setItems(mapped);
      } catch (err) {
        console.error("API 호출 오류:", err);
      }
    }

    fetchItems();
  }, [mode]);

  // 개별 체크
  function handleToggle(idx: number) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === idx && !(mode === "deposit" && item.connected)
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  }

  // 전체 체크
  function handleToggleAll() {
    setItems((prev) => {
      const available = mode === "deposit" ? prev.filter((i) => !i.connected) : prev;
      const allChecked = available.every((i) => i.checked);

      return prev.map((i) =>
        mode === "deposit" && i.connected ? i : { ...i, checked: !allChecked }
      );
    });
  }

  // 제출 처리
  async function handleSubmit() {
    if (mode === "prepaid") {
      const selected = items.find((i) => i.checked);
      if (!selected) return;

      setPrepaidLoan({
        loanLedgerId: selected.loanLedgerId,
        loanName: selected.name,
        balance: selected.balance!,
        mustPaidAmount: selected.mustPaidAmount!,
      });

      router.push("/auto-deposit/tranfer");
      return;
    }

    // deposit mode 처리 생략
  }

  return (
    <div className="space-y-6 pt-4">
      <h2 className="text-lg font-semibold">
        {mode === "deposit" ? "자동 예치할 대출을 선택해 주세요" : "선납할 대출을 선택해 주세요"}
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

      <CommonButton label="선납하기" size="lg" widthClassName="w-full" onClick={handleSubmit} />
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
