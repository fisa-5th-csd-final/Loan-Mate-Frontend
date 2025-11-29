'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useContext, useRef } from 'react';

/**
 * 
 * 이 컴포넌트는 Next.js의 비공개 내부 API인 LayoutRouterContext를 사용합니다.
 * 페이지 전환 시 이전 페이지의 상태를 유지(Freeze)하여 exit 애니메이션을 구현하기 위함입니다.
 * 
 * Next.js 버전 업데이트 시 이 경로(next/dist/shared/lib/app-router-context.shared-runtime)나
 * 동작 방식이 변경될 수 있으므로 주의가 필요합니다.
 * 공식적인 View Transitions API 지원이 안정화되면 교체하는 것을 권장합니다.
 */
function FrozenRouter(props: { children: React.ReactNode }) {
    const context = useContext(LayoutRouterContext);
    const frozen = useRef(context).current;

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {props.children}
        </LayoutRouterContext.Provider>
    );
}

export default function PageAnimateWrapper({ children }: { children: React.ReactNode }) {
    const { direction } = useNavigation();
    const pathname = usePathname();

    const variants = {
        enter: (direction: string) => ({
            x: direction === 'back' ? '-100%' : '100%',
            opacity: 1,
            zIndex: 2,
            position: 'absolute' as const,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        }),
        center: {
            x: 0,
            opacity: 1,
            zIndex: 2,
            position: 'absolute' as const,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        exit: (direction: string) => ({
            x: direction === 'back' ? '100%' : '-100%',
            opacity: 1,
            zIndex: 1,
            position: 'absolute' as const,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        }),
    };

    return (
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
                key={pathname}
                custom={direction}
                variants={variants}
                initial={direction !== 'none' ? 'enter' : false}
                animate="center"
                exit="exit"
                transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30, mass: 1 },
                    opacity: { duration: 0.2 },
                }}
                className="w-full h-full bg-[#f0f4f5] overflow-hidden absolute top-0 left-0"
            >
                <div className="w-full h-full overflow-y-auto">
                    <FrozenRouter>{children}</FrozenRouter>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
