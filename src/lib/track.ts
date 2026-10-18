/**
 * Warden & Sons Kids Wear — Analytics Event Tracking System
 * Safely pushes typed analytics events to GTM dataLayer using declarative HTML data-attributes.
 * Never logs PII (Personal Identifiable Information) such as phone numbers, customer names, or message text.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[Track]', event, params);
  }
}

/**
 * Initializes global event delegation for declarative tracking.
 * Listens for click events on elements with data-track and data-track-* attributes.
 */
export function initGlobalTracking(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // 1. Check for explicit data-track element
    const trackEl = target.closest<HTMLElement>('[data-track]');
    if (trackEl) {
      const eventName = trackEl.getAttribute('data-track');
      if (eventName) {
        const params: Record<string, unknown> = {};
        for (const key of Object.keys(trackEl.dataset)) {
          if (key.startsWith('track') && key !== 'track') {
            const cleanKey = key
              .replace(/^track/, '')
              .replace(/^[A-Z]/, c => c.toLowerCase())
              .replace(/([A-Z])/g, '_$1')
              .toLowerCase();
            params[cleanKey] = trackEl.dataset[key];
          }
        }
        track(eventName, params);
        return;
      }
    }

    // 2. Automatic tel: link detection
    const telLink = target.closest<HTMLAnchorElement>('a[href^="tel:"]');
    if (telLink && !telLink.hasAttribute('data-track')) {
      track('call_click', { location: 'telephone_link' });
      return;
    }
  };

  const handleSubmit = (e: Event) => {
    const target = e.target as HTMLFormElement | null;
    if (!target) return;
    const trackEvent = target.getAttribute('data-track');
    if (trackEvent) {
      const params: Record<string, unknown> = {};
      for (const key of Object.keys(target.dataset)) {
        if (key.startsWith('track') && key !== 'track') {
          const cleanKey = key
            .replace(/^track/, '')
            .replace(/^[A-Z]/, c => c.toLowerCase())
            .replace(/([A-Z])/g, '_$1')
            .toLowerCase();
          params[cleanKey] = target.dataset[key];
        }
      }
      track(trackEvent, params);
    }
  };

  document.addEventListener('click', handleClick, { passive: true });
  document.addEventListener('submit', handleSubmit, { passive: true });

  return () => {
    document.removeEventListener('click', handleClick);
    document.removeEventListener('submit', handleSubmit);
  };
}
