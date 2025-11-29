'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Direction = 'forward' | 'back' | 'none';

interface NavigationContextType {
    direction: Direction;
    push: (href: string) => void;
    back: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [direction, setDirection] = useState<Direction>('none');

    // 경로가 변경되면 잠시 후 방향을 초기화 (애니메이션 완료 후)
    useEffect(() => {
        const timer = setTimeout(() => setDirection('none'), 1000);
        return () => clearTimeout(timer);
    }, [pathname]);

    const push = (href: string) => {
        setDirection('forward');
        // 상태 업데이트가 전파될 시간을 확보하기 위해 약간의 지연 후 이동
        setTimeout(() => {
            router.push(href);
        }, 10);
    };

    const back = () => {
        setDirection('back');
        router.back();
    };

    // 브라우저 뒤로가기 버튼 감지
    useEffect(() => {
        const handlePopState = () => {
            setDirection('back');
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <NavigationContext.Provider value={{ direction, push, back }}>
            {children}
        </NavigationContext.Provider>
    );
}

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) throw new Error('useNavigation must be used within NavigationProvider');
    return context;
};
