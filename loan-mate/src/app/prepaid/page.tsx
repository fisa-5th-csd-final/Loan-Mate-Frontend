"use client";

import { useRouter } from "next/navigation";

// --------------------
// Header Component
// --------------------
function PageHeader({ title, step }: { title: string; step: string }) {
  const router = useRouter();

  return (
    <div className="mb-6">
      <div className="relative flex items-center justify-center">
        <button onClick={() => router.back()} className="absolute left-0 text-2xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="text-sm text-gray-500 mt-2">{step}</div>
    </div>
  );
}

// --------------------
// Account Card Component
// --------------------
function AccountCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white p-4 rounded-xl flex gap-4 active:scale-[0.98] transition"
    >
      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
        <img src="/logo/woori.svg" alt="woori" className="h-12" />
      </div>

      <div className="flex flex-col text-left">
        <div className="font-semibold">WON 통장</div>
        <div className="text-sm text-gray-500">우리 1002-865-685398</div>
        <div className="text-sm font-medium mt-1">잔액 360,588원</div>

        <span className="text-red-500 text-xs border border-red-300 px-2 py-0.5 rounded-full w-fit mt-1">
          한도제한
        </span>
      </div>
    </button>
  );
}

// --------------------
// Main Page
// --------------------
export default function PrepaidPage() {
  const router = useRouter();

  const handleSelect = () => {
    router.push("/auto-deposit/amount");
  };

  return (
    <div className="px-5 pt-4">
      <PageHeader title="자동이체 등록" step="01 / 07" />

      <div className="text-xl font-semibold mb-6">어디에서 이체하시겠어요?</div>

      <AccountCard onClick={handleSelect} />
    </div>
  );
}
