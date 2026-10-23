'use client';

import React, { useEffect, Suspense } from 'react';
import { initGlobalTracking } from '@/lib/track';
import AnalyticsNavigationTracker from './AnalyticsNavigationTracker';

export default function TrackingProvider() {
  useEffect(() => {
    const cleanup = initGlobalTracking();
    return cleanup;
  }, []);

  return (
    <Suspense fallback={null}>
      <AnalyticsNavigationTracker />
    </Suspense>
  );
}
