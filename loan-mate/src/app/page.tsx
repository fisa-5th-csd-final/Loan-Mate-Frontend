"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { PAGES } from "@/consts/ROUTES";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(PAGES.MAIN);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <LoadingSpinner size="lg" label="메인으로 이동합니다..." />
    </div>
  );
}
