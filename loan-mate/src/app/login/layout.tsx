import type { ReactNode } from "react";
import NavigationBar from "@/components/ui/navigation/BackRouteNavigation";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <NavigationBar />

      <main className="flex-1 overflow-auto px-4">
        {children}
      </main>
    </div>
  );
}


