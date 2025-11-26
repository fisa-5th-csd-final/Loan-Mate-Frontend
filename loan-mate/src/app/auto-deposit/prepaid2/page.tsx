"use client";
export const dynamic = "force-dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TransferTabs from "@/components/TransferTabs";
import { useNavigation } from "@/components/navigation/NavigationContext";
import { ChevronDown } from "lucide-react";

export default function Prepaid2Page() {
  const router = useRouter();
  const params = useSearchParams();
  const mode = params.get("mode");
  const { setTitle } = useNavigation();

  useEffect(() => {
    if (mode === "deposit") {
      setTitle("자동예치 신청하기");
    } else if (mode === "prepaid") {
      setTitle("선납하기");
    } else {
      setTitle("신청하기");
    }
  }, [mode, setTitle]);

  // 은행 목록 토글 상태
  const [showBanks, setShowBanks] = useState(false);

  // 은행 선택 시
  const handleSelectBank = (bank: string) => {
    if (bank === "신한은행") {
      router.push("/auto-deposit/prepaid3");
    }
  };

  const [tab, setTab] = useState("recommended");

  const banks = [
    { name: "국민은행", logo: "/logo/kookmin.svg" },
    { name: "신한은행", logo: "/logo/shinhan.svg" },
    { name: "우리은행", logo: "/logo/woori.svg" },
    { name: "하나은행", logo: "/logo/hana.svg" },
  ];

  return (
    <div className="px-5 pt-4 bg-white"
         >

      {/* Header ------------------ */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 mt-2">02 / 07</div>
      </div>

      {/* Title ------------------ */}
      <div className="text-xl font-semibold mb-6">어디로 이체하시겠어요?</div>

      {/* 은행/기관 선택 버튼 ------------------ */}
      <button
        className="flex items-center gap-2 text-gray-700 mb-3"
        onClick={() => setShowBanks(!showBanks)}
      >
        <span className="text-lg">🏦</span>
        <span className="font-medium">은행/기관 선택</span>
        {/* 화살표 아이콘 라이브러리 사용*/}
          <ChevronDown size={16} className="text-gray-500" />
      </button>

      {/* 은행 목록 드롭다운 ------------------ */}
      {showBanks && (
        <div className="border border-gray-200 rounded-xl p-3 mb-4 bg-white shadow-sm">
          {banks.map((bank) => (
            <button
              key={bank.name}
              className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-gray-100"
              onClick={() => handleSelectBank(bank.name)}
            >
              <img src={bank.logo} alt={bank.name} className="w-6 h-6" />
              <span className="text-gray-700">{bank.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* 계좌번호 입력 ------------------ */}
      <div className="text-gray-500 mb-2">계좌번호 입력</div>
      <div className="border-b border-gray-200 mb-3"></div>

      {/* Tabs ------------------ */}
      <TransferTabs
        tabs={[
          { label: "추천", value: "recommended" },
          { label: "자주", value: "often" },
          { label: "내계좌", value: "mine" },
        ]}
        value={tab}
        onChange={setTab}
      />


      {/* 최근 입금계좌 ------------------ */}
      <div className="text-sm font-medium mb-4 mt-4">최근입금계좌</div>

      {/* Empty ------------------ */}
      <div className="flex flex-col items-center mt-16">
        <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-3xl text-gray-500">⋯</span>
        </div>
        <p className="text-gray-500 text-sm mt-4">최근 이체 내역이 없어요</p>
      </div>
    </div>
  );
}
