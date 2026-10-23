import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useListStore, safeLocalStorage } from '../list-store';

describe('useListStore', () => {
  beforeEach(() => {
    useListStore.getState().clear();
  });

  it('adds items and retrieves them', () => {
    const success = useListStore.getState().add({
      categorySlug: 'boys',
      subSlug: 'shorts-joggers-cargos',
      age: '4-5Y',
      qty: 2,
      note: 'Soft cotton only',
    });

    expect(success).toBe(true);
    const lines = useListStore.getState().lines;
    expect(lines).toHaveLength(1);
    expect(lines[0].categorySlug).toBe('boys');
    expect(lines[0].subSlug).toBe('shorts-joggers-cargos');
    expect(lines[0].age).toBe('4-5Y');
    expect(lines[0].qty).toBe(2);
    expect(lines[0].note).toBe('Soft cotton only');
  });

  it('merges lines with identical category, subcategory and age', () => {
    useListStore.getState().add({
      categorySlug: 'newborn',
      subSlug: 'swaddles-blankets',
      age: '0-3M',
      qty: 2,
    });

    useListStore.getState().add({
      categorySlug: 'newborn',
      subSlug: 'swaddles-blankets',
      age: '0-3M',
      qty: 3,
    });

    const lines = useListStore.getState().lines;
    expect(lines).toHaveLength(1);
    expect(lines[0].qty).toBe(5);
  });

  it('keeps lines distinct if ages differ', () => {
    useListStore.getState().add({
      categorySlug: 'boys',
      subSlug: 'tshirts-polos',
      age: '2-3Y',
      qty: 1,
    });

    useListStore.getState().add({
      categorySlug: 'boys',
      subSlug: 'tshirts-polos',
      age: '4-5Y',
      qty: 1,
    });

    const lines = useListStore.getState().lines;
    expect(lines).toHaveLength(2);
  });

  it('enforces maximum 30 distinct lines', () => {
    for (let i = 0; i < 30; i++) {
      const added = useListStore.getState().add({
        categorySlug: 'boys',
        subSlug: `item-${i}`,
        age: 'any',
        qty: 1,
      });
      expect(added).toBe(true);
    }

    expect(useListStore.getState().lines).toHaveLength(30);

    // 31st item should be rejected
    const added31 = useListStore.getState().add({
      categorySlug: 'boys',
      subSlug: 'item-31',
      age: 'any',
      qty: 1,
    });
    expect(added31).toBe(false);
    expect(useListStore.getState().lines).toHaveLength(30);
  });

  it('clamps quantities between 1 and 20', () => {
    useListStore.getState().add({
      categorySlug: 'girls',
      subSlug: 'frocks-dresses',
      age: '3-4Y',
      qty: 25, // Should clamp to 20
    });

    const lines = useListStore.getState().lines;
    expect(lines[0].qty).toBe(20);

    const lineId = lines[0].id;
    useListStore.getState().setQty(lineId, 0);
    expect(useListStore.getState().lines[0].qty).toBe(1);

    useListStore.getState().setQty(lineId, 99);
    expect(useListStore.getState().lines[0].qty).toBe(20);
  });

  it('clamps merged quantities to 20', () => {
    useListStore.getState().add({
      categorySlug: 'men',
      subSlug: 'cotton-tshirts-polos',
      age: 'L',
      qty: 15,
    });

    useListStore.getState().add({
      categorySlug: 'men',
      subSlug: 'cotton-tshirts-polos',
      age: 'L',
      qty: 10,
    });

    expect(useListStore.getState().lines[0].qty).toBe(20);
  });

  it('truncates notes to 140 characters max', () => {
    const longNote = 'A'.repeat(200);
    useListStore.getState().add({
      categorySlug: 'newborn',
      subSlug: 'bodysuits-jhablas',
      age: '0-3M',
      qty: 1,
      note: longNote,
    });

    const lines = useListStore.getState().lines;
    expect(lines[0].note?.length).toBe(140);

    const lineId = lines[0].id;
    useListStore.getState().setNote(lineId, 'B'.repeat(160));
    expect(useListStore.getState().lines[0].note?.length).toBe(140);
  });

  it('handles removal and clearing', () => {
    useListStore.getState().add({
      categorySlug: 'girls',
      subSlug: 'skirts-shorts',
      age: '5-6Y',
      qty: 1,
    });

    const lineId = useListStore.getState().lines[0].id;
    useListStore.getState().remove(lineId);
    expect(useListStore.getState().lines).toHaveLength(0);

    useListStore.getState().add({
      categorySlug: 'girls',
      subSlug: 'skirts-shorts',
      age: '5-6Y',
      qty: 1,
    });
    useListStore.getState().clear();
    expect(useListStore.getState().lines).toHaveLength(0);
  });

  it('resilient against localStorage setItem throws (Safari private quota)', () => {
    const fakeLocalStorage = {
      getItem: vi.fn().mockImplementation(() => {
        throw new Error('SecurityError: blocked');
      }),
      setItem: vi.fn().mockImplementation(() => {
        throw new Error('QuotaExceededError');
      }),
      removeItem: vi.fn().mockImplementation(() => {
        throw new Error('QuotaExceededError');
      }),
    };

    // Temporarily mock global window
    const target = globalThis as unknown as { window?: { localStorage: typeof fakeLocalStorage } };
    target.window = { localStorage: fakeLocalStorage };

    expect(() => {
      safeLocalStorage.setItem('test-key', 'test-value');
      safeLocalStorage.getItem('test-key');
      safeLocalStorage.removeItem('test-key');
    }).not.toThrow();

    delete target.window;
  });
});
