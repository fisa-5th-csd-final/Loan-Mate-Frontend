'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { onINP } from 'web-vitals/attribution';
import { useEffect } from 'react';

export function WebVitals() {
    useEffect(() => {
        console.log('[WebVitals] Component mounted');

        // Try to measure INP directly with attribution
        try {
            onINP((metric) => {
                console.log('[WebVitals] INP (from web-vitals):', metric);
                if (metric.attribution && metric.attribution.interactionTarget) {
                    console.log('[WebVitals] INP Target:', metric.attribution.interactionTarget);
                }
            }, { reportAllChanges: true });
        } catch (e) {
            console.error('[WebVitals] Failed to initialize onINP', e);
        }
    }, []);

    useReportWebVitals((metric) => {
        console.log('[WebVitals] Metric (from Next.js):', metric);
    });

    return null;
}
