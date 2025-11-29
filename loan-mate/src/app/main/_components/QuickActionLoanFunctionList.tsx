"use client";

import { useRouter } from "next/navigation";
import QuickActionButton from "@/components/button/QuickActionButton"; // 버튼 컴포넌트 경로에 맞게 수정해주세요
import SectionHeading from "@/components/SectionHeading";
import { ArrowLeftRight, PiggyBank } from "lucide-react";

type ActionItem = {
  title: string;
  description: string;
  path: string;
  leading: React.ReactNode;
};

// 버튼 데이터 정의
// TODO: "대출 갈아타기", "적금 알아보기" 페이지 구현 후 추가
const actions: ActionItem[] = [];

export default function QuickActionLoanFunctionList() {
  const router = useRouter();

  // 액션이 없으면 섹션 자체를 숨김
  if (actions.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-6">
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
              router.push(action.path);
              console.log(`${action.title} 클릭됨`);
            }}
          />
        ))}
      </div>
    </section>
  );
}
