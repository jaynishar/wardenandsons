import { describe, it, expect, beforeEach } from 'vitest';
import { createSearchIndex, searchCatalogue } from '../search';
import {
  useAgeStore,
  subCoversAge,
  orderCategoriesForAge,
} from '../age-store';

describe('Search and Age Filter System', () => {
  describe('Instant Search (MiniSearch over catalogue)', () => {
    const index = createSearchIndex();

    it('finds "jhabla" and returns Newborn Bodysuits & Jhablas as top result', () => {
      const results = searchCatalogue('jhabla', index);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].categorySlug).toBe('newborn');
      expect(results[0].subSlug).toBe('bodysuits-jhablas');
      expect(results[0].subLabel).toBe('Bodysuits & Jhablas');
    });

    it('finds "night suit" and returns nightwear subcategories', () => {
      const results = searchCatalogue('night suit', index);
      expect(results.length).toBeGreaterThan(0);
      const subSlugs = results.map((r) => r.subSlug);
      expect(subSlugs).toContain('nightwear');
    });

    it('finds "cricket whites" and returns Sportswear & Cricket Whites', () => {
      const results = searchCatalogue('cricket whites', index);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].categorySlug).toBe('boys');
      expect(results[0].subSlug).toBe('sportswear-cricket-whites');
    });

    it('supports prefix matching for short queries (e.g. "cric", "jhab")', () => {
      const cricResults = searchCatalogue('cric', index);
      expect(cricResults.some((r) => r.subSlug === 'sportswear-cricket-whites')).toBe(true);

      const jhabResults = searchCatalogue('jhab', index);
      expect(jhabResults.some((r) => r.subSlug === 'bodysuits-jhablas')).toBe(true);
    });

    it('returns empty array on empty or whitespace query', () => {
      expect(searchCatalogue('', index)).toEqual([]);
      expect(searchCatalogue('   ', index)).toEqual([]);
    });
  });

  describe('Age Store (warden-age-v1)', () => {
    beforeEach(() => {
      useAgeStore.getState().clearAgeBand();
    });

    it('defaults to null (no age filter)', () => {
      expect(useAgeStore.getState().ageBand).toBeNull();
    });

    it('updates age band when setAgeBand is called', () => {
      useAgeStore.getState().setAgeBand('4-5Y');
      expect(useAgeStore.getState().ageBand).toBe('4-5Y');

      useAgeStore.getState().setAgeBand('newborn');
      expect(useAgeStore.getState().ageBand).toBe('newborn');
    });

    it('clears age band when clearAgeBand is called', () => {
      useAgeStore.getState().setAgeBand('10-12Y');
      expect(useAgeStore.getState().ageBand).toBe('10-12Y');

      useAgeStore.getState().clearAgeBand();
      expect(useAgeStore.getState().ageBand).toBeNull();
    });
  });

  describe('Badge Logic (subCoversAge)', () => {
    it('returns false for all subcategories when ageBand is null', () => {
      expect(subCoversAge('newborn', 'bodysuits-jhablas', null)).toBe(false);
      expect(subCoversAge('boys', 'shorts-joggers-cargos', null)).toBe(false);
    });

    it('returns true for newborn subcategories when ageBand is "newborn"', () => {
      expect(subCoversAge('newborn', 'bodysuits-jhablas', 'newborn')).toBe(true);
      expect(subCoversAge('newborn', 'swaddles-blankets', 'newborn')).toBe(true);
      expect(subCoversAge('boys', 't-shirts-shirts', 'newborn')).toBe(false);
    });

    it('returns true when subcategory ageOptions include the selected ageBand', () => {
      // Boys & Girls have ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y', '13-16Y']
      expect(subCoversAge('boys', 'shorts-joggers-cargos', '4-5Y')).toBe(true);
      expect(subCoversAge('girls', 'dresses-frocks', '4-5Y')).toBe(true);
      expect(subCoversAge('boys', 'sportswear-cricket-whites', '10-12Y')).toBe(true);

      // Newborn does not cover 4-5Y
      expect(subCoversAge('newborn', 'rompers-sleepsuits', '4-5Y')).toBe(false);

      // Adult categories do not cover kids ages
      expect(subCoversAge('men', 'innerwear', '4-5Y')).toBe(false);
      expect(subCoversAge('women', 'nightsuits', '4-5Y')).toBe(false);
    });
  });

  describe('Tile Ordering Logic (orderCategoriesForAge)', () => {
    const categories = [
      { slug: 'newborn', label: 'Newborn' },
      { slug: 'boys', label: 'Boys' },
      { slug: 'girls', label: 'Girls' },
      { slug: 'men', label: 'Men' },
      { slug: 'women', label: 'Women' },
    ];

    it('preserves default category order when ageBand is null', () => {
      const ordered = orderCategoriesForAge(categories, null);
      expect(ordered.map((c) => c.slug)).toEqual([
        'newborn',
        'boys',
        'girls',
        'men',
        'women',
      ]);
    });

    it('places Newborn first when ageBand is "newborn"', () => {
      const ordered = orderCategoriesForAge(categories, 'newborn');
      expect(ordered[0].slug).toBe('newborn');
      expect(ordered.map((c) => c.slug)).toEqual([
        'newborn',
        'boys',
        'girls',
        'men',
        'women',
      ]);
    });

    it('places Boys and Girls first when ageBand is an older band (e.g. 4-5Y)', () => {
      const ordered = orderCategoriesForAge(categories, '4-5Y');
      const slugs = ordered.map((c) => c.slug);
      expect(slugs.slice(0, 2)).toEqual(['boys', 'girls']);
      expect(slugs[2]).toBe('newborn');
    });
  });
});
