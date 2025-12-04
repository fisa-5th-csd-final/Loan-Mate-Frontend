export default function Card({ 
  children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-[#F5F7FA] p-4 rounded-xl border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
