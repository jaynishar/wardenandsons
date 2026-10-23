/**
 * Warden & Sons Kids Wear — Privacy & Google Consent Mode v2 System
 * Manages user consent preferences for GDPR, DPDP Act (India), and ePrivacy compliance.
 * Defaults ad tracking to denied and sets analytics storage according to explicit user selection.
 */

export type ConsentChoice = 'all' | 'essential';

export const CONSENT_STORAGE_KEY = 'ws_consent_choice';

export interface ConsentState {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
}

/**
 * Returns saved consent choice from localStorage if present
 */
export function getSavedConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val === 'all' || val === 'essential') {
      return val;
    }
  } catch {
    // LocalStorage blocked or restricted
  }
  return null;
}

/**
 * Applies consent update to Google Consent Mode v2 via gtag
 */
export function updateGoogleConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;

  const state: ConsentState =
    choice === 'all'
      ? {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        }
      : {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Storage restricted
  }

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', state);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(['consent', 'update', state]);
  }

  // Dispatch custom DOM event so reactive UI components can update
  window.dispatchEvent(new CustomEvent('ws:consent_updated', { detail: { choice, state } }));
}
