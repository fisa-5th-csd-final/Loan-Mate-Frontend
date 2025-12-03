"use client";

import Link from "next/link";

export default function PageWithCTA({
  children,
  ctaLabel,
  onClick,
  href,
}: {
  children: React.ReactNode;
  ctaLabel: string;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <div className="w-full bg-blue-500 text-white py-4 rounded-xl text-[16px] font-semibold text-center cursor-pointer">
      {ctaLabel}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white">
      <div className="pb-24 pt-6">{children}</div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
        {href ? (
          <Link href={href} onClick={onClick} className="block w-full">
            {content}
          </Link>
        ) : (
          <button
            onClick={onClick}
            className="w-full bg-blue-500 text-white py-4 rounded-xl text-[16px] font-semibold"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}
