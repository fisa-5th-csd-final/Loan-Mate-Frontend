"use client";
export default function CategoryTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: number;
  onChange?: (index: number) => void;
}) {
  return (
    <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar">
      {tabs.map((t, i) => {
        const selected = i === active;

        return (
          <button
            key={t}
            onClick={() => onChange && onChange(i)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-[14px] ${
              selected
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
