'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';
import { initSessionAttribution } from '@/lib/attribution';

export default function AnalyticsNavigationTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrl = useRef<string | null>(null);

  useEffect(() => {
    // 1. Capture initial session attribution (UTMs, referrer) once
    initSessionAttribution();
  }, []);

  useEffect(() => {
    if (!pathname) return;

    const queryString = searchParams?.toString();
    const fullUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // Prevent duplicate pageview dispatches for identical URLs (e.g. React Strict Mode)
    if (lastTrackedUrl.current === fullUrl) {
      return;
    }

    lastTrackedUrl.current = fullUrl;
    trackPageView(pathname);
  }, [pathname, searchParams]);

  return null;
}
