"use client";
import FixedBudgetProgressBar from "@/app/spending-balance/_components/FixedBudgetProgressBar"
import { FixedBudgetItem } from "./FixedBudgetDashboard";

type FixedBudgetBoxProps = {
  title: string;
  description: string;
  values: FixedBudgetItem[];
  updateBar: (index: number, newValue: number) => void;
};

export default function BudgetBox({
  title,
  description,
  values,
  updateBar,
}: FixedBudgetBoxProps) {
  return (
    <div className="w-full flex flex-col gap-4 p-2.5 bg-(--white) rounded-2xl">
      {/* 제목 + 설명 */}
      <div>
        <h2 className="text-left font-semibold text-[17px] text-(--gray-900)">{title}</h2>
        <p className="text-left font-semibold text-[12px] text-(--gray-400)">{description}</p>
      </div>

      <div className="flex flex-col items-center w-full">
        {/* ProgressBar 리스트 */}
        <div className="flex flex-col gap-4 w-full">
          {values.map((item, i) => (
            <FixedBudgetProgressBar
              key={item.id}
              progress={item.value}
              label={item.label}
              min={0}
              max={item.max}
              onChange={(newValue) => updateBar(i, newValue)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}