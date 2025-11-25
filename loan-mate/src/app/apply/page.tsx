import InstitutionSearchBar from "./components/InstitutionSearchBar";
import CategoryTabs from "./components/CategoryTabs";
import InstitutionList from "./components/InstitutionList";
import CommonButton from "@/components/button/CommonButton";

export default function ApplyAutoDepositPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">
        자동 예치할 대출을 선택해 주세요
      </h2>

      <InstitutionSearchBar />

      <CategoryTabs />

      <InstitutionList />

      <CommonButton
        label="자동 예치 등록하기"
        size="lg"
        widthClassName="w-full"
      />
    </div>
  );
}
