"use client";

import { useRouter } from "next/navigation";

export default function SelectBankPage() {
  const router = useRouter();

  const banks = [
    { name: "우리은행", logo: "/logo/woori.svg" },
    { name: "국민은행", logo: "/logo/kookmin.svg" },
    { name: "신한은행", logo: "/logo/shinhan.svg" },
    { name: "하나은행", logo: "/logo/hana.svg" },
    { name: "기업은행", logo: "/logo/ibk.svg" }
  ];

  return (
    <div className="px-5 pt-4 pb-10 block w-full">
      {/* Header ------------------------------------------------- */}
      <div className="relative flex items-center justify-center mb-6">
        <button
          onClick={() => router.back()}
          className="absolute left-0 text-2xl"
        >
          ←
        </button>

        <h1 className="text-lg font-semibold">금융회사를 선택해 주세요</h1>

        <button className="absolute right-0 text-xl" onClick={() => router.push("/")}>
          ✕
        </button>
      </div>

      {/* Tabs ------------------------------------------------- */}
      <div className="flex gap-4 mb-4 text-sm font-medium">
        <button className="text-black border-b-2 border-black pb-1">은행</button>
        <button className="text-gray-400">증권사</button>
      </div>

      {/* Search ------------------------------------------------- */}
      <input
        type="text"
        placeholder="은행명 검색"
        className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-6 outline-none"
      />

      {/* Bank Grid ------------------------------------------------- */}
        <div className="w-full grid grid-cols-3 gap-4 mt-6">
        {banks.map((bank) => (
            <button
            key={bank.name}
            className="flex flex-col items-center gap-2 bg-[#f5f7fa] rounded-xl p-4"
            onClick={() => router.push("/amount")}
            >
            <img src={bank.logo} className="w-10 h-10 object-contain" />
            <span className="text-sm text-center">{bank.name}</span>
            </button>
        ))}
        </div>

    </div>
  );
}
