/**
 * PageTransition
 * 
 * 페이지 전환 시 슬라이드 애니메이션을 제공하는 래퍼 컴포넌트
 * 각 페이지의 최상위에서 사용합니다.
 * 
 * @example
 * export default function SomePage() {
 *   return (
 *     <PageTransition>
 *       <div>Your page content</div>
 *     </PageTransition>
 *   );
 * }
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type PageTransitionProps = {
    children: ReactNode;
    /** 슬라이드 방향 (기본값: 'left' - 오른쪽에서 왼쪽으로) */
    direction?: 'left' | 'right';
    /** 애니메이션 지속 시간 (기본값: 0.3초) */
    duration?: number;
    className?: string;
};

export default function PageTransition({
    children,
    direction = 'left',
    duration = 0.3,
    className = '',
}: PageTransitionProps) {
    const variants = {
        initial: {
            x: direction === 'left' ? '100%' : '-100%',
            opacity: 0,
        },
        enter: {
            x: 0,
            opacity: 1,
            transition: {
                duration,
                ease: [0.22, 1, 0.36, 1] as any, // 부드러운 easing
            },
        },
        exit: {
            x: direction === 'left' ? '-100%' : '100%',
            opacity: 0,
            transition: {
                duration: duration * 0.8,
                ease: [0.22, 1, 0.36, 1] as any,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
