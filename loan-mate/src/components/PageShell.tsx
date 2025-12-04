"use client";

import type { ReactNode } from "react";
import NavigationBar from "@/components/ui/navigation/BackRouteNavigation";

type PageShellProps = {
  title?: string;
  showBack?: boolean;
  children: ReactNode;
};

export default function PageShell({ title, showBack = true, children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavigationBar title={title} showBack={showBack} />
      <main className="flex-1 px-6 py-6">{children}</main>
    </div>
  );
}
