"use client";

import { useEffect, type ReactNode } from "react";
import { useAuthNavigation } from "@/lib/api/auth/navigation";
import { setAuthFailHandler } from "@/lib/api/client";

interface Props {
  children: ReactNode;
}

export default function ClientProviders({ children }: Props) {
  const { goLogin } = useAuthNavigation();

  useEffect(() => {
    setAuthFailHandler(() => goLogin());
  }, []);

  return <>{children}</>;
}
