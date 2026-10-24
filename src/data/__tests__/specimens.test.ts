import { describe, it, expect } from 'vitest';
import { SPECIMEN_MAP, CATEGORY_SPECIMENS, getSpecimen } from '../specimens';
import { CATEGORIES, SUBCATEGORIES } from '../catalogue';

describe('Specimen Catalogue Mapping', () => {
  it('covers all 34 catalogue subcategories with valid garments and colors', () => {
    for (const sub of SUBCATEGORIES) {
      const key = `${sub.categorySlug}/${sub.slug}`;
      const specimen = SPECIMEN_MAP[key];
      expect(specimen, `Missing specimen for ${key}`).toBeDefined();
      expect(specimen.garment).toBeTruthy();
      expect(['red', 'blue', 'yellow', 'ink']).toContain(specimen.color);
      expect(specimen.label).toBeTruthy();
    }
  });

  it('covers all top-level categories in CATEGORY_SPECIMENS', () => {
    for (const cat of CATEGORIES) {
      const specimen = CATEGORY_SPECIMENS[cat.slug];
      expect(specimen, `Missing category specimen for ${cat.slug}`).toBeDefined();
      expect(specimen.garment).toBeTruthy();
      expect(['red', 'blue', 'yellow', 'ink']).toContain(specimen.color);
    }
  });

  it('safely falls back for unknown categories and subcategories', () => {
    const fallback = getSpecimen('unknown', 'unknown');
    expect(fallback).toBeDefined();
    expect(fallback.garment).toBe('tshirt');
    expect(fallback.color).toBe('blue');
  });

  it('retrieves correct specimen via getSpecimen helper', () => {
    const jhabla = getSpecimen('newborn', 'bodysuits-jhablas');
    expect(jhabla.garment).toBe('jhabla');
    expect(jhabla.color).toBe('yellow');
    expect(jhabla.photo).toBe('/products/nb-bodysuit.webp');
  });
});
