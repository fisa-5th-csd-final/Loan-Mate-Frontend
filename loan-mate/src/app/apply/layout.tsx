import NavigationBar from "@/components/navigation/BackRouteNavigation";

export default function ApplyAutoDepositLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen">
      <NavigationBar
        title="자동예치 신청하기"
        showBack={true}
        right={<button className="text-blue-600 text-sm">취소</button>}
      />
      <div className="p-5">{children}</div>
    </div>
  );
}
