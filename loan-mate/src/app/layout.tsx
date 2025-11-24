import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="h-screen overflow-hidden bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}

