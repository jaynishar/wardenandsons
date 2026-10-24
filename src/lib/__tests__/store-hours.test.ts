import { describe, it, expect } from 'vitest';
import { getStoreStatus } from '../store-hours';

describe('Store Hours Status (IST)', () => {
  it('identifies open store during operating hours (e.g. 11:30 AM IST)', () => {
    // 11:30 AM IST = 06:00 AM UTC
    const date = new Date('2026-10-24T06:00:00Z');
    const status = getStoreStatus(date);
    expect(status.isOpen).toBe(true);
    expect(status.text).toContain('Open now');
  });

  it('identifies closed store before 9 AM IST (e.g. 7:00 AM IST)', () => {
    // 07:00 AM IST = 01:30 AM UTC
    const date = new Date('2026-10-24T01:30:00Z');
    const status = getStoreStatus(date);
    expect(status.isOpen).toBe(false);
    expect(status.text).toContain('Opens today at 9:00 AM');
  });

  it('identifies closed store after 9 PM IST (e.g. 10:30 PM IST)', () => {
    // 10:30 PM IST = 05:00 PM UTC
    const date = new Date('2026-10-24T17:00:00Z');
    const status = getStoreStatus(date);
    expect(status.isOpen).toBe(false);
    expect(status.text).toContain('Opens tomorrow at 9:00 AM');
  });
});
