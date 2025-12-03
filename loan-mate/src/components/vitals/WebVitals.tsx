'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
    useReportWebVitals((metric) => {
        if (process.env.NEXT_PUBLIC_PRINT_WEB_VITALS === 'true') {
            const { name, value } = metric;
            const unit = name === 'CLS' ? '' : 'ms';
            const formattedValue = name === 'CLS' ? value.toFixed(4) : value.toFixed(2);

            console.log(`[WebVitals] ${name}: ${formattedValue}${unit}`);
        }
    });

    return null;
}