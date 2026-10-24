/**
 * Warden & Sons Kids Wear — Age Band Store & Helpers
 * Persists user's selected child age band locally on device.
 *
 * PRIVACY SPEC:
 * The age band represents a child's information and must stay strictly on the client device.
 * NEVER send the age band to analytics, server logs, or third-party endpoints.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ageOptionsFor } from '@/data/catalogue';

export type AgeBand =
  | 'newborn'
  | '2-3Y'
  | '4-5Y'
  | '6-7Y'
  | '8-9Y'
  | '10-12Y'
  | '13-16Y'
  | null;

export const AGE_BANDS: Exclude<AgeBand, null>[] = [
  'newborn',
  '2-3Y',
  '4-5Y',
  '6-7Y',
  '8-9Y',
  '10-12Y',
  '13-16Y',
];

export interface AgeStoreState {
  ageBand: AgeBand;
  setAgeBand: (band: AgeBand) => void;
  clearAgeBand: () => void;
}

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};

export const useAgeStore = create<AgeStoreState>()(
  persist(
    (set) => ({
      ageBand: null,
      setAgeBand: (band) => set({ ageBand: band }),
      clearAgeBand: () => set({ ageBand: null }),
    }),
    {
      name: 'warden-age-v1',
      storage: createJSONStorage(() => safeLocalStorage),
    },
  ),
);

/**
 * Determines whether a given subcategory covers the selected age band.
 */
export function subCoversAge(
  categorySlug: string,
  subSlug: string,
  ageBand: AgeBand,
): boolean {
  if (!ageBand) return false;

  if (ageBand === 'newborn') {
    return categorySlug === 'newborn';
  }

  // Adult categories do not cover kids age bands
  if (categorySlug === 'men' || categorySlug === 'women') {
    return false;
  }

  const options = ageOptionsFor(categorySlug, subSlug);
  return options.includes(ageBand);
}

/**
 * Reorders a list of category objects based on selected age band.
 * - For 'newborn': puts 'newborn' first, followed by remaining categories.
 * - For older bands ('2-3Y' to '13-16Y'): puts 'boys' and 'girls' first, then 'newborn', then others.
 */
export function orderCategoriesForAge<T extends { slug: string }>(
  categories: T[],
  ageBand: AgeBand,
): T[] {
  if (!ageBand || categories.length === 0) {
    return categories;
  }

  if (ageBand === 'newborn') {
    const newborn = categories.filter((c) => c.slug === 'newborn');
    const others = categories.filter((c) => c.slug !== 'newborn');
    return [...newborn, ...others];
  }

  // Older bands (2-3Y to 13-16Y)
  const boysAndGirls = categories.filter(
    (c) => c.slug === 'boys' || c.slug === 'girls',
  );
  const others = categories.filter(
    (c) => c.slug !== 'boys' && c.slug !== 'girls',
  );

  return [...boysAndGirls, ...others];
}

/**
 * Returns user-friendly display text for an age band.
 */
export function formatAgeBand(band: AgeBand): string {
  if (!band) return '';
  if (band === 'newborn') return 'Newborn (0–24M)';
  return band;
}
