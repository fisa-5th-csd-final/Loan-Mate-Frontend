"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import AutoDepositTable from "@/components/auto-deposit/AutoDepositTable";
import CommonButton from "@/components/ui/button/CommonButton";
import EarlyRepaySection from "@/components/auto-deposit/EarlyRepaySection";
import { useNavigation } from "@/components/ui/navigation/NavigationContext";

export default function AutoDepositPage() {
  const { setTitle, setShowBack, setRight } = useNavigation();

  useEffect(() => {
    setTitle("자동예치 등록/선납하기");
    setShowBack(true);
    setRight(null);
  }, [setTitle, setShowBack, setRight]);

  return (
    <>
      <AutoDepositTable />
      <div className="mt-4">
        <CommonButton
          label="자동예치 등록하기"
          size="lg"
          widthClassName="w-full"
          href="/auto-deposit/loan-select?mode=deposit"
        />

      </div>
      <EarlyRepaySection />
      <CommonButton
        label="선납하기"
        size="lg"
        widthClassName="w-full"
        className="mt-4"
        href="/auto-deposit/loan-select?mode=prepaid"
      />
    </>
  );
}
