'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Direction = 'forward' | 'back' | 'none';

interface NavigationContextType {
    direction: Direction;
    push: (href: string, direction?: Direction) => void;
    back: () => void;
    setDirection: React.Dispatch<React.SetStateAction<Direction>>;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [direction, setDirection] = useState<Direction>('none');

    const push = (href: string, dir: Direction = 'forward') => {
        setDirection(dir);
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
        <NavigationContext.Provider value={{ direction, push, back, setDirection }}>
            {children}
        </NavigationContext.Provider>
    );
}

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        // Provider 외부에서 사용될 경우(예: global-error) 더미 객체 반환
        return {
            direction: 'none' as Direction,
            push: (href: string, direction?: Direction) => { },
            back: () => { },
            setDirection: () => { },
        };
    }
    return context;
};
