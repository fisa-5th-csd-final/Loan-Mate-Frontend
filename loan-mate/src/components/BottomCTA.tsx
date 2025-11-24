"use client";
export default function BottomCTA({
  count,
  label,
}: {
  count: number;
  label: string;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
      <button className="w-full bg-blue-500 text-white py-3.5 rounded-xl text-[14px] font-semibold">
        {count}개 {label}
      </button>
    </div>
  );
}
