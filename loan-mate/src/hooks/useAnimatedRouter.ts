/**
 * useAnimatedRouter
 * 
 * NavigationContext를 사용하여 방향성 있는 페이지 전환을 제공합니다.
 */

'use client';

import { useNavigation } from '@/context/NavigationContext';

export function useAnimatedRouter() {
    const { push, back, direction } = useNavigation();

    return {
        push,
        back,
        direction,
    };
}
