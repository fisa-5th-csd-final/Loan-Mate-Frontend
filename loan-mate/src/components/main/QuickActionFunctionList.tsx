"use client";

import QuickActionButton from "@/components/ui/button/QuickActionButton";
import SectionHeading from "@/components/ui/typography/SectionHeading";
import { PAGES } from "@/consts/ROUTES";
import { useNavigation } from "@/context/NavigationContext";
import { Target, Scale, RefreshCw } from "lucide-react";

type ActionItem = {
  title: string;
  description: string;
  path: string;
  leading: React.ReactNode;
};

// 버튼 데이터 정의
const actions: ActionItem[] = [
  {
    title: "나의 지출 한도 정하기",
    description: "나의 소비 내역을 카테고리 별로 보고\nAI가 지출 한도를 제안해줘요",
    path: "/expenditure/limit",
    leading: (
      <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
        <Target size={20} />
      </div>
    ),
  },
  {
    title: "나의 소비 밸런스 맞추기",
    description: "나의 수익/지출에 따라 대출 상환에 대한 위험도를 보여줘요",
    path: "/spending-balance",
    leading: (
      <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
        <Scale size={20} />
      </div>
    ),
  },
  {
    title: "자동 예치 등록/선납하기",
    description: "여유 자금이 생길 경우 예치와\n선납으로 연체를 예방할 수 있어요",
    path: PAGES.AUTO_DEPOSIT,
    leading: (
      <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
        <RefreshCw size={20} />
      </div>
    ),
  },
];

export default function QuickActionFunctionList() {
  const { setDirection } = useNavigation();

  return (
    <section className="w-full py-8">
      {/* 상단 타이틀 */}
      <SectionHeading className="mb-4">
        이러한 기능을 사용할 수 있어요
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
              if (action.path.includes("/expenditure/limit")) {
                sessionStorage.setItem("exp_start_time", performance.now().toString());
              }
              console.log(`${action.title} 클릭됨`);
            }}
          />
        ))}
      </div>
    </section>
  );
}
