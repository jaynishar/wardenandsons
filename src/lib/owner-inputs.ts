import ownerInputsData from '@/data/owner-inputs.json';

export interface OwnerInputs {
  replyPromise: string;
}

export const ownerInputs: OwnerInputs = ownerInputsData;

export function getReplyPromise(): string {
  return (ownerInputs.replyPromise || '').trim();
}
