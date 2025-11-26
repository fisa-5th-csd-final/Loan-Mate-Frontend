"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/search/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import InstitutionList from "@/components/institution/InstitutionList";
import BottomCTA from "@/components/BottomCTA";
import { getFlag, setFlag } from "@/lib/db/userFlags";
import { useRouter } from "next/navigation";

type Institution = {
  logo: string;
  name: string;
  connected?: boolean;
  checked?: boolean;
};

export default function ConnectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState<Institution[]>([
    { logo: "/logo/kb.jpg", name: "국민은행" },
    { logo: "/logo/ibk.svg", name: "IBK기업은행" },
    { logo: "/logo/sh.png", name: "신한은행", connected: true },
    { logo: "/logo/hn.png", name: "하나은행" },
  ]);

  useEffect(() => {
    async function check() {
      const connected = await getFlag("asset_connected");

      // 이미 연결한 적 있음 → 홈으로 이동
      if (connected) {
        router.replace("/");
        return;
      }

      // 처음 도달 → UI 보여주기
      setLoading(false);
    }

    check();
  }, [router]);

  const handleConnect = async () => {
    // 홈으로 이동
    router.push("/connect/consent");
  };

  const toggleItem = (index: number) => {
    setItems(prev =>
      prev.map((item, idx) =>
        idx === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleAll = () => {
    const allChecked = items.every(item => item.checked);
    setItems(prev => prev.map(item => ({ ...item, checked: !allChecked })));
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h2 className="text-[18px] font-semibold mt-7">
        연결할 기관을 선택해 주세요
      </h2>

      <SearchBar />

      <CategoryTabs
        tabs={["추천", "은행", "카드", "증권", "페이"]}
        active={0}
      />

      <div className="h-6" />

      <InstitutionList
        title="추천"
        items={items}
        onToggle={toggleItem}
        onToggleAll={toggleAll}
      />

      <BottomCTA
        count={items.filter(i => i.checked).length}
        label="기관 연결하기"
        onClick={handleConnect}
      />
    </div>
  );
}
