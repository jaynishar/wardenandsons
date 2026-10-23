import { describe, it, expect } from 'vitest';
import { buildListMessage, getListUrl, MAX_MESSAGE_LENGTH } from '../whatsapp-list';
import { ListLine } from '../list-store';

describe('whatsapp-list message builder', () => {
  it('formats an empty list', () => {
    const msg = buildListMessage([]);
    expect(msg).toBe(
      'Hi Warden & Sons! My list from the website:\n(Sent from the website)'
    );

    const url = getListUrl([]);
    expect(url).toContain('https://wa.me/919920751567?text=');
    expect(decodeURIComponent(url.split('text=')[1])).toBe(msg);
  });

  it('formats a single item list', () => {
    const lines: ListLine[] = [
      {
        id: '1',
        categorySlug: 'boys',
        subSlug: 'shorts-joggers-cargos',
        age: '6-7Y',
        qty: 2,
      },
    ];

    const msg = buildListMessage(lines);
    expect(msg).toBe(
      'Hi Warden & Sons! My list from the website:\n' +
        '1. Boys > Shorts, Joggers & Cargos: age 6-7Y, qty 2\n' +
        '(Sent from the website)'
    );
  });

  it('formats 3 lines with and without notes', () => {
    const lines: ListLine[] = [
      {
        id: '1',
        categorySlug: 'boys',
        subSlug: 'shorts-joggers-cargos',
        age: '6-7Y',
        qty: 2,
      },
      {
        id: '2',
        categorySlug: 'newborn',
        subSlug: 'swaddles-blankets',
        age: '0-3M',
        qty: 1,
        note: 'Prefer soft pastel prints',
      },
      {
        id: '3',
        categorySlug: 'girls',
        subSlug: 'dresses-frocks',
        age: 'Not sure',
        qty: 3,
      },
    ];

    const msg = buildListMessage(lines);
    const expected =
      'Hi Warden & Sons! My list from the website:\n' +
      '1. Boys > Shorts, Joggers & Cargos: age 6-7Y, qty 2\n' +
      '2. Newborn > Swaddles & Blankets: 0-3M, qty 1 (note: Prefer soft pastel prints)\n' +
      '3. Girls > Dresses & Frocks: Not sure, qty 3\n' +
      '(Sent from the website)';

    expect(msg).toBe(expected);
  });

  it('properly encodes special characters like &, INR (₹), quotes and newlines in getListUrl', () => {
    const lines: ListLine[] = [
      {
        id: '1',
        categorySlug: 'boys',
        subSlug: 't-shirts-shirts',
        age: '5-6Y',
        qty: 1,
        note: 'Budget ~ ₹500 & "pure cotton"',
      },
    ];

    const url = getListUrl(lines);
    expect(url.startsWith('https://wa.me/919920751567?text=')).toBe(true);

    const query = url.split('text=')[1];
    expect(query).not.toContain(' ');
    expect(query).not.toContain('\n');
    expect(query).not.toContain('&'); // Unencoded '&' would break query string
    expect(query).not.toContain('₹');

    const decoded = decodeURIComponent(query);
    expect(decoded).toContain('Budget ~ ₹500 & "pure cotton"');
    expect(decoded).toContain('1. Boys > T-shirts & Shirts: age 5-6Y, qty 1');
  });

  it('strictly limits messages to 1,200 characters and adds truncation indicator', () => {
    const lines: ListLine[] = [];
    // Generate 30 lines with long notes to easily exceed 1,200 characters
    for (let i = 0; i < 30; i++) {
      lines.push({
        id: `line-${i}`,
        categorySlug: 'boys',
        subSlug: 'shorts-joggers-cargos',
        age: '8-9Y',
        qty: 2,
        note: `Custom tailoring requirement for school uniform item ${i} with specific double stitching on seams`,
      });
    }

    const msg = buildListMessage(lines);
    expect(msg.length).toBeLessThanOrEqual(MAX_MESSAGE_LENGTH);
    expect(msg).toMatch(/\+\d+ more items, I will send them in chat/);
    expect(msg).toContain('(Sent from the website)');
    expect(msg.startsWith('Hi Warden & Sons! My list from the website:\n')).toBe(true);
  });

  it('handles 30 concise lines without exceeding limit', () => {
    const lines: ListLine[] = [];
    for (let i = 0; i < 30; i++) {
      lines.push({
        id: `line-${i}`,
        categorySlug: 'boys',
        subSlug: 'tshirts-polos',
        age: '4-5Y',
        qty: 1,
      });
    }

    const msg = buildListMessage(lines);
    expect(msg.length).toBeLessThanOrEqual(MAX_MESSAGE_LENGTH);
    // If all fit, no truncation text
    if (msg.length <= MAX_MESSAGE_LENGTH && !msg.includes('more items')) {
      expect(msg).toContain('30. Boys > T-Shirts & Polos: age 4-5Y, qty 1');
    } else {
      expect(msg).toMatch(/\+\d+ more items, I will send them in chat/);
    }
  });
});
