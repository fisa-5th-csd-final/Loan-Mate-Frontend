"use client";

type TabItem = {
  label: string;
  value: string;
};

type Props = {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
};

export default function TransferTabs({ tabs, value, onChange }: Props) {
  return (
    <div className="bg-[#f3f5f7] w-full rounded-2xl py-1 px-2 flex items-center text-sm font-medium text-gray-500">
      {tabs.map((tab, index) => (
        <div key={tab.value} className="flex items-center flex-1">
          {/* 버튼 */}
          <button
            onClick={() => onChange(tab.value)}
            className={`
              px-4 py-2 rounded-xl flex-1 text-center transition
              ${value === tab.value ? 
                "bg-white shadow-sm text-black" : 
                "bg-transparent text-[#9ca3af]"}
            `}
          >
            {tab.label}
          </button>

          {/* 구분선 */}
          {index < tabs.length - 1 && (
            <div className="w-px h-4 bg-gray-300 mx-1" />
          )}
        </div>
      ))}
    </div>
  );
}
