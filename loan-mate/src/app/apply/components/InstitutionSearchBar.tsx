export default function InstitutionSearchBar() {
  return (
    <div className="bg-[#F4F6F9] rounded-xl p-3 flex items-center gap-2">
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
      </svg>
      <input
        type="text"
        placeholder="기관 검색"
        className="bg-transparent w-full outline-none text-sm"
      />
    </div>
  );
}
