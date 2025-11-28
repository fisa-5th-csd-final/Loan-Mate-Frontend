"use client";

import Card from "@/components/card/Card";
import SegmentProgressBar from "@/components/SegmentProgressBar";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client"; 

export default function EarlyRepaySection() {
  const [benefitTotal, setBenefitTotal] = useState<number>(0);
  const [segments, setSegments] = useState<any[]>([]);

  const API = process.env.NEXT_PUBLIC_API_URL;

  console.log("API URL:", API);

  useEffect(() => {
    async function fetchBenefits() {
      interface PrepaymentInfo {
      loanName: string;
      benefit: number;
    }

    interface PrepaymentInfoResponse {
      code: string;
      message: string;
      data: PrepaymentInfo[];
    }

      try {
        const res = await fetch(
          `${API}/api/loans/prepayment-infos`,
          { cache: "no-store" }
        );

        if (!res) {
        console.warn("로그인이 필요합니다.");
        return;
      }

        const json: PrepaymentInfoResponse = await res.json();
        const list = json.data ?? [];

        const colors = ["bg-red-500", "bg-blue-500", "bg-gray-500", "bg-green-500"];

        const totalBenefit = list.reduce(
          (acc: number, cur: { benefit: number }) => acc + Number(cur.benefit),
          0
        );

        const generatedSegments = list.map((item: any, index: number) => ({
          id: `loan-${index}`,
          label: item.loanName,
          percent: totalBenefit === 0 ? 0 : item.benefit / totalBenefit,
          color: colors[index % colors.length],
        }));

        setBenefitTotal(totalBenefit);
        setSegments(generatedSegments);
      } catch (error) {
        console.error("Failed to fetch benefits:", error);
      }
    }

    fetchBenefits();
  }, []);

  const formatCurrency = (num: number) => num.toLocaleString("ko-KR");

  return (
    <section className="mt-8">
      <h2 className="font-semibold text-lg mb-2">선납할 수 있어요</h2>

      <Card>
        <div className="mt-3">
          <SegmentProgressBar segments={segments} />
        </div>

        <p className="mt-4 text-base text-gray-700 text-center font-medium">
          {segments.length === 0 ? (
            "선납 이득인 대출이 없어요"
          ) : (
            <>
              지금 선납하면{" "}
              <strong className="font-semibold">
                {formatCurrency(benefitTotal)}원
              </strong>{" "}
              이득이에요
            </>
          )}
        </p>
      </Card>
    </section>
  );
}
