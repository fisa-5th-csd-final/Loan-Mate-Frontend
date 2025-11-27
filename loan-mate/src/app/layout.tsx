import MobileNotch from "@/components/layout/MobileNotch";
import type { Metadata, Viewport } from "next";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Mate",
  description: "모바일 웹앱 레이아웃",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-neutral-900 text-white">
        {/* 전체 배경 */}
        <div className="min-h-screen flex items-center justify-center">
          {/* 실제 앱이 들어갈 '모바일 기기' 영역 */}
          <div
            className="
              w-full
              max-w-[100dvw]/* iPhone 14 Pro Max 기준 */
              sm:max-w-[390px]
              md:max-w-[430px]
              lg:max-w-[780px]       
              min-h-screen
              bg-[#f0f4f5]
              shadow-[0_0_40px_rgba(0,0,0,0.8)]
              relative
            ">

            {/* 실제 페이지 */}
            <ClientProviders>
              {children}
            </ClientProviders>

          </div>
        </div>
      </body>
    </html>
  );
}