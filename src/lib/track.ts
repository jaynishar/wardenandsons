/**
 * Warden & Sons Kids Wear — Analytics Event Tracking System
 * Safely pushes typed analytics events to GTM dataLayer using declarative HTML data-attributes.
 * Never logs PII (Personal Identifiable Information) such as phone numbers, customer names, or message text.
 */

export type ButtonLocation =
  | 'header'
  | 'hero'
  | 'product'
  | 'request_list'
  | 'footer'
  | 'sticky_bar'
  | 'video_call';

export const VALID_BUTTON_LOCATIONS: ButtonLocation[] = [
  'header',
  'hero',
  'product',
  'request_list',
  'footer',
  'sticky_bar',
  'video_call',
];

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function normalizeButtonLocation(
  rawLocation?: string | null,
  fallback: ButtonLocation = 'footer',
): ButtonLocation {
  if (!rawLocation) return fallback;
  const loc = rawLocation.toLowerCase().trim();
  if (VALID_BUTTON_LOCATIONS.includes(loc as ButtonLocation)) {
    return loc as ButtonLocation;
  }
  if (loc.includes('head') || loc.includes('nav_top')) return 'header';
  if (loc.includes('hero')) return 'hero';
  if (loc.includes('product') || loc.includes('catalog') || loc.includes('size')) return 'product';
  if (loc.includes('request') || loc.includes('cart')) return 'request_list';
  if (loc.includes('sticky') || loc.includes('bottom') || loc.includes('float')) return 'sticky_bar';
  if (loc.includes('video')) return 'video_call';
  if (loc.includes('foot')) return 'footer';
  return fallback;
}

export function trackWhatsAppClick(params: {
  button_location?: string | null;
  category?: string | null;
  page_path?: string | null;
}): void {
  if (typeof window === 'undefined') return;

  const page_path = params.page_path || window.location.pathname || '/';
  const button_location = normalizeButtonLocation(params.button_location);
  const category = params.category || '';

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'whatsapp_click',
    page_path,
    button_location,
    category,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[Track WhatsApp]', { page_path, button_location, category });
  }
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  if (event === 'whatsapp_click') {
    trackWhatsAppClick({
      button_location: (params.button_location || params.location) as string,
      category: params.category as string,
      page_path: params.page_path as string,
    });
    return;
  }

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
 * Listens for click events on elements with data-track and data-track-* attributes,
 * and automatically captures any clicks on WhatsApp (wa.me) links.
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
      if (eventName === 'whatsapp_click') {
        const rawLoc =
          trackEl.getAttribute('data-track-location') ||
          trackEl.dataset.trackLocation ||
          trackEl.dataset.location;
        const cat =
          trackEl.getAttribute('data-track-category') ||
          trackEl.dataset.trackCategory ||
          trackEl.dataset.category;
        trackWhatsAppClick({
          button_location: rawLoc,
          category: cat,
          page_path: window.location.pathname,
        });
        return;
      }

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

    // 2. Automatic wa.me link detection
    const waLink = target.closest<HTMLAnchorElement>('a[href*="wa.me"]');
    if (waLink) {
      let inferredLocation: ButtonLocation = 'footer';
      if (waLink.closest('header')) inferredLocation = 'header';
      else if (waLink.closest('nav.fixed, aside.fixed, [aria-label*="Quick Request Actions"]'))
        inferredLocation = 'sticky_bar';
      else if (waLink.closest('footer')) inferredLocation = 'footer';
      else if (waLink.closest('.hero, [data-hero]')) inferredLocation = 'hero';

      const rawLoc =
        waLink.getAttribute('data-track-location') ||
        waLink.dataset.trackLocation ||
        waLink.dataset.location ||
        inferredLocation;
      const cat =
        waLink.getAttribute('data-track-category') ||
        waLink.dataset.trackCategory ||
        waLink.dataset.category;

      trackWhatsAppClick({
        button_location: rawLoc,
        category: cat,
        page_path: window.location.pathname,
      });
      return;
    }

    // 3. Automatic tel: link detection
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
