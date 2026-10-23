/**
 * Warden & Sons Kids Wear — Central Typed Analytics & Conversion Tracking System
 * Adheres strictly to GA4 recommended event nomenclature, Google Consent Mode v2,
 * and zero-PII data privacy guidelines.
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

/**
 * Low-level dispatch to both GA4 gtag and GTM dataLayer
 */
export function sendAnalyticsEvent(
  eventName: string,
  parameters: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return;

  try {
    // 1. Dispatch via gtag if available
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }

    // 2. Dispatch via GTM dataLayer push
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event] ${eventName}:`, parameters);
    }
  } catch (err) {
    // Fail silently in production, never interrupt user actions
    if (process.env.NODE_ENV === 'development') {
      console.error('[Analytics Error]', err);
    }
  }
}

/**
 * A. Page View Tracking (Client-Side Navigation Safe)
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === 'undefined') return;

  const url = pagePath || window.location.pathname || '/';
  const title = pageTitle || document.title || 'Warden & Sons Kids Wear';

  sendAnalyticsEvent('page_view', {
    page_location: window.location.href,
    page_path: url,
    page_title: title,
  });
}

/**
 * B. WhatsApp Enquiry Tracking (HIGHEST PRIORITY)
 */
export interface WhatsAppClickParams {
  button_location?: string | null;
  category?: string | null;
  product_id?: string | null;
  product_name?: string | null;
  page_path?: string | null;
  enquiry_type?: 'general' | 'product' | 'bulk' | 'video_call' | 'request_list';
  items_count?: number;
}

export function trackWhatsAppClick(params: WhatsAppClickParams): void {
  if (typeof window === 'undefined') return;

  const button_location = normalizeButtonLocation(params.button_location);
  const page_path = params.page_path || window.location.pathname || '/';
  const category = params.category || 'general';
  const enquiry_type = params.enquiry_type || (params.product_id ? 'product' : 'general');

  const payload: Record<string, unknown> = {
    button_location,
    page_path,
    category,
    enquiry_type,
  };

  if (params.product_id) payload.item_id = params.product_id;
  if (params.product_name) payload.item_name = params.product_name;
  if (typeof params.items_count === 'number') payload.items_count = params.items_count;

  // Track the interaction
  sendAnalyticsEvent('whatsapp_click', payload);

  // If this represents a qualifying enquiry, record a qualified lead event
  if (enquiry_type === 'request_list' || enquiry_type === 'bulk') {
    sendAnalyticsEvent('generate_lead', {
      lead_type: enquiry_type,
      category,
      items_count: params.items_count || 1,
    });
  }
}

/**
 * C. Product Catalogue & Discovery Tracking
 */
export function trackViewItemList(category: string, itemCount?: number): void {
  sendAnalyticsEvent('view_item_list', {
    item_list_name: category || 'all_catalogue',
    item_count: itemCount,
  });
}

export function trackSelectItem(product: {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  priceFrom?: number | null;
}): void {
  sendAnalyticsEvent('select_item', {
    item_list_name: product.category,
    items: [
      {
        item_id: product.id,
        item_name: product.title,
        item_category: product.category,
        item_category2: product.subCategory || '',
        price: product.priceFrom || undefined,
      },
    ],
  });
}

export function trackViewItem(product: {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  priceFrom?: number | null;
}): void {
  sendAnalyticsEvent('view_item', {
    items: [
      {
        item_id: product.id,
        item_name: product.title,
        item_category: product.category,
        item_category2: product.subCategory || '',
        price: product.priceFrom || undefined,
      },
    ],
  });
}

/**
 * D. Internal Search Tracking
 */
export function trackSearch(searchQuery: string, resultCount?: number): void {
  if (!searchQuery.trim()) return;
  sendAnalyticsEvent('search', {
    search_term: searchQuery.trim().toLowerCase().slice(0, 100),
    result_count: resultCount,
  });
}

/**
 * E. Request List / Cart Tracking
 */
export function trackAddToCart(item: {
  id: string;
  name: string;
  category: string;
  quantity?: number;
}): void {
  sendAnalyticsEvent('add_to_cart', {
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        quantity: item.quantity || 1,
      },
    ],
  });
}

export function trackRemoveFromCart(item: {
  id: string;
  name?: string;
  category?: string;
}): void {
  sendAnalyticsEvent('remove_from_cart', {
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
      },
    ],
  });
}

export function trackViewCart(itemCount: number): void {
  sendAnalyticsEvent('view_cart', {
    items_count: itemCount,
  });
}

/**
 * F. Local Intent & Offline Conversion Triggers
 */
export function trackDirectionsClick(params: { location?: string } = {}): void {
  sendAnalyticsEvent('get_directions', {
    store_name: 'Warden & Sons Kemps Corner',
    placement: params.location || 'page',
  });
}

export function trackPhoneClick(params: { location?: string } = {}): void {
  sendAnalyticsEvent('phone_click', {
    phone_target: 'store_counter',
    placement: params.location || 'telephone_link',
  });
}

/**
 * G. Form Submissions (Validation Safe — Never logs PII)
 */
export function trackFormSubmit(formName: string, category?: string): void {
  sendAnalyticsEvent('form_submit', {
    form_name: formName,
    category: category || 'general',
  });

  sendAnalyticsEvent('generate_lead', {
    lead_type: formName,
    category: category || 'general',
  });
}
