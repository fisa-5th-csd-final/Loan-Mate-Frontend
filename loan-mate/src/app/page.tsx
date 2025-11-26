"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { PAGES } from "@/consts/ROUTES";
import { getFlag } from "@/lib/db/userFlags";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    async function check() {
      const connected = await getFlag("asset_connected");

      if (connected) {
        router.replace(PAGES.MAIN);
      } else {
        router.replace("/connect");
      }
    }

    check();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <LoadingSpinner size="lg" label="페이지로 이동 중..." />
    </div>
  );
}
