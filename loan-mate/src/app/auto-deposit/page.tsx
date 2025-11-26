"use client";

import AutoDepositTable from "./components/AutoDepositTable";
import CommonButton from "@/components/button/CommonButton";
import EarlyRepaySection from "./components/EarlyRepaySection";
import { useRouter } from "next/navigation";

export default function AutoDepositPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/apply");
  };

  return (
    <>
      <AutoDepositTable />
      <div className="mt-4">
            <CommonButton 
              label="자동 예치 등록하기"
              size="lg"
              widthClassName="w-full"
              onClick={handleClick}
            />
          </div>
      <EarlyRepaySection />
      <CommonButton
        label="선납하기"
        size="lg"
        widthClassName="w-full"
        className="mt-4"
        onClick={() => router.push("/prepaid")} 
      />
    </>
  );
}
