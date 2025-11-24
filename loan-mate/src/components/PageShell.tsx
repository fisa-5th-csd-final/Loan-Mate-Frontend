"use client";

import type { ReactNode } from "react";
import NavigationBar from "@/components/navigation/BackRouteNavigation";

type PageShellProps = {
  title?: string;
  showBack?: boolean;
  children: ReactNode;
};

export default function PageShell({
  title,
  showBack = true,
  children,
}: PageShellProps) {
  return (
    <div className="flex min-h-full flex-col">
      <NavigationBar title={title} showBack={showBack} />
      <main className="flex-1 pb-12 pt-4">{children}</main>
    </div>
  );
}
