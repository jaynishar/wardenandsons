/**
 * Warden & Sons Kids Wear — Privacy-Preserving Session Attribution System
 * Captures initial inbound traffic source (UTMs & referrer) into sessionStorage.
 * Supplies safe, concise reference tags for WhatsApp enquiries without exposing PII.
 */

export interface SessionAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrerDomain?: string;
  landingPage?: string;
  timestamp: number;
}

const ATTRIBUTION_STORAGE_KEY = 'ws_session_attribution';

/**
 * Initializes and persists attribution on first page load of a session.
 * Does not overwrite existing session attribution on internal link navigation.
 */
export function initSessionAttribution(): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (existing) return; // Keep initial arrival source intact for the whole session

    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || undefined;
    const utmMedium = urlParams.get('utm_medium') || undefined;
    const utmCampaign = urlParams.get('utm_campaign') || undefined;
    const utmContent = urlParams.get('utm_content') || undefined;

    let referrerDomain: string | undefined;
    if (document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        if (refUrl.hostname !== window.location.hostname) {
          referrerDomain = refUrl.hostname.replace(/^www\./, '');
        }
      } catch {
        // invalid referrer URL
      }
    }

    // Only save if there is an external attribution signal or valid landing page
    if (utmSource || utmMedium || utmCampaign || referrerDomain) {
      const data: SessionAttribution = {
        utmSource: utmSource ? sanitizeParam(utmSource) : undefined,
        utmMedium: utmMedium ? sanitizeParam(utmMedium) : undefined,
        utmCampaign: utmCampaign ? sanitizeParam(utmCampaign) : undefined,
        utmContent: utmContent ? sanitizeParam(utmContent) : undefined,
        referrerDomain,
        landingPage: window.location.pathname,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(data));
    }
  } catch {
    // sessionStorage blocked or restricted
  }
}

/**
 * Safely sanitizes string inputs to prevent header/code injection
 */
function sanitizeParam(str: string): string {
  return str.replace(/[^a-zA-Z0-9_\-\.]/g, '').slice(0, 50);
}

/**
 * Returns stored session attribution
 */
export function getSessionAttribution(): SessionAttribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as SessionAttribution;
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Generates a concise, privacy-safe attribution label for WhatsApp messages.
 * Examples:
 * - "Ref: Instagram Bio"
 * - "Ref: WhatsApp Broadcast"
 * - "Ref: Google Search"
 * - "Ref: Direct Website"
 */
export function getWhatsAppAttributionLabel(fallbackSource: string = 'website'): string {
  const attr = getSessionAttribution();
  if (!attr) return fallbackSource;

  const parts: string[] = [];

  if (attr.utmSource) {
    let sourceName = attr.utmSource;
    if (sourceName.toLowerCase() === 'ig' || sourceName.toLowerCase() === 'instagram') {
      sourceName = 'Instagram';
    } else if (sourceName.toLowerCase() === 'fb' || sourceName.toLowerCase() === 'facebook') {
      sourceName = 'Facebook';
    } else if (sourceName.toLowerCase() === 'wa' || sourceName.toLowerCase() === 'whatsapp') {
      sourceName = 'WhatsApp';
    } else if (sourceName.toLowerCase() === 'google') {
      sourceName = 'Google';
    }
    parts.push(sourceName);
  } else if (attr.referrerDomain) {
    if (attr.referrerDomain.includes('google')) parts.push('Google');
    else if (attr.referrerDomain.includes('instagram')) parts.push('Instagram');
    else if (attr.referrerDomain.includes('facebook')) parts.push('Facebook');
    else parts.push(attr.referrerDomain);
  }

  if (attr.utmCampaign) {
    parts.push(attr.utmCampaign);
  } else if (attr.utmMedium && !parts.length) {
    parts.push(attr.utmMedium);
  }

  if (!parts.length) return fallbackSource;
  return parts.join(' ');
}
