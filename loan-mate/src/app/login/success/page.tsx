"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function LoginSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/connect");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <LoadingSpinner size="lg" label="페이지로 이동 중..." />
    </div>
  );
}
