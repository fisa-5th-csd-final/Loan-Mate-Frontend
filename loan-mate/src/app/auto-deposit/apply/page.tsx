"use client";

import { useSearchParams, useRouter } from "next/navigation";
import InstitutionSearchBar from "@/components/search/SearchBar";
import CategoryTabs from "./components/CategoryTabs";
import InstitutionList from "@/components/institution/InstitutionList";
import CommonButton from "@/components/button/CommonButton";
import { useNavigation } from "@/components/navigation/NavigationContext";
import { useEffect } from "react";

export default function ApplyAutoDepositPage() {
  const params = useSearchParams();
  const mode = params.get("mode");
  const { setTitle } = useNavigation();
  const router = useRouter();

   useEffect(() => {
    if (mode === "deposit") {
      setTitle("자동예치 신청하기");
    } else if (mode === "prepaid") {
      setTitle("선납하기");
    } else {
      setTitle("신청하기");
    }
  }, [mode, setTitle]);

  const buttonLabel =
    mode === "deposit" ? "자동 예치 등록하기" : "선납하기";

  const mockItems = [
    { logo: "/logo/kookmin.svg", name: "국민은행", connected: true, checked: false },
    { logo: "/logo/hana.svg", name: "하나은행", connected: false, checked: false },
    { logo: "/logo/shinhan.svg", name: "신한은행", connected: true, checked: true },
  ];

  return (
    <>
      <div className="space-y-6 pt-4">
        <h2 className="text-lg font-semibold">
          {mode === "deposit"
            ? "자동 예치할 대출을 선택해 주세요"
            : "선납할 대출을 선택해 주세요"}
        </h2>

        <InstitutionSearchBar />
        <CategoryTabs />

        <InstitutionList title="은행 목록" items={mockItems} />

        <CommonButton 
          label={buttonLabel}
          size="lg"
          widthClassName="w-full"
          onClick={() => router.push(`/auto-deposit/prepaid?mode=${mode}`)}

        />
      </div>
    </>
  );
}
