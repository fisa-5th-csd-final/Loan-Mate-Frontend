"use client";

import Card from "@/components/card/Card";
import SegmentProgressBar from "@/components/SegmentProgressBar";

export default function EarlyRepaySection() {

  // 나중에 API에서도 percent 값만 바꿔주면 자동 반영됨
  const segments = [
    { id: "loanA", label: "기업밸민이자백대출", percent: 0.6, color: "bg-red-500" },
    { id: "loanB", label: "신한만경대출", percent: 0.25, color: "bg-blue-500" },
    { id: "loanC", label: "기업예금", percent: 0.15, color: "bg-gray-500" },
  ];


  return (
    <section className="mt-8">
      <h2 className="font-semibold text-lg mb-2">선납할 수 있어요</h2>

      <Card>
        {/* SegmentProgressBar 사용 */}
        <div className="mt-3">
          <SegmentProgressBar segments={segments} />
          </div>

        <p className="mt-4 text-base text-gray-700 text-center font-medium">
          지금 선납하면 <strong className="font-semibold">1,000,000원</strong> 이득이에요
        </p>

      </Card>
    </section>
  );
}
