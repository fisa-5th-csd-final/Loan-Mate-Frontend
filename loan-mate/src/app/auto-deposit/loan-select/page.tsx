"use client";
export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import InstitutionSearchBar from "@/components/ui/search/SearchBar";
import InstitutionList from "@/components/institution/InstitutionList";
import PageWithCTA from "@/components/expenditure/PageWithCTA";
import { useNavigation } from "@/components/ui/navigation/NavigationContext";
import CategoryTabs from "@/components/ui/tab/CategoryTabs";
import { useEffect, useState, Suspense } from "react";
import { apiClient } from "@/lib/api/client";
import { useLoanStore } from "@/stores/useLoanStore";
import { useToast } from "@/context/ToastContext";
import { getCyclicBankIcon } from "@/consts/loan";

function ApplyAutoDepositContent() {
  const params = useSearchParams();
  const mode = params.get("mode");
  const { setTitle } = useNavigation();
  const router = useRouter();
  const { setPrepaidLoan } = useLoanStore();
  const { showToast } = useToast();

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

    remainPrincipal?: number;
    monthlyRepayment?: number;
    interestPayment?: number;
    loanId?: number;
  };

  const [items, setItems] = useState<LoanItem[]>([]);

  // 제목
  useEffect(() => {
    if (mode === "deposit") setTitle("자동예치 신청하기");
    else if (mode === "prepaid") setTitle("선납하기");
    else if (mode === "repay")
      setTitle("상환하기"); // 상환금 납부하기
    else setTitle("신청하기");
  }, [mode, setTitle]);

  // 데이터 불러오기
  useEffect(() => {
    async function fetchItems() {
      try {
        let res;

        // Helper to safe extract loanLedgerId
        const getLedgerId = (id: any) =>
          typeof id === "object" && id !== null ? id.value : id;

        // deposit 자동예치하기 모드
        if (mode === "deposit") {
          res = await apiClient.get<{
            data: {
              loanLedgerId: any; // Flexible type
              loanName: string;
              accountBalance: number;
              autoDepositEnabled: boolean;
            }[];
          }>("/api/loans/auto-deposit-summary");

          const mapped: LoanItem[] = res.data.map((item, index) => ({
            loanLedgerId: getLedgerId(item.loanLedgerId),
            logo: getCyclicBankIcon(index),
            name: item.loanName,
            connected: item.autoDepositEnabled,
            checked: false,
          }));

          setItems(mapped);
          return;
        }

        // prepaid 선납하기 모드
        if (mode === "prepaid") {
          res = await apiClient.get<{
            data: {
              loanLedgerId: number;
              balance: number;
              loanName: string;
              benefit: number;
              mustPaidAmount: number;
              accountNumber: string;
            }[];
          }>("/api/loans/prepayment-infos");

          const mapped: LoanItem[] = res.data.map((item, index) => ({
            loanLedgerId: item.loanLedgerId,
            logo: getCyclicBankIcon(index),
            name: item.loanName,
            connected: false,
            checked: false,
            benefit: item.benefit,
            mustPaidAmount: item.mustPaidAmount,
            balance: item.balance,
            accountNumber: item.accountNumber,
          }));

          setItems(mapped);
          return;
        }

        // repay 상환금 납부하기 모드
        if (mode === "repay") {
          const repayRes = await apiClient.get<{
            data: {
              loanId: number;
              loanName: string;
              monthlyRepayment: number;
              interestPayment: number;
              accountNumber: string;
              loanLedgerId: any; // Flexible type
            }[];
          }>("/api/loans/ledgers/details");

          const balanceRes = await apiClient.get<{
            data: {
              loanLedgerId: any; // Flexible type
              loanName: string;
              accountBalance: number;
              autoDepositEnabled: boolean;
            }[];
          }>("/api/loans/auto-deposit-summary");

          const mapped: LoanItem[] = repayRes.data.map((item, index) => {
            const itemId = getLedgerId(item.loanLedgerId);
            const balanceItem = balanceRes.data.find(
              (b) => getLedgerId(b.loanLedgerId) === itemId
            );

            return {
              loanLedgerId: itemId,
              logo: getCyclicBankIcon(index),
              name: item.loanName,
              connected: false,
              checked: false,

              monthlyRepayment: item.monthlyRepayment,
              interestPayment: item.interestPayment,
              accountNumber: item.accountNumber,

              balance: balanceItem?.accountBalance ?? 0,
            };
          });

          setItems(mapped);
          return;
        }
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
    const selected = items.filter((i) => i.checked);

    // deposit 자동예치하기 모드
    if (mode === "deposit") {
      const allConnected = items.length > 0 && items.every((i) => i.connected);
      if (allConnected) {
        showToast("이미 모든 대출이 자동예치 처리 되었습니다.", "error");
        return;
      }

      if (selected.length === 0) {
        showToast("자동예치할 대출을 선택해주세요.", "error");
        return;
      }

      if (selected.length > 1) {
        showToast("자동예치할 대출을 하나만 선택해주세요.", "error");
        return;
      }

      const loan = selected[0];

      setPrepaidLoan({
        mode: "deposit",
        loanLedgerId: loan.loanLedgerId,
        loanName: loan.name,
        accountNumber: "",
        mustPaidAmount: 0,
        balance: 0,
      });

      router.push("/auto-deposit/from-account");
      return;
    }

    const loan = selected[0];

    // prepaid 선납하기 모드
    if (mode === "prepaid") {
      if (selected.length === 0) {
        showToast("상환할 대출을 선택해주세요.", "error");
        return;
      }

      if (selected.length > 1) {
        showToast("상환할 대출을 하나만 선택해주세요.", "error");
        return;
      }

      setPrepaidLoan({
        mode: "prepaid",
        loanLedgerId: loan.loanLedgerId,
        loanName: loan.name,
        mustPaidAmount: loan.mustPaidAmount || 0,
        balance: loan.balance || 0,
        accountNumber: loan.accountNumber || "",
      });

      router.push("/auto-deposit/transfer?mode=prepaid");
      return;
    }

    // repyay 상환금 납부하기 모드
    if (mode === "repay") {
      if (selected.length === 0) {
        showToast("상환할 대출을 선택해주세요.", "error");
        return;
      }

      if (selected.length > 1) {
        showToast("상환할 대출을 하나만 선택해주세요.", "error");
        return;
      }

      const monthlyAmount =
        (loan.monthlyRepayment ?? 0) + (loan.interestPayment ?? 0);

      setPrepaidLoan({
        mode: "repay",
        loanLedgerId: loan.loanLedgerId,
        loanName: loan.name,
        mustPaidAmount: monthlyAmount || 0,
        balance: loan.balance || 10000000,
        accountNumber: loan.accountNumber || "",
      });

      router.push("/auto-deposit/transfer?mode=repay");
      return;
    }
  }

  // async function updateAutoDeposit(loanLedgerId: number, enabled: boolean) {
  //   try {
  //     return await apiClient.patch(
  //       `/api/loans/ledgers/${loanLedgerId}/auto-deposit`,
  //       {
  //         autoDepositEnabled: enabled,
  //       }
  //     );
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  const buttonLabel =
    mode === "deposit" ? "다음" : mode === "repay" ? "상환하기" : "선납하기";

  const submitDisabled =
    mode === "deposit"
      ? items.filter((i) => !i.connected && i.checked).length === 0
      : items.filter((i) => i.checked).length === 0;

  return (
    <PageWithCTA ctaLabel={buttonLabel} onClick={handleSubmit}>
      <div className="space-y-6 pt-4">
        <h2 className="text-lg font-semibold">
          {mode === "deposit"
            ? "자동 예치할 대출을 선택해 주세요"
            : mode === "repay"
              ? "상환할 대출을 선택해 주세요"
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
      </div>
    </PageWithCTA>
  );
}

export default function ApplyAutoDepositPage() {
  return (
    <Suspense>
      <ApplyAutoDepositContent />
    </Suspense>
  );
}
