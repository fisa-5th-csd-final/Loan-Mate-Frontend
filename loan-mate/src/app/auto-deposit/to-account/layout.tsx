"use client";
export const dynamic = "force-dynamic";

import NavigationBar from "@/components/navigation/BackRouteNavigation";
import { NavigationProvider, useNavigation } from "@/components/navigation/NavigationContext";
import { useRouter } from "next/navigation";

function LayoutNavigationBar() {
  const { title } = useNavigation();
  const router = useRouter();

  return (
      <NavigationBar
        title={title}
        showBack={true}
        right={
        <button 
          className="text-blue-600 text-sm"
          onClick={() => router.push("/auto-deposit")}>취소</button>
        }
      />
  );
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
