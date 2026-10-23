import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  CATEGORIES,
  SUBCATEGORIES,
  getCategory,
  getSub,
  subsOf,
  stylesOf,
  allSubcategories,
  ageOptionsFor,
  isReady,
} from './catalogue';
import { CATALOGUE_ITEMS } from '@/lib/products';

describe('Catalogue Data Model (Step R3)', () => {
  it('ensures category slugs are unique', () => {
    const slugs = CATEGORIES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
    expect(slugs).toEqual(['newborn', 'boys', 'girls', 'men', 'women']);
  });

  it('ensures subcategory slugs are unique within each category', () => {
    for (const cat of CATEGORIES) {
      const subs = subsOf(cat.slug);
      const subSlugs = subs.map((s) => s.slug);
      const uniqueSubSlugs = new Set(subSlugs);
      expect(subSlugs.length).toBe(uniqueSubSlugs.size);
    }
  });

  it('verifies every category has the exact sub-categories listed in the spec', () => {
    const expectedSubSlugs: Record<string, string[]> = {
      newborn: [
        'bodysuits-jhablas',
        'rompers-sleepsuits',
        'swaddles-blankets',
        'bath-towels',
        'caps-mittens-booties',
      ],
      boys: [
        't-shirts-shirts',
        'shorts-joggers-cargos',
        'jeans-trousers',
        'nightwear',
        'sportswear-cricket-whites',
        'hoodies-jackets',
        'thermals-innerwear-socks',
        'swimwear',
      ],
      girls: [
        'dresses-frocks',
        'tops',
        'leggings-tights',
        'nightwear',
        'hoodies-jackets',
        'innerwear-socks',
        'sportswear',
        'swimwear',
      ],
      men: [
        'innerwear',
        't-shirts',
        'shorts-track-pants',
        'gym-wear',
        'thermals',
        'socks-handkerchiefs',
      ],
      women: [
        'nightsuits',
        'leggings-tights',
        'tops-kaftans',
        't-shirts',
        'gym-wear',
        'innerwear',
        'socks-thermals',
      ],
    };

    for (const [catSlug, expectedSubs] of Object.entries(expectedSubSlugs)) {
      const actualSubs = subsOf(catSlug).map((s) => s.slug);
      expect(actualSubs).toEqual(expectedSubs);
    }

    expect(allSubcategories().length).toBe(34);
  });

  it('verifies every style in products.ts is mapped or listed as unmapped in docs/redesign/unmapped-styles.md', () => {
    const allProductIds = CATALOGUE_ITEMS.map((item) => item.id);
    expect(allProductIds.length).toBe(28);

    const mappedIds = new Set<string>();
    for (const sub of SUBCATEGORIES) {
      for (const id of sub.styleIds) {
        mappedIds.add(id);
      }
    }

    const unmappedDocPath = path.join(process.cwd(), 'docs', 'redesign', 'unmapped-styles.md');
    expect(fs.existsSync(unmappedDocPath)).toBe(true);
    const unmappedDocContent = fs.readFileSync(unmappedDocPath, 'utf8');

    for (const productId of allProductIds) {
      const isMapped = mappedIds.has(productId);
      const isDocumentedUnmapped = unmappedDocContent.includes(productId);
      expect(
        isMapped || isDocumentedUnmapped,
        `Product style ${productId} must be mapped to a subcategory or documented in unmapped-styles.md`
      ).toBe(true);
    }

    // Exactly 25 mapped, 3 unmapped (cat-mn-04, cat-bk-01, cat-bk-02)
    expect(mappedIds.size).toBe(25);
  });

  it('verifies helper functions behave as expected', () => {
    // getCategory
    expect(getCategory('newborn')?.label).toBe('Newborn');
    expect(getCategory('unknown')).toBeUndefined();

    // getSub
    expect(getSub('boys', 'shorts-joggers-cargos')?.label).toBe('Shorts, Joggers & Cargos');
    expect(getSub('boys', 'unknown')).toBeUndefined();

    // subsOf
    expect(subsOf('girls').length).toBe(8);
    expect(subsOf('invalid').length).toBe(0);

    // stylesOf
    const newbornJhablas = stylesOf('newborn', 'bodysuits-jhablas');
    expect(newbornJhablas.length).toBe(1);
    expect(newbornJhablas[0].id).toBe('cat-nb-01');

    const emptySub = getSub('boys', 'swimwear')!;
    expect(stylesOf(emptySub).length).toBe(0);

    // ageOptionsFor
    expect(ageOptionsFor('boys')).toEqual(['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y', '13-16Y']);
    // Women's tops-kaftans has custom 'Free size'
    expect(ageOptionsFor('women', 'tops-kaftans')).toContain('Free size');
    expect(ageOptionsFor('invalid')).toEqual([]);

    // isReady
    expect(isReady(getSub('newborn', 'bodysuits-jhablas')!)).toBe(true); // Has mapped style
    expect(isReady(getSub('boys', 'swimwear')!)).toBe(false); // No photo and no mapped style yet
  });

  it('verifies generateStaticParams inputs match the tree', () => {
    const params = allSubcategories().map((sub) => ({
      category: sub.categorySlug,
      sub: sub.slug,
    }));

    expect(params.length).toBe(34);
    expect(params).toContainEqual({ category: 'newborn', sub: 'swaddles-blankets' });
    expect(params).toContainEqual({ category: 'boys', sub: 'sportswear-cricket-whites' });
    expect(params).toContainEqual({ category: 'women', sub: 'tops-kaftans' });
  });
});
