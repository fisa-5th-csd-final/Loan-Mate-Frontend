"use client";

import { NavigationProvider } from "@/components/ui/navigation/NavigationContext";
import AutoDepositLayoutContent from "@/components/auto-deposit/AutoDepositLayoutContent";

export const dynamic = "force-dynamic";

export default function AutoDepositLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <AutoDepositLayoutContent>
        {children}
      </AutoDepositLayoutContent>
    </NavigationProvider>
  );
}
