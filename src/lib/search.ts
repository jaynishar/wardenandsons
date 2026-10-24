/**
 * Warden & Sons Kids Wear — Client-Side Instant Search Index
 * Powered by MiniSearch over the in-memory catalogue.
 * No prebuilt files needed (~40 subcategory documents).
 */

import MiniSearch, { SearchResult as MiniSearchResult } from 'minisearch';
import { allSubcategories, getCategory, ageOptionsFor, Subcategory } from '@/data/catalogue';

export interface SearchDoc {
  id: string; // `${categorySlug}/${subSlug}`
  subLabel: string;
  categoryLabel: string;
  categorySlug: string;
  subSlug: string;
  searchTerms: string;
  ageOptions: string;
  photo: string | null;
  href: string;
}

export interface SearchResultItem {
  id: string;
  subLabel: string;
  categoryLabel: string;
  categorySlug: string;
  subSlug: string;
  photo: string | null;
  href: string;
  score: number;
}

let miniSearchInstance: MiniSearch<SearchDoc> | null = null;

/**
 * Builds and caches the MiniSearch index over all catalogue subcategories.
 */
export function createSearchIndex(): MiniSearch<SearchDoc> {
  if (miniSearchInstance) {
    return miniSearchInstance;
  }

  const subcategories = allSubcategories();

  const documents: SearchDoc[] = subcategories.map((sub: Subcategory) => {
    const cat = getCategory(sub.categorySlug);
    const categoryLabel = cat?.label || sub.categorySlug;
    const availableAges = ageOptionsFor(sub.categorySlug, sub.slug);

    return {
      id: `${sub.categorySlug}/${sub.slug}`,
      subLabel: sub.label,
      categoryLabel,
      categorySlug: sub.categorySlug,
      subSlug: sub.slug,
      searchTerms: sub.searchTerms.join(' '),
      ageOptions: availableAges.join(' '),
      photo: sub.photo || cat?.photo || null,
      href: `/shop/${sub.categorySlug}/${sub.slug}/`,
    };
  });

  const miniSearch = new MiniSearch<SearchDoc>({
    fields: ['subLabel', 'categoryLabel', 'searchTerms', 'ageOptions'],
    storeFields: [
      'id',
      'subLabel',
      'categoryLabel',
      'categorySlug',
      'subSlug',
      'photo',
      'href',
    ],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      boost: { subLabel: 3 },
    },
  });

  miniSearch.addAll(documents);
  miniSearchInstance = miniSearch;
  return miniSearch;
}

/**
 * Searches the catalogue index and returns ranked items.
 * Do NOT send query or results to analytics.
 */
export function searchCatalogue(
  query: string,
  index?: MiniSearch<SearchDoc>,
): SearchResultItem[] {
  const q = query.trim();
  if (!q) return [];

  const searchIndex = index || createSearchIndex();

  const rawResults: MiniSearchResult[] = searchIndex.search(q, {
    prefix: true,
    fuzzy: 0.2,
    boost: { subLabel: 3 },
  });

  return rawResults.map((r) => ({
    id: r.id,
    subLabel: r.subLabel,
    categoryLabel: r.categoryLabel,
    categorySlug: r.categorySlug,
    subSlug: r.subSlug,
    photo: r.photo,
    href: r.href,
    score: r.score,
  }));
}
