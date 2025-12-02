"use client";

import Link from "next/link";

export default function BottomCTA({
  label,
  onClick,
  href,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <div className="w-full bg-blue-500 text-white py-3.5 rounded-xl text-[14px] font-semibold text-center cursor-pointer">
      {label}
    </div>
  );

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
      {href ? (
        <Link href={href} onClick={onClick} className="block w-full">
          {content}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="w-full bg-blue-500 text-white py-3.5 rounded-xl text-[14px] font-semibold"
        >
          {label}
        </button>
      )}
    </div>
  );
}
