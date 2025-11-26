"use client";

import { useRouter } from "next/navigation";
import QuickActionButton from "@/components/button/QuickActionButton"; // 버튼 컴포넌트 경로에 맞게 수정해주세요
import SectionHeading from "@/components/SectionHeading";
import { ArrowLeftRight, PiggyBank } from "lucide-react";

// 버튼 데이터 정의
const actions = [
  {
    title: "대출 갈아타기",
    description: "더 좋은 조건의 대출이 있는지 확인해보세요.",
    path: "/spending/limit", // 이동할 경로 예시
    leading: (
      <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
        <ArrowLeftRight size={20} />
      </div>
    ),
  },
  {
    title: "적금 알아보기",
    description: "차곡차곡 모으기",
    path: "/spending/balance",
    leading: (
      <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
        <PiggyBank size={20} />
      </div>
    ),
  }
];

export default function QuickActionLoanFunctionList() {
  const router = useRouter();

  return (
    <section className="w-full px-4 py-6">
      {/* 상단 타이틀 */}
      <SectionHeading className="mb-4">
        대출 알아보기
      </SectionHeading>

      {/* 버튼 리스트 영역 */}
      <div className="flex flex-col gap-3">
        {actions.map((action, index) => (
          <QuickActionButton
            key={index}
            title={action.title}
            description={action.description}
            leading={action.leading}
            onClick={() => {
              // 실제 경로 이동 로직 (필요시 활성화)
              // router.push(action.path);
              console.log(`${action.title} 클릭됨`);
            }}
          />
        ))}
      </div>
    </section>
  );
}
