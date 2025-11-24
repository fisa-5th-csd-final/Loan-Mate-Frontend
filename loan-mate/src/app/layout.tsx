import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-8 pt-0 sm:px-6">
          {children}
        </div>
      </body>
    </html>
  );
}
