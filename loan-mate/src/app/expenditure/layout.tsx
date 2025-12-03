import type { ReactNode } from "react";
import NavigationBar from "@/components/ui/navigation/BackRouteNavigation";

export default function ExpenditureLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <NavigationBar title="나의 지출 한도 정하기" />

      <main className="flex-1 overflow-auto px-4">
        {children}
      </main>
    </div>
  );
}


