import InstitutionSearchBar from "@/components/search/SearchBar";
import CategoryTabs from "./components/CategoryTabs";
import InstitutionList from "@/components/institution/InstitutionList";
import CommonButton from "@/components/button/CommonButton";

export default function ApplyAutoDepositPage() {
  const mockItems = [
    { logo: "/logo/kookmin.svg", name: "국민은행", connected: true, checked: false },
    { logo: "/logo/hana.svg", name: "하나은행", connected: false, checked: false },
    { logo: "/logo/shinhan.svg", name: "신한은행", connected: true, checked: true },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">
        자동 예치할 대출을 선택해 주세요
      </h2>

      <InstitutionSearchBar />

      <CategoryTabs />

      <InstitutionList 
        title="은행 목록"
        items={mockItems}
      />

      <CommonButton
        label="자동 예치 등록하기"
        size="lg"
        widthClassName="w-full"
      />
    </div>
  );
}
