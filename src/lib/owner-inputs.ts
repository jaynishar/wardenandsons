import ownerInputsData from '@/data/owner-inputs.json';

export interface OwnerInputs {
  replyPromise: string;
  schoolsServed: string[];
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
