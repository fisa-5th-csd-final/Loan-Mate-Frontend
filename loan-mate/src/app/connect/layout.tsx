import { ReactNode } from "react";
import NavigationBar from "@/components/NavigationBar";

export default function ConnectLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* 상단 네비게이션 */}
      <NavigationBar
        title="자산 연결"
        right={<button className="text-blue-500 text-[14px]">취소</button>}
      />

      {/* 페이지 본문 */}
      <main className="flex-1 px-4 pb-28">
        {children}
      </main>
    </div>
  );
}
