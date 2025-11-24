"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import InstitutionList from "@/components/InstitutionList";
import BottomCTA from "@/components/BottomCTA";


export default function ConnectPage() {
  type Institution = {
  logo: string;
  name: string;
  connected?: boolean;
  checked?: boolean;
};

const [items, setItems] = useState<Institution[]>([
  { logo: "/logo/kb.jpg", name: "국민은행" },
  { logo: "/logo/ibk.svg", name: "IBK기업은행" },
  { logo: "/logo/sh.png", name: "신한은행", connected: true },
  { logo: "/logo/hn.png", name: "하나은행"},
]);


  const toggleItem = (index: number) => {
    setItems(prev =>
      prev.map((item, idx) =>
        idx === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // 전체 선택
  const toggleAll = () => {
    const allChecked = items.every(item => item.checked);
    setItems(prev => prev.map(item => ({ ...item, checked: !allChecked })));
  };

  return (
    <div>
      {/* 타이틀 */}
      <h2 className="text-[18px] font-semibold mt-7">
        연결할 기관을 선택해 주세요
      </h2>

      {/* 검색창 */}
      <SearchBar />

      {/* 탭 */}
      <CategoryTabs
        tabs={["추천", "은행", "카드", "증권", "페이"]}
        active={0}
      />

      <div className="h-6" />

      {/* 리스트 */}
      <InstitutionList
        title="추천"
        items={items}
        onToggle={toggleItem}
        onToggleAll={toggleAll}
      />
      

      {/* 고정 CTA */}
      <BottomCTA
        count={items.filter(i => i.checked).length}
        label="기관 연결하기"
      />
    </div>
  );
}
