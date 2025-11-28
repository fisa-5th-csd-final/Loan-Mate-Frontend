// src/components/IncomeExpenseSegmentedControl.tsx

import React from 'react';

// 타입 정의
type AddItemType = 'income' | 'expense';

interface IncomeExpenseSegmentedControlProps {
    selectedType: AddItemType;
    onSelect: (type: AddItemType) => void;
}

// export default function ComponentName 형태로 변경
export default function IncomeExpenseSegmentedControl({ selectedType, onSelect }: IncomeExpenseSegmentedControlProps) {
    const types: { label: string; value: AddItemType }[] = [
        { label: '수입', value: 'income' },
        { label: '지출', value: 'expense' },
    ];

    return (
        <div className="flex w-[212px] gap-2">
            {types.map((type, index) => (
                <button
                    key={type.value}
                    onClick={() => onSelect(type.value)}
                    className={`
            flex-1 h-[39px] w-[104px] font-medium cursor-pointer transition-colors duration-200 
             rounded-[18px]
            
            ${selectedType === type.value
                            ? 'bg-[#2789F4] text-white border-[#2789F4] hover:bg-[#2789F4]'
                            : 'bg-[#F0F4F5] text-[#676E74] hover:bg-[#E7EBEC]'
                        }
          `}
                >
                    {type.label}
                </button>
            ))}
        </div>
    );
}