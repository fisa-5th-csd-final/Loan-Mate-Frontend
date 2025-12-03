"use client";

import { NavigationProvider } from "@/components/navigation/NavigationContext";
import AutoDepositLayoutContent from "./_components/AutoDepositLayoutContent";

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
