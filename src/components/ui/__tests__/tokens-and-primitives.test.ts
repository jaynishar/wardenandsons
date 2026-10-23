import { describe, it, expect } from 'vitest';
import * as icons from '@/components/icons';

describe('Design Tokens & Primitives (Step R1)', () => {
  it('exports all 11 required inline icons', () => {
    const requiredIcons = [
      'IconSearch',
      'IconList',
      'IconMenu',
      'IconClose',
      'IconWhatsApp',
      'IconPhone',
      'IconPin',
      'IconPlus',
      'IconMinus',
      'IconCheck',
      'IconChevron',
    ];

    for (const name of requiredIcons) {
      expect((icons as Record<string, unknown>)[name]).toBeDefined();
      expect(typeof (icons as Record<string, unknown>)[name]).toBe('function');
    }
  });

  it('WCAG contrast calculations verify all text pairs >= 4.5:1', () => {
    function lum(hex: string) {
      const clean = hex.replace('#', '');
      const rgb = [clean.slice(0, 2), clean.slice(2, 4), clean.slice(4, 6)].map((h) => {
        const c = parseInt(h, 16) / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    }

    function ratio(hex1: string, hex2: string) {
      const l1 = lum(hex1);
      const l2 = lum(hex2);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }

    // Required pairs:
    expect(ratio('#16233F', '#FBF7F0')).toBeGreaterThanOrEqual(4.5); // ink on ivory
    expect(ratio('#4A5470', '#FBF7F0')).toBeGreaterThanOrEqual(4.5); // ink-soft on ivory
    expect(ratio('#4A5470', '#F3EDE2')).toBeGreaterThanOrEqual(4.5); // ink-soft on paper
    expect(ratio('#FFFFFF', '#0F7B4F')).toBeGreaterThanOrEqual(4.5); // white on wa
    expect(ratio('#FBF7F0', '#16233F')).toBeGreaterThanOrEqual(4.5); // ivory on ink
    expect(ratio('#2F5FA7', '#FBF7F0')).toBeGreaterThanOrEqual(4.5); // blue on ivory
  });
});
