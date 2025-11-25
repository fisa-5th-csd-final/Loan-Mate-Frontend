import NavigationBar from "@/components/navigation/BackRouteNavigation";

export default function AutoDepositLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#ffffff] min-h-screen">
      <NavigationBar title="자동 예치 등록/선납하기" />
      <div className="p-4">{children}</div>
    </div>
  );
}
