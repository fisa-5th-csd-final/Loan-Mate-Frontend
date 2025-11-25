"use client";

import { useRouter } from "next/navigation";
import QuickActionButton from "@/components/button/QuickActionButton"; // 버튼 컴포넌트 경로에 맞게 수정해주세요
import SectionHeading from "@/components/SectionHeading";

export default function QuickActionList() {
  const router = useRouter();

  // 버튼 데이터 정의
  const actions = [
    {
      title: "나의 지출 한도 정하기",
      description: "나의 소비 내역을 카테고리 별로 보고 AI가 지출 한도를 제안해줘요",
      path: "/spending/limit", // 이동할 경로 예시
    },
    {
      title: "나의 소비 밸런스 맞추기",
      description: "나의 수익/지출에 따라 대출 상환에 대한 위험도를 보여줘요",
      path: "/spending/balance",
    },
    {
      title: "자동 예치 등록/선납하기",
      description: "여유 자금을 감지하면 예치와 부분 상환을 유도해주어 연체를 예방할 수 있어요",
      path: "/loan/auto-pay", // TODO: 추후 경로 수정 필요
    },
  ];

  return (
    <section className="w-full max-w-md mx-auto px-4 py-6">
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
