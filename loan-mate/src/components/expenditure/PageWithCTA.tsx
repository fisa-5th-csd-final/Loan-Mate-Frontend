"use client";

import CommonButton from "@/components/ui/button/CommonButton";

export default function PageWithCTA({
  children,
  ctaLabel,
  onClick,
  href,
  disabled,
}: {
  children: React.ReactNode;
  ctaLabel: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="pb-32 pt-2">{children}</div>

      {/* 하단 그라데이션 (스크롤 내용 가림용) */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-10" />

      {/* CTA 버튼 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-20">
        <CommonButton
          label={ctaLabel}
          onClick={onClick}
          href={href}
          disabled={disabled}
          size="lg"
          className="w-full rounded-xl text-[16px] font-semibold py-4 h-auto"
        />
      </div>
    </div>
  );
}
