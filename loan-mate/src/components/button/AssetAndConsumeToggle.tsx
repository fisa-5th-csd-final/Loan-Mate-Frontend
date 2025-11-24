'use client';

import { useState, type ReactNode } from "react";
import SegmentedToggle from "@/components/button/SegmentedToggle";

export default function AssetAndConsumeToggle() {
    const [value, setValue] = useState<"asset" | "consume">("asset");

    return (
        <div className="px-4 py-4 w-[40dvw] justify-start">
            <SegmentedToggle 
                    options={[{ label: "자산", value: "asset" }, { label: "소비", value: "consume" }]} 
                    onChange={setValue} 
                    value={value} />
        </div>
    );

}