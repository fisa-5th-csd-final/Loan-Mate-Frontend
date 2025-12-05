'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { onINP, onLCP } from 'web-vitals/attribution';
import { useEffect } from 'react';

// Define a type that covers both Next.js metrics and web-vitals metrics with attribution
type WebVitalsMetric = {
    id: string;
    name: string;
    startTime: number;
    value: number;
    label: string;
    rating: 'good' | 'needs-improvement' | 'poor';
    delta: number;
    entries: any[];
    navigationType: string;
    attribution?: {
        interactionTarget?: string;
        interactionTime?: number;
        nextPaintTime?: number;
        loadState?: string;
        [key: string]: any;
    };
    [key: string]: any;
};

export function WebVitals() {
    useEffect(() => {
        console.log('[WebVitals] Component mounted');

        try {
            onINP((metric) => {
                logMetric(metric as unknown as WebVitalsMetric);
            }, { reportAllChanges: true });

            onLCP((metric) => {
                logMetric(metric as unknown as WebVitalsMetric);
            }, { reportAllChanges: true });
        } catch (e) {
            console.error('[WebVitals] Failed to initialize metrics', e);
        }
    }, []);

    useReportWebVitals((metric) => {
        // Avoid duplicate logging for INP and LCP since we handle them explicitly above
        if (metric.name !== 'INP' && metric.name !== 'LCP') {
            logMetric(metric as unknown as WebVitalsMetric);
        }
    });

    return null;
}

function logMetric(metric: WebVitalsMetric) {
    const { name, value, rating, delta, id, attribution, entries, navigationType } = metric;

    // Track worst value in sessionStorage
    const storageKey = `web-vitals-max-${name}`;
    let worstValue = value;
    try {
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
            worstValue = Math.max(parseFloat(stored), value);
        }
        sessionStorage.setItem(storageKey, worstValue.toString());
    } catch (e) {
        // Ignore storage errors
    }

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

    console.groupCollapsed(`%c[WebVitals] ${name} : ${Math.round(value)}ms (${rating}) | Worst: ${Math.round(worstValue)}ms`, ratingStyle);

    console.log(`%cValue: ${value.toFixed(2)}ms`, 'font-weight: bold');
    console.log(`%cWorst: ${worstValue.toFixed(2)}ms`, 'font-weight: bold; color: #ff4e42');
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
