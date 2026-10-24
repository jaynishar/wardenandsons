import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  validatePhone,
  normalisePhone,
  buildLeadPayload,
  checkHoneypot,
  checkSubmissionSpeed,
  canSubmitLead,
  recordLeadSubmission,
  submitLead,
} from '../leads';
import { ListLine } from '../list-store';

describe('leads module', () => {
  describe('phone validation (validatePhone)', () => {
    it('accepts valid 10-digit Indian mobile numbers starting with 6, 7, 8, 9', () => {
      expect(validatePhone('9920751567')).toBe(true);
      expect(validatePhone('8879012345')).toBe(true);
      expect(validatePhone('7021345678')).toBe(true);
      expect(validatePhone('6123456789')).toBe(true);
    });

    it('accepts numbers with +91 or 91 country code, spaces, and hyphens', () => {
      expect(validatePhone('+91 99207 51567')).toBe(true);
      expect(validatePhone('+91-99207-51567')).toBe(true);
      expect(validatePhone('919920751567')).toBe(true);
      expect(validatePhone('91 99207 51567')).toBe(true);
      expect(validatePhone('+919920751567')).toBe(true);
      expect(validatePhone('09920751567')).toBe(true);
    });

    it('rejects numbers starting with 0-5 (unless 0 is leading trunk before 6-9)', () => {
      expect(validatePhone('5920751567')).toBe(false);
      expect(validatePhone('1234567890')).toBe(false);
      expect(validatePhone('02223684640')).toBe(false); // Mumbai landline
      expect(validatePhone('23684640')).toBe(false);
    });

    it('rejects numbers with incorrect lengths or invalid characters', () => {
      expect(validatePhone('')).toBe(false);
      expect(validatePhone('992075156')).toBe(false); // 9 digits
      expect(validatePhone('99207515678')).toBe(false); // 11 digits
      expect(validatePhone('99207abcde')).toBe(false);
      expect(validatePhone('++919920751567')).toBe(false);
    });
  });

  describe('phone normalisation (normalisePhone)', () => {
    it('normalises 10-digit number to +91XXXXXXXXXX', () => {
      expect(normalisePhone('9920751567')).toBe('+919920751567');
    });

    it('normalises numbers with spaces, hyphens, and country code to +91XXXXXXXXXX', () => {
      expect(normalisePhone('+91 99207 51567')).toBe('+919920751567');
      expect(normalisePhone('+91-88790-12345')).toBe('+918879012345');
      expect(normalisePhone('91 7021345678')).toBe('+917021345678');
    });

    it('throws on invalid phone numbers', () => {
      expect(() => normalisePhone('12345')).toThrow('Invalid mobile phone number');
      expect(() => normalisePhone('')).toThrow('Invalid mobile phone number');
    });
  });

  describe('payload builder (buildLeadPayload)', () => {
    const mockLines: ListLine[] = [
      {
        id: 'line-1',
        categorySlug: 'boys',
        subSlug: 'shorts-joggers-cargos',
        age: '4-5Y',
        qty: 2,
        note: 'navy blue prefer dark shades',
      },
      {
        id: 'line-2',
        categorySlug: 'newborn',
        subSlug: 'swaddles-blankets',
        age: '0-3M',
        qty: 1,
        note: 'pure white cotton only please',
      },
    ];

    it('builds payload containing only approved fields and normalized phone', () => {
      const payload = buildLeadPayload({
        phone: '99207 51567',
        name: 'Priya Sharma',
        preferredTime: 'Morning',
        lines: mockLines,
        sourcePath: '/shop/boys/',
        utmSource: 'instagram',
        utmCampaign: 'monsoon',
      });

      expect(payload.phone).toBe('+919920751567');
      expect(payload.name).toBe('Priya Sharma');
      expect(payload.preferredTime).toBe('Morning');
      expect(payload.consent).toBe(true);
      expect(payload.source).toBe('/shop/boys/');
      expect(payload.utm_source).toBe('instagram');
      expect(payload.utm_campaign).toBe('monsoon');
      expect(payload.reference).toMatch(/^WS-[A-Z0-9]{5}$/);
      expect(Date.parse(payload.timestamp)).not.toBeNaN();
    });

    it('includes category and sub labels with quantities in summary, but NEVER notes or child ages', () => {
      const payload = buildLeadPayload({
        phone: '9920751567',
        lines: mockLines,
      });

      // Summary must describe items and quantities
      expect(payload.summary).toContain('Shorts, Joggers & Cargos (x2)');
      expect(payload.summary).toContain('Swaddles & Blankets (x1)');

      // Summary and full serialized payload must NEVER contain notes or child ages
      expect(payload.summary).not.toContain('navy blue');
      expect(payload.summary).not.toContain('pure white');
      expect(payload.summary).not.toContain('4-5Y');
      expect(payload.summary).not.toContain('0-3M');

      const fullJson = JSON.stringify(payload);
      expect(fullJson).not.toContain('navy blue');
      expect(fullJson).not.toContain('pure white');
      expect(fullJson).not.toContain('4-5Y');
      expect(fullJson).not.toContain('0-3M');
    });

    it('handles empty inquiry lines gracefully', () => {
      const payload = buildLeadPayload({
        phone: '9920751567',
        lines: [],
      });
      expect(payload.summary).toBe('General callback enquiry');
    });
  });

  describe('honeypot and speed spam protection', () => {
    it('honeypot passes only when empty', () => {
      expect(checkHoneypot('')).toBe(true);
      expect(checkHoneypot(undefined)).toBe(true);
      expect(checkHoneypot('  ')).toBe(true);
      expect(checkHoneypot('http://spam-site.com')).toBe(false);
      expect(checkHoneypot('bot')).toBe(false);
    });

    it('speed rule rejects submissions made under 2 seconds', () => {
      const openedAt = 10000;
      expect(checkSubmissionSpeed(openedAt, 10500)).toBe(false); // 500ms
      expect(checkSubmissionSpeed(openedAt, 11999)).toBe(false); // 1999ms
      expect(checkSubmissionSpeed(openedAt, 12000)).toBe(true);  // exactly 2000ms
      expect(checkSubmissionSpeed(openedAt, 15000)).toBe(true);  // 5000ms
    });
  });

  describe('daily submission rate limiting (canSubmitLead, recordLeadSubmission)', () => {
    let mockStorage: Record<string, string>;
    let storageShim: Storage;

    beforeEach(() => {
      mockStorage = {};
      storageShim = {
        getItem: (key: string) => mockStorage[key] || null,
        setItem: (key: string, val: string) => {
          mockStorage[key] = val;
        },
        removeItem: (key: string) => {
          delete mockStorage[key];
        },
        clear: () => {
          mockStorage = {};
        },
        key: () => null,
        length: 0,
      };
    });

    it('allows up to 3 submissions per day, then disallows further requests', () => {
      expect(canSubmitLead(storageShim)).toEqual({ allowed: true, remaining: 3 });

      recordLeadSubmission(storageShim);
      expect(canSubmitLead(storageShim)).toEqual({ allowed: true, remaining: 2 });

      recordLeadSubmission(storageShim);
      expect(canSubmitLead(storageShim)).toEqual({ allowed: true, remaining: 1 });

      recordLeadSubmission(storageShim);
      expect(canSubmitLead(storageShim)).toEqual({ allowed: false, remaining: 0 });
    });

    it('resets limit on a new day', () => {
      // Simulate yesterday's 3 submissions
      storageShim.setItem(
        'ws_lead_submissions_v1',
        JSON.stringify({ date: '2026-10-23', count: 3 }),
      );

      // Today should be allowed
      expect(canSubmitLead(storageShim)).toEqual({ allowed: true, remaining: 3 });
    });
  });

  describe('submitLead (fetch mock)', () => {
    const originalFetch = global.fetch;

    afterEach(() => {
      global.fetch = originalFetch;
    });

    const mockPayload = buildLeadPayload({
      phone: '9920751567',
    });

    it('returns ok: true ONLY when endpoint replies with { ok: true }', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      });

      const result = await submitLead(mockPayload, 'https://example.com/api');
      expect(result).toEqual({ ok: true });
      expect(global.fetch).toHaveBeenCalledWith('https://example.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(mockPayload),
      });
    });

    it('returns ok: false when endpoint replies with { ok: false }', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: false, error: 'Invalid consent' }),
      });

      const result = await submitLead(mockPayload, 'https://example.com/api');
      expect(result.ok).toBe(false);
    });

    it('returns ok: false when endpoint replies with unexpected schema like { success: true } without ok: true', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      const result = await submitLead(mockPayload, 'https://example.com/api');
      expect(result.ok).toBe(false);
    });

    it('returns ok: false on HTTP error status (500)', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      const result = await submitLead(mockPayload, 'https://example.com/api');
      expect(result.ok).toBe(false);
      expect(result.error).toBe('HTTP 500');
    });

    it('returns ok: false on network error / fetch rejection', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));

      const result = await submitLead(mockPayload, 'https://example.com/api');
      expect(result.ok).toBe(false);
      expect(result.error).toBe('Failed to fetch');
    });

    it('returns ok: false when endpoint is not configured', async () => {
      const prevEnv = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;
      delete process.env.NEXT_PUBLIC_LEADS_ENDPOINT;

      const result = await submitLead(mockPayload);
      expect(result.ok).toBe(false);
      expect(result.error).toBe('Endpoint not configured');

      process.env.NEXT_PUBLIC_LEADS_ENDPOINT = prevEnv;
    });
  });
});
