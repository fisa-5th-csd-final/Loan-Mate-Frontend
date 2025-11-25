export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F5F7FA] p-4 rounded-xl border border-gray-200 shadow-sm">
      {children}
    </div>
  );
}
