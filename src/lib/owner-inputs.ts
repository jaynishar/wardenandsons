import ownerInputsData from '@/data/owner-inputs.json';

export interface OwnerInputs {
  replyPromise: string;
  schoolsServed: string[];
  authorName?: string | null;
  authorBio?: string | null;
  categoryPriceFrom: Record<string, number | null>;
  productPriceFrom: Record<string, number | null>;
}

export const ownerInputs: OwnerInputs = ownerInputsData as OwnerInputs;

export function getReplyPromise(): string {
  return (ownerInputs.replyPromise || '').trim();
}

export function getSchoolsServed(): string[] {
  return ownerInputs.schoolsServed || [];
}

export function getCategoryPriceFrom(categorySlug: string): number | null {
  if (!ownerInputs.categoryPriceFrom) return null;
  return ownerInputs.categoryPriceFrom[categorySlug] ?? null;
}

export function getProductPriceFrom(productId: string): number | null {
  if (!ownerInputs.productPriceFrom) return null;
  return ownerInputs.productPriceFrom[productId] ?? null;
}

export function getAuthorBox(): { name: string; bio: string } | null {
  const name = (ownerInputs.authorName || '').trim();
  const bio = (ownerInputs.authorBio || '').trim();
  if (!name || !bio) return null;
  return { name, bio };
}
