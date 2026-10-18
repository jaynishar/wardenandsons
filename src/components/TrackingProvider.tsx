'use client';

import { useEffect } from 'react';
import { initGlobalTracking } from '@/lib/track';

export default function TrackingProvider() {
  useEffect(() => {
    const cleanup = initGlobalTracking();
    return cleanup;
  }, []);

  return null;
}
