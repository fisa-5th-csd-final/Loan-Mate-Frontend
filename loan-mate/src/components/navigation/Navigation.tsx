'use client';

import React from 'react';

type NavItem = {
  id: string;
  label: string;
};

interface TopCategoryNavProps {
  items: NavItem[];
  activeId: string;
  onChange?: (id: string) => void;
  className?: string;
}

/**
 * 상단 카테고리 네비게이션 컴포넌트
 * 여러 카테고리 중 하나를 선택할 수 있는 네비게이션 바
 * 선택된 카테고리에 밑줄이 표시됨
 */
export const TopCategoryNav: React.FC<TopCategoryNavProps> = ({
  items,
  activeId,
  onChange,
  className = '',
}) => {
  return (
    <nav
      className={`w-full bg-[#f4f7f9] px-4 py-3 flex justify-between ${className}`}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange?.(item.id)}
            className="
              relative flex flex-col items-center
              outline-none
            "
          >
            <span
              className={`
                text-[20px]
                tracking-tight
                ${isActive ? 'font-semibold text-[#3b3f43]' : 'font-normal text-[#6e7378]'}
              `}
            >
              {item.label}
            </span>

            {/* 밑줄 */}
            <span
              className={`
                mt-1 h-[3px] w-10 rounded-full bg-black
                transition-opacity duration-150
                ${isActive ? 'opacity-100' : 'opacity-0'}
              `}
            />
          </button>
        );
      })}
    </nav>
  );
};