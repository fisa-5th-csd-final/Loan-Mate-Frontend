import Card from "@/components/card/Card";

const rows = [
  { name: "KB준싱무이자대출", amount: "0원", auto: "O" },
  { name: "신한만경대출", amount: "160,000원", auto: "X" },
  { name: "기업밸민이자백대출", amount: "300,000원", auto: "X" },
];

export default function AutoDepositTable() {
  return (
    <section className="mt-4">
      <h2 className="font-semibold text-lg mb-2">자동 예치 현황</h2>

      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-600 text-center">
              <th className="text-left py-2">대출명</th>
              <th>예치금 현황</th>
              <th>자동 예치 여부</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className="border-t border-gray-200 text-center"
              >
                <td className="py-3 text-left">{row.name}</td>
                <td>{row.amount}</td>
                <td>{row.auto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
}
