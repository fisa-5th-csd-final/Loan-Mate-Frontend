
import PageShell from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell title="홈" showBack={false}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">홈 페이지</h1>
        <p className="text-gray-600">홈 화면 테스트</p>
      </div>
    </PageShell>
  );
}
