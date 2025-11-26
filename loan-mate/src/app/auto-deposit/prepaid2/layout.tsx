"use client";

import NavigationBar from "@/components/navigation/BackRouteNavigation";
import { NavigationProvider, useNavigation } from "@/components/navigation/NavigationContext";

function LayoutNavigationBar() {
  const { title } = useNavigation();
  return <NavigationBar title={title} showBack={true} />;
}

export default function Prepaid2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <LayoutNavigationBar />
      <div className="p-4">{children}</div>
    </NavigationProvider>
  );
}
