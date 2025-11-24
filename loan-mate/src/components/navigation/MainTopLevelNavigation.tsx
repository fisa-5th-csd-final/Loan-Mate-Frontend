'use client';

import React, { useState } from 'react';
import { TopCategoryNav } from '@/components/navigation/Navigation';

// 내비게이션 바에 보여줄 카테고리 리스트
const items = [
    { id: 'all', label: '전체' },
    { id: 'deposit', label: '입출금/저축' },
    { id: 'loan', label: '대출' },
    { id: 'invest', label: '투자' },
    { id: 'pension', label: '연금/보험' },
];

export default function MainTopLevelNavigation() {
    const [active, setActive] = useState('loan'); // 기본 선택: "대출"

    return (
        <main className="min-h-screen bg-white py-6">
            {/* 상단 네비게이션 바 */}
            <TopCategoryNav
                items={items}
                activeId={active}
                onChange={setActive}
                className="max-w-4xl mx-auto"
            />
            {/* 컨텐츠 영역 */}
        </main>
    );
}