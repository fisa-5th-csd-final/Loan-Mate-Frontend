'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';

export default function Template({ children }: { children: React.ReactNode }) {
    const { direction } = useNavigation();

    const variants = {
        enter: (direction: string) => ({
            x: direction === 'back' ? '-100%' : '100%',
            opacity: 1,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        // exit animation requires AnimatePresence in parent (layout), 
        // but template.tsx unmounts on navigation, so exit won't trigger visibly 
        // unless layout handles it. For now, we focus on enter animation.
    };

    return (
        <motion.div
            custom={direction}
            variants={variants}
            initial={direction !== 'none' ? 'enter' : false}
            animate="center"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full h-full bg-[#f0f4f5] overflow-y-auto overflow-x-hidden absolute inset-0"
        >
            {children}
        </motion.div>
    );
}
