"use client";

import CheckIcon from "./CheckIcon";

export default function InstitutionItem({
  logo,
  name,
  connected,
  checked,
  onToggle,
}: {
  logo: string;
  name: string;
  connected?: boolean;
  checked?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between py-3 px-1"
    >
      <div className="flex items-center gap-3">
        {/* 로고 */}
        <img src={logo} alt={name} className="w-8 h-8 rounded-full" />

        {/* 이름 & 연결됨 배지 */}
        <div className="flex items-center gap-2">
          <span className="text-[15px] text-gray-900">{name}</span>

          {connected && (
            <span className="px-2 py-0.5 text-[11px] bg-gray-100 text-gray-500 rounded-xl">
              연결됨
            </span>
          )}
        </div>
      </div>

      {/* 체크아이콘 (애니메이션 포함) */}
      <CheckIcon checked={checked ?? false} size={18} />
    </button>
  );
}
