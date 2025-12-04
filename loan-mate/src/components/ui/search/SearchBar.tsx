"use client";
import { Search } from "lucide-react";

export default function SearchBar({
  placeholder = "기관 검색",
}: {
  placeholder?: string;
}) {
  return (
    <div className="mt-5 w-full bg-gray-100 rounded-[6px] px-4 py-3 flex items-center gap-3">
      <Search className="w-4 h-4 text-gray-700" />
      <input
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-[15px] text-gray-800"
      />
    </div>
  );
}

