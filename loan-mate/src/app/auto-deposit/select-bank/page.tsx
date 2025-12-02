"use client";
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import NavigationBar from "@/components/navigation/BackRouteNavigation";
import TransferTabs from "@/components/TransferTabs";
import { useState } from "react";
import { useTransferStore } from "@/stores/useTransferStore";

export default function SelectBankPage() {
  const router = useRouter();

  const [tab, setTab] = useState("recommended");
  const { setBank } = useTransferStore();

  const banks = [
    { name: "우리은행", logo: "/logo/woori.svg", code: "020" },
    { name: "국민은행", logo: "/logo/kookmin.svg", code: "004" },
    { name: "신한은행", logo: "/logo/shinhan.svg", code: "088" },
    { name: "하나은행", logo: "/logo/hana.svg", code: "081" },
    { name: "기업은행", logo: "/logo/ibk.svg", code: "003" }
  ];

  return (
    <div className="px-5 pt-4 pb-10 block w-full bg-white">
      {/* Header ------------------------------------------------- */}
      <div className="relative px-5 pt-4"> 
        <NavigationBar
          title=""
          showBack={true}
          right={<button className="text-black text-sm">✕</button>}
        />
  </div>
  <h1 className="text-xl font-bold mt-6 mb-4">금융회사를 선택해주세요</h1>
  <TransferTabs
        tabs={[
          { label: "은행", value: "recommended" },
          { label: "증권사", value: "often" }
        ]}
        value={tab}
        onChange={setTab}
      />

      {/* Bank Grid ------------------------------------------------- */}
        <div className="w-full grid grid-cols-3 gap-4 mt-6">
        {banks.map((bank) => (
            <button
            key={bank.name}
            className="flex flex-col items-center gap-2 bg-[#f5f7fa] rounded-xl p-4"
            onClick={() => {
              setBank(bank.name, bank.logo, bank.code);
              router.push("/auto-deposit/input-account-number");
              }
            }
            >
            <img src={bank.logo} className="w-10 h-10 object-contain" />
            <span className="text-sm text-center">{bank.name}</span>
            </button>
        ))}
        </div>

    </div>
  );
}
