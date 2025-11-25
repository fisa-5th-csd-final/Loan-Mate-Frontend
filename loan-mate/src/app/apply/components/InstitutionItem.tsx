"use client";

type Props = {
  id: number;
  name: string;
  logo: string;
  checked?: boolean;
  status?: string; // 연결됨 등
  onToggle: () => void;
};

export default function InstitutionItem({ name, logo, checked, status, onToggle }: Props) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200">
      {/* 왼쪽 로고 + 이름 */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <img src={logo} alt={name} className="h-6" />
        </div>
        <span className="font-medium">{name}</span>
      </div>

      {/* 오른쪽 상태 or 체크 */}
      {status ? (
        <span className="text-gray-500 text-xs border border-gray-300 px-2 py-0.5 rounded-full">
          {status}
        </span>
      ) : (
        <button
          onClick={onToggle}
          className={`w-6 h-6 rounded-full border flex items-center justify-center transition 
            ${
              checked
                ? "border-blue-600 bg-blue-600"
                : "border-gray-300 bg-white"
            }`}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
