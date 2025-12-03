'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { onINP } from 'web-vitals/attribution';
import { useEffect } from 'react';

export function WebVitals() {
    useEffect(() => {
        console.log('[WebVitals] Component mounted');

        try {
            onINP((metric) => {
                logMetric(metric);
            }, { reportAllChanges: true });
        } catch (e) {
            console.error('[WebVitals] Failed to initialize onINP', e);
        }
    }, []);

    useReportWebVitals((metric) => {
        // Avoid duplicate logging for INP since we handle it explicitly above
        if (metric.name !== 'INP') {
            logMetric(metric);
        }
    });

    return null;
}

function logMetric(metric: any) {
    const { name, value, rating, delta, id, attribution, entries, navigationType } = metric;

    const style = {
        good: 'color: #0cce6b; font-weight: bold',
        needsImprovement: 'color: #ffa400; font-weight: bold',
        poor: 'color: #ff4e42; font-weight: bold',
        default: 'color: inherit'
    };

    const ratingStyle =
        rating === 'good' ? style.good :
            rating === 'needs-improvement' ? style.needsImprovement :
                rating === 'poor' ? style.poor :
                    style.default;

    console.groupCollapsed(`%c[WebVitals] ${name} : ${Math.round(value)}ms (${rating})`, ratingStyle);

    console.log(`%cValue: ${value.toFixed(2)}ms`, 'font-weight: bold');
    console.log(`Rating: ${rating}`);
    console.log(`Delta: ${delta.toFixed(2)}ms`);
    console.log(`ID: ${id}`);
    console.log(`Navigation Type: ${navigationType}`);

    if (attribution) {
        console.group('Attribution');
        console.log('Interaction Target:', attribution.interactionTarget);
        console.log('Interaction Time:', attribution.interactionTime);
        console.log('Next Paint Time:', attribution.nextPaintTime);
        console.log('Load State:', attribution.loadState);
        console.log('Full Attribution Object:', attribution);
        console.groupEnd();
    }

    if (entries && entries.length > 0) {
        console.groupCollapsed('Entries');
        entries.forEach((entry: any, index: number) => {
            console.log(`#${index + 1}`, entry);
        });
        console.groupEnd();
    }

    console.log('Full Metric Object:', metric);
    console.groupEnd();
}
