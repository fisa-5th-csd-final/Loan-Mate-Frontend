"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/connect");
  }, [router]);

  // TODO: 추후 로딩 컴포넌트로 바꿔야 함 
  return <p>로그인 중...</p>;
}
