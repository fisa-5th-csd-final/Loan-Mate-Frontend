"use client";

import { useEffect } from "react";
import { getFlag, setFlag } from "@/lib/db/userFlags";

export function useSwipeDeleteHint() {
  useEffect(() => {
    (async () => {
      const seen = await getFlag("swipe-delete-hint");
      if (!seen) {
        alert("항목을 왼쪽으로 밀면 삭제할 수 있어요!");
        await setFlag("swipe-delete-hint", true);
      }
    })();
  }, []);
}
