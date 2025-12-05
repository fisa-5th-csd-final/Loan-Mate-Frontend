"use client";

import { ConsumptionCategoryKey } from "@/models/expenditure-limit";
import {
  ConsumptionCategoryMeta,
  ConsumptionCategoryLabelMap,
} from "../ConsumptionCategoryMeta";
import { formatNumber } from "@/lib/util/NumberFormatter";

interface BudgetEditorContentProps {
  KEYS: ConsumptionCategoryKey[];
  draft: Record<ConsumptionCategoryKey, number>;
  onChange: (key: ConsumptionCategoryKey, value: number) => void;
  onApply: () => void;
  isProcessing: boolean;
  onClose?: () => void; // optional 로 변경
}


/**
 * 
 * 사용자 지출 한도 커스텀 할 때 쓰는 모달 페이지
 */
export default function BudgetEditorContent({
  KEYS,
  draft,
  onChange,
  onClose,
  onApply,
  isProcessing = false,
}: BudgetEditorContentProps) {
  return (
    <div className="pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[17px] font-semibold text-gray-900">
            추천 금액 수정
          </p>
          <p className="text-sm text-gray-500 mt-1">
            카테고리별 추천 지출 한도를 직접 입력하세요.
          </p>
        </div>

        <button
          className="text-sm text-gray-500 px-3 py-1 rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          닫기
        </button>
      </div>

      {/* Category List */}
      <div className="space-y-3">
        {KEYS.map((key) => {
          const meta = ConsumptionCategoryMeta[key];
          const Icon = meta.icon;
          const value = draft[key] ?? 0;

          return (
            <div
              key={key}
              className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: `${meta.hex}20` }}
                >
                  <Icon size={20} color={meta.hex} />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {ConsumptionCategoryLabelMap[key]}
                  </span>
                  <span className="text-xs text-gray-500">추천 금액</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-28 px-3 py-2 border border-gray-200 rounded-lg text-right text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={formatNumber(value)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, "");
                    if (rawValue === "") {
                      onChange(key, 0);
                      return;
                    }
                    if (!isNaN(Number(rawValue))) {
                      onChange(key, Math.max(0, Number(rawValue)));
                    }
                  }}
                />
                <span className="text-sm text-gray-500">원</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          className="w-1/2 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          취소
        </button>

        <button
          disabled={isProcessing}
          className={`w-1/2 py-3 rounded-lg text-sm font-medium text-white transition ${isProcessing
            ? "bg-blue-300"
            : "bg-[#1565FF] hover:bg-[#0B50D6]"
            }`}
          onClick={onApply}
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
