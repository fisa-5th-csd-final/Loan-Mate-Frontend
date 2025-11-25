"use client";

import { useRouter } from "next/navigation";

export function useAuthNavigation() {
  const router = useRouter();

  return {
    goLogin: () => router.push("/login"),
  };
}
