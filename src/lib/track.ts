/**
 * Warden & Sons Kids Wear — Legacy Track Bridge & Declarative Event Listener
 * Backwards-compatible bridge forwarding to the central typed analytics module.
 * Never logs PII (Personal Identifiable Information).
 */

import {
  normalizeButtonLocation,
  trackWhatsAppClick as coreTrackWhatsAppClick,
  trackDirectionsClick,
  trackPhoneClick,
  trackAddToCart,
  trackCallbackLead,
  sendAnalyticsEvent,
  type ButtonLocation,
  VALID_BUTTON_LOCATIONS,
} from './analytics';

export { normalizeButtonLocation, VALID_BUTTON_LOCATIONS, type ButtonLocation, trackCallbackLead };

export function trackWhatsAppClick(params: {
  button_location?: string | null;
  category?: string | null;
  page_path?: string | null;
  product_id?: string | null;
  product_name?: string | null;
}): void {
  coreTrackWhatsAppClick(params);
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (event === 'whatsapp_click') {
    coreTrackWhatsAppClick({
      button_location: (params.button_location || params.location) as string,
      category: params.category as string,
      page_path: params.page_path as string,
      product_id: params.product_id as string,
      product_name: params.product_name as string,
    });
    return;
  }

  if (event === 'directions_click' || event === 'get_directions') {
    trackDirectionsClick({ location: (params.location || params.placement) as string });
    return;
  }

  if (event === 'call_click' || event === 'phone_click') {
    trackPhoneClick({ location: (params.location || params.placement) as string });
    return;
  }

  sendAnalyticsEvent(event, params);
}

/**
 * Initializes global event delegation for declarative tracking.
 * Listens for click events on elements with data-track attributes,
 * and automatically captures clicks on WhatsApp (wa.me), Google Maps, and telephone links.
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
        const productId = trackEl.dataset.trackProductId;
        const productName = trackEl.dataset.trackProductName;
        const itemsCount = trackEl.dataset.trackItemsCount
          ? parseInt(trackEl.dataset.trackItemsCount, 10)
          : undefined;

        coreTrackWhatsAppClick({
          button_location: rawLoc,
          category: cat,
          product_id: productId,
          product_name: productName,
          page_path: window.location.pathname,
          items_count: itemsCount,
        });
        return;
      }

      if (eventName === 'directions_click') {
        const loc =
          trackEl.getAttribute('data-track-location') ||
          trackEl.dataset.trackLocation ||
          'visit_us_page';
        trackDirectionsClick({ location: loc });
        return;
      }

      if (eventName === 'call_click') {
        const loc =
          trackEl.getAttribute('data-track-location') ||
          trackEl.dataset.trackLocation ||
          'store_header';
        trackPhoneClick({ location: loc });
        return;
      }

      if (eventName === 'add_to_request') {
        const cat = trackEl.getAttribute('data-track-category') || '';
        const itemName = trackEl.getAttribute('data-track-item') || '';
        trackAddToCart({
          id: itemName,
          name: itemName,
          category: cat,
        });
        return;
      }

      // Ignore generic form submit attribute on clicks (handled safely by onSubmit)
      if (eventName === 'bulk_form_submit' || eventName === 'contact_form_submit') {
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

      coreTrackWhatsAppClick({
        button_location: rawLoc,
        category: cat,
        page_path: window.location.pathname,
      });
      return;
    }

    // 3. Automatic directions / Google Maps link detection
    const mapsLink = target.closest<HTMLAnchorElement>(
      'a[href*="maps.google"], a[href*="goo.gl/maps"], a[href*="maps.app.goo.gl"]',
    );
    if (mapsLink && !mapsLink.hasAttribute('data-track')) {
      trackDirectionsClick({ location: 'maps_external_link' });
      return;
    }

    // 4. Automatic tel: link detection
    const telLink = target.closest<HTMLAnchorElement>('a[href^="tel:"]');
    if (telLink && !telLink.hasAttribute('data-track')) {
      trackPhoneClick({ location: 'telephone_link' });
      return;
    }
  };

  document.addEventListener('click', handleClick, { passive: true });

  return () => {
    document.removeEventListener('click', handleClick);
  };
}
