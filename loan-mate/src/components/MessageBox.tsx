"use client";

interface MessageBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function MessageBox({ children, className }: MessageBoxProps) {
  return (
    <div
      className={`rounded-3xl bg-blue-100 px-3 py-3 text-[15px] leading-relaxed text-gray-900 ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
