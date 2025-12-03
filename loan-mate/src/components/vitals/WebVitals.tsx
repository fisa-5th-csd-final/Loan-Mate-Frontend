'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { onINP } from 'web-vitals/attribution';
import { useEffect } from 'react';

export function WebVitals() {
    useEffect(() => {
        onINP((metric) => {
            console.log('[WebVitals] INP:', metric);
            if (metric.attribution && metric.attribution.interactionTarget) {
                console.log('[WebVitals] INP Target:', metric.attribution.interactionTarget);
            }
        });
    }, []);

    useReportWebVitals((metric) => {
        // Log other metrics if needed, or use this hook for standard reporting
        // console.log(metric);
    });

    return null;
}
