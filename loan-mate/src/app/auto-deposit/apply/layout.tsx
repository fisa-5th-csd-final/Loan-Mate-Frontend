"use client";

import NavigationBar from "@/components/navigation/BackRouteNavigation";
import {
  NavigationProvider,
  useNavigation,
} from "@/components/navigation/NavigationContext";

function LayoutNavigationBar() {
  const { title } = useNavigation();

  return (
    <NavigationBar
      title={title}
      showBack={true}
      right={<button className="text-blue-600 text-sm">취소</button>}
    />
  );
}

export default function ApplyAutoDepositLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="bg-white min-h-screen">
        <LayoutNavigationBar />
        <div className="p-5">{children}</div>
      </div>
    </NavigationProvider>
  );
}
