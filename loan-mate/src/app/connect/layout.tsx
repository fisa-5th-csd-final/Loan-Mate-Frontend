import { ReactNode } from "react";
import NavigationBar from "@/components/navigation/BackRouteNavigation";

export default function ConnectLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* 상단 네비게이션 */}
      <NavigationBar
        title="나의 소비밸런스 맞추기" />

      {/* 페이지 본문 */}
      <main className="flex flex-col gap-4 bg-white px-4">
        {children}
      </main>
    </div>
  );
}
