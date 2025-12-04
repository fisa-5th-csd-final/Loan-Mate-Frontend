'use client';

import { useState } from "react";
import SegmentedToggle from "@/components/ui/button/SegmentedToggle";

type Props = {
  className?: string;
};

export default function AssetAndConsumeToggle({ className = "" }: Props) {
  const [value, setValue] = useState<"asset" | "consume">("asset");

  return (
    <div
      className={`flex w-35 py-4 ${className}`}
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
