"use client";

import { useEffect, useState } from "react";
import Card from "@/components/card/Card";
import { apiClient } from "@/lib/api/client";

interface AutoDeposit {
  loanName: string;
  accountBalance: number;
  autoDepositEnabled: boolean;
}

interface AutoDepositResponse {
  code: string;
  message: string;
  data: AutoDeposit[];
}

export default function AutoDepositTable() {
  const [rows, setRows] = useState<AutoDeposit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiClient.get<AutoDepositResponse>(
          "/api/loans/auto-deposit-summary"
        );

        if (!res) {
          console.warn("응답이 없어서 rows를 빈 배열로 설정합니다.");
          setRows([]);
          return;
        }
        const data = Array.isArray(res.data) ? res.data : [];
        setRows(data);
      } catch (error) {
        console.error("API 호출 실패:", error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="mt-4">
      <h2 className="font-semibold text-lg mb-2">자동 예치 현황</h2>

      <Card>
        {loading ? (
          <div className="p-4 text-center text-gray-500">불러오는 중...</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-600 text-center">
                <th className="text-left py-2">대출명</th>
                <th>예치금 현황</th>
                <th>자동 예치 여부</th>
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-gray-400 text-center">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr
                    key={`${row.loanName}-${idx}`}
                    className="border-t border-gray-200 text-center"
                  >
                    <td className="py-3 text-left">{row.loanName}</td>
                    <td>{row.accountBalance.toLocaleString()}원</td>
                    <td>{row.autoDepositEnabled ? "O" : "X"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </Card>
    </section>
  );
}
