'use client';

import { useState } from "react";
import SegmentedToggle from "@/components/button/SegmentedToggle";

type Props = {
  className?: string;
};

export default function AssetAndConsumeToggle({ className = "" }: Props) {
  const [value, setValue] = useState<"asset" | "consume">("asset");

  return (
    <div
      className={`flex w-[clamp(100px,30vw,300px)] h-[clamp(100px, 15dvh, 200px)] px-2 py-4 ${className}`}
    >
      <SegmentedToggle
        options={[{ label: "자산", value: "asset" }, { label: "소비", value: "consume", disabled: true }]}
        onChange={setValue}
        value={value}
        className="w-full"
      />
    </div>
  );

}
