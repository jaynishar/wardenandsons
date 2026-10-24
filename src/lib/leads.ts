/**
 * Warden & Sons Kids Wear — Callback Leads & Phone Capture System
 * Privacy-first lead generation submitting to an access-controlled Google Apps Script endpoint.
 * Zero PII is logged to console or sent to analytics.
 */

import { ListLine } from './list-store';
import { getCategory, getSub } from '@/data/catalogue';

export interface LeadPayload {
  phone: string; // +91XXXXXXXXXX
  name?: string;
  preferredTime?: string;
  summary: string;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  reference: string;
  timestamp: string; // ISO 8601 string
  consent: true;
}

export interface BuildLeadParams {
  phone: string;
  name?: string;
  preferredTime?: string;
  lines?: ListLine[];
  sourcePath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const DAILY_LIMIT_KEY = 'ws_lead_submissions_v1';
const MAX_SUBMISSIONS_PER_DAY = 3;
const MIN_SUBMISSION_DELAY_MS = 2000; // 2 seconds minimum interaction time

/**
 * Validates Indian 10-digit mobile numbers starting with 6, 7, 8, or 9.
 * Accepts optional +91 or 91 country code, hyphens, and spaces.
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Allow at most one leading '+', no '+' in other positions
  if (trimmed.includes('+')) {
    if (!trimmed.startsWith('+') || trimmed.indexOf('+', 1) !== -1) {
      return false;
    }
  }

  // Reject any character other than digits, spaces, hyphens, and leading '+'
  if (!/^\+?[\d\s\-]+$/.test(trimmed)) {
    return false;
  }

  // Strip spaces, hyphens, and leading plus sign
  const cleaned = trimmed.replace(/[\s\-\+]/g, '');

  let digits = cleaned;
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    digits = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    digits = cleaned.slice(1);
  }

  return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
}

/**
 * Normalises a valid mobile phone string to +91XXXXXXXXXX format.
 * Throws an Error if phone is invalid.
 */
export function normalisePhone(phone: string): string {
  if (!validatePhone(phone)) {
    throw new Error('Invalid mobile phone number');
  }

  const cleaned = phone.trim().replace(/[\s\-\(\)\+]/g, '');
  let digits = cleaned;
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    digits = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    digits = cleaned.slice(1);
  }

  return `+91${digits}`;
}

/**
 * Builds the strictly scoped lead payload.
 * Spec rule: Category and sub labels with quantities ONLY. NEVER notes, NEVER child ages.
 */
export function buildLeadPayload(params: BuildLeadParams): LeadPayload {
  const normalisedPhone = normalisePhone(params.phone);

  // Build clean summary: "Category > Sub (xQty), ..."
  // Strictly excludes line.note and line.age
  let summary = 'General callback enquiry';
  if (params.lines && params.lines.length > 0) {
    summary = params.lines
      .map((line) => {
        const cat = getCategory(line.categorySlug);
        const sub = getSub(line.categorySlug, line.subSlug);
        const catLabel = cat?.label || line.categorySlug;
        const subLabel = sub?.label || line.subSlug;
        return `${catLabel} > ${subLabel} (x${line.qty})`;
      })
      .join(', ');
  }

  // Short random reference code (e.g., WS-7K8P9)
  const refCode = `WS-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  const payload: LeadPayload = {
    phone: normalisedPhone,
    summary,
    source: params.sourcePath || (typeof window !== 'undefined' ? window.location.pathname : '/list/'),
    reference: refCode,
    timestamp: new Date().toISOString(),
    consent: true,
  };

  if (params.name && params.name.trim()) {
    payload.name = params.name.trim().slice(0, 100);
  }

  if (params.preferredTime && params.preferredTime.trim()) {
    payload.preferredTime = params.preferredTime.trim();
  }

  if (params.utmSource) payload.utm_source = params.utmSource;
  if (params.utmMedium) payload.utm_medium = params.utmMedium;
  if (params.utmCampaign) payload.utm_campaign = params.utmCampaign;

  return payload;
}

/**
 * Honeypot check: If the hidden honeypot input contains any text, reject as spam bot.
 */
export function checkHoneypot(honeypotValue?: string): boolean {
  return !honeypotValue || honeypotValue.trim().length === 0;
}

/**
 * Speed check: Submissions must take at least 2 seconds after form opening.
 */
export function checkSubmissionSpeed(openedAt: number, now: number = Date.now()): boolean {
  return now - openedAt >= MIN_SUBMISSION_DELAY_MS;
}

/**
 * Checks client rate limit of maximum 3 submissions per day in localStorage.
 */
export function canSubmitLead(storage?: Storage): { allowed: boolean; remaining: number } {
  try {
    const s = storage || (typeof window !== 'undefined' ? window.localStorage : null);
    if (!s) return { allowed: true, remaining: MAX_SUBMISSIONS_PER_DAY };

    const today = new Date().toISOString().slice(0, 10);
    const raw = s.getItem(DAILY_LIMIT_KEY);
    if (!raw) return { allowed: true, remaining: MAX_SUBMISSIONS_PER_DAY };

    const parsed = JSON.parse(raw);
    if (parsed.date !== today) {
      return { allowed: true, remaining: MAX_SUBMISSIONS_PER_DAY };
    }

    const count = typeof parsed.count === 'number' ? parsed.count : 0;
    const remaining = Math.max(0, MAX_SUBMISSIONS_PER_DAY - count);
    return {
      allowed: count < MAX_SUBMISSIONS_PER_DAY,
      remaining,
    };
  } catch {
    return { allowed: true, remaining: MAX_SUBMISSIONS_PER_DAY };
  }
}

/**
 * Records a successful submission count for today in localStorage.
 */
export function recordLeadSubmission(storage?: Storage): void {
  try {
    const s = storage || (typeof window !== 'undefined' ? window.localStorage : null);
    if (!s) return;

    const today = new Date().toISOString().slice(0, 10);
    const raw = s.getItem(DAILY_LIMIT_KEY);
    let count = 0;

    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === today && typeof parsed.count === 'number') {
        count = parsed.count;
      }
    }

    s.setItem(
      DAILY_LIMIT_KEY,
      JSON.stringify({
        date: today,
        count: count + 1,
      }),
    );
  } catch {
    // ignore localStorage errors
  }
}

/**
 * Submits lead payload to Google Apps Script endpoint via fetch POST.
 * Uses Content-Type text/plain;charset=utf-8 to avoid CORS preflight options request.
 * Treats outcome as success ONLY when response JSON is strictly { ok: true }.
 */
export async function submitLead(
  payload: LeadPayload,
  endpointOverride?: string,
): Promise<{ ok: boolean; error?: string }> {
  const windowOverride =
    typeof window !== 'undefined'
      ? (window as unknown as { __LEADS_ENDPOINT_OVERRIDE__?: string }).__LEADS_ENDPOINT_OVERRIDE__
      : undefined;

  const endpoint = endpointOverride || windowOverride || process.env.NEXT_PUBLIC_LEADS_ENDPOINT;

  if (!endpoint) {
    return { ok: false, error: 'Endpoint not configured' };
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }

    const data = await res.json();
    if (data && data.ok === true) {
      return { ok: true };
    }

    return { ok: false, error: data?.error || 'Server rejected lead' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { ok: false, error: message };
  }
}
