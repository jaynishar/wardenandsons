import React from 'react';
import Script from 'next/script';
import { ANALYTICS_CONFIG } from '@/config/site';

export default function Analytics() {
  const { gaMeasurementId } = ANALYTICS_CONFIG;

  if (!gaMeasurementId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 (gtag.js) */}
      {gaMeasurementId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
