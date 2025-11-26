"use client";
export const dynamic = "force-dynamic";

import AutoDepositTable from "./_components/AutoDepositTable";
import CommonButton from "@/components/button/CommonButton";
import EarlyRepaySection from "./_components/EarlyRepaySection";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/navigation/BackRouteNavigation";

export default function AutoDepositPage() {
  const router = useRouter();

  return (
    <>
    <NavigationBar title="자동 예치 등록/선납하기" />
      <AutoDepositTable />
      <div className="mt-4">
            <CommonButton 
                label="자동 예치 등록하기"
                size="lg"
                widthClassName="w-full"
                onClick={() => router.push("/auto-deposit/apply?mode=deposit")}
              />
          </div>
      <EarlyRepaySection />
      <CommonButton
          label="선납하기"
          size="lg"
          widthClassName="w-full"
          className="mt-4"
          onClick={() => router.push("/auto-deposit/apply?mode=prepaid")}
        />
    </>
  );
}
