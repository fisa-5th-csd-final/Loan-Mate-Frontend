'use client';

import React from 'react';
import { TopCategoryNav } from '@/components/navigation/Navigation';

// 내비게이션 바에 보여줄 카테고리 리스트
export const MAIN_NAV_ITEMS = [
    { id: 'all', label: '전체', disabled: true },
    { id: 'deposit', label: '입출금/저축', disabled: true },
    { id: 'loan', label: '대출' },
    { id: 'invest', label: '투자', disabled: true },
    { id: 'pension', label: '연금/보험', disabled: true },
];

type MainTopLevelNavigationProps = {
    activeId: string;
    onChange: (id: string) => void;
};

export default function MainTopLevelNavigation({
    activeId,
    onChange,
}: MainTopLevelNavigationProps) {

    return (
        <div className="py-2">
            {/* 상단 네비게이션 바 */}
            <TopCategoryNav
                items={MAIN_NAV_ITEMS}
                activeId={activeId}
                onChange={onChange}
                className="max-w-4xl mx-auto"
            />
        </div>
    );
}
