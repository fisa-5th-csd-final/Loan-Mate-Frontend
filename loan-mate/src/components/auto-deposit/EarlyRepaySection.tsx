"use client";

import Card from "@/components/ui/card/Card";
import SegmentProgressBar from "@/components/ui/progress/SegmentProgressBar";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";

interface PrepaymentInfo {
  loanLedgerId: string;
  balance: number;
  loanName: string;
  benefit: number;
  mustPaidAmount: number;
}

interface PrepaymentInfoResponse {
  code: string;
  message: string;
  data: PrepaymentInfo[];
}

export default function EarlyRepaySection() {
  const [benefitTotal, setBenefitTotal] = useState<number>(0);
  const [segments, setSegments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBenefits() {
      try {
        // apiClient는 이미 JSON 파싱된 값을 반환함
        const res = await apiClient.get<PrepaymentInfoResponse>(
          "/api/loans/prepayment-infos",
          { cache: "no-store" }
        );

        if (!res) {
        console.warn("응답 없음(로그인 필요)");
        setSegments([]);
        return;
      }

        const list = Array.isArray(res.data) ? res.data : [];

        const colors = [
          "bg-red-500",
          "bg-blue-500",
          "bg-gray-500",
          "bg-green-500",
          "bg-yellow-500",
          "bg-purple-500",
          "bg-pink-500"
        ];

        const totalBenefit = list.reduce(
          (acc, cur) => acc + Number(cur.benefit),
          0
        );

        const generatedSegments = list.map((item, index) => ({
          id: `loan-${index}`,
          label: item.loanName,
          percent: totalBenefit === 0 ? 0 : item.benefit / totalBenefit,
          color: colors[index % colors.length],
        }));

        setBenefitTotal(totalBenefit);
        setSegments(generatedSegments);
      } catch (error) {
        console.error("Failed to fetch benefits:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBenefits();
  }, []);

  const formatCurrency = (num: number) => num.toLocaleString("ko-KR");

  return (
    <section className="mt-8">
      <h2 className="font-semibold text-lg mb-2">선납할 수 있어요</h2>

      <Card className="p-2 h-[140px] flex items-center justify-center">
        {loading ? (
          <div className="p-4 text-center text-gray-500">불러오는 중...</div>
        ) : (
          <>
          {segments.length > 0 ? (
              // 그래프 + 텍스트 있는 경우 → 두 요소 묶어서 중앙 정렬
              <div className="flex flex-col items-center w-full">
                <div className="w-full mb-2">
                  <SegmentProgressBar segments={segments} />
                </div>

                <p className="text-base text-gray-700 font-medium text-center">
                  지금 선납하면{" "}
                  <strong className="font-semibold">
                    {formatCurrency(benefitTotal)}원
                  </strong>{" "}
                  이득이에요
                </p>
              </div>
            ) : (
              // 그래프 없음 → 글자만 중앙에 위치
              <p className="text-base text-gray-700 font-medium text-center">
                선납 이득인 대출이 없어요
              </p>
            )}
          </>
        )}
      </Card>
    </section>
  );
}
