"use client";

import QuickActionButton from "@/components/ui/button/QuickActionButton";
import SectionHeading from "@/components/ui/typography/SectionHeading";
import { ArrowLeftRight, PiggyBank } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

type ActionItem = {
  title: string;
  description: string;
  path: string;
  leading: React.ReactNode;
};

// 버튼 데이터 정의
const actions: ActionItem[] = [
  {
    title: "대출 갈아타기",
    description: "더 좋은 조건의 대출이 있는지 확인해보세요.",
    path: "/main", // 페이지 준비 전까지 임시로 메인으로
    leading: (
      <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
        <ArrowLeftRight size={20} />
      </div>
    ),
  },
  {
    title: "적금 알아보기",
    description: "차곡차곡 모으기",
    path: "/main", // 페이지 준비 전까지 임시로 메인으로
    leading: (
      <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
        <PiggyBank size={20} />
      </div>
    ),
  }
];

export default function QuickActionLoanFunctionList() {
  const { setDirection } = useNavigation();

  return (
    <section className="w-full pb-8 pt-0">
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
            href={action.path}
            onClick={() => {
              setDirection('forward');
            }}
          />
        ))}
      </div>
    </section>
  );
}
