import { ReactNode } from "react";
import NavigationBar from "@/components/ui/navigation/BackRouteNavigation";

export default function ConnectLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* 상단 네비게이션 */}
      <NavigationBar
        title="내 자산 연결하기" />

      {/* 페이지 본문 */}
      <main className="flex flex-col gap-4 bg-white px-6">
        {children}
      </main>
    </div>
  );
}
