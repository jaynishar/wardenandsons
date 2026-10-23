import { ListLine } from '@/lib/list-store';
import { getCategory, getSub } from '@/data/catalogue';
import { BUSINESS_CONFIG } from '@/config/business';

export const MAX_MESSAGE_LENGTH = 1200;

/**
 * Formats an age/size label per the spec:
 * e.g. "6-7Y" -> "age 6-7Y, "
 *      "0-3M" -> "0-3M, "
 *      "Not sure" -> "Not sure, "
 */
export function formatAgePart(age?: string): string {
  if (!age || !age.trim()) return '';
  const trimmed = age.trim();

  if (trimmed.toLowerCase().startsWith('age ') || trimmed.toLowerCase().startsWith('size ')) {
    return `${trimmed}, `;
  }

  // Children year sizes: "2-3Y", "4-5Y", etc.
  if (trimmed.includes('Y')) {
    return `age ${trimmed}, `;
  }

  return `${trimmed}, `;
}

/**
 * Converts a ListLine into the exact single-line representation:
 * e.g. "1. Boys > Shorts, Joggers & Cargos: age 6-7Y, qty 2 (note: cotton only)"
 */
export function formatLineText(line: ListLine, index: number): string {
  const cat = getCategory(line.categorySlug);
  const sub = getSub(line.categorySlug, line.subSlug);

  const categoryLabel = cat?.label || line.categorySlug;
  const subLabel = sub?.label || line.subSlug;
  const ageStr = formatAgePart(line.age);
  const noteStr = line.note && line.note.trim() ? ` (note: ${line.note.trim()})` : '';

  return `${index + 1}. ${categoryLabel} > ${subLabel}: ${ageStr}qty ${line.qty}${noteStr}`;
}

/**
 * Builds the WhatsApp inquiry message, strictly adhering to the 1,200 character limit.
 */
export function buildListMessage(lines: ListLine[]): string {
  const header = 'Hi Warden & Sons! My list from the website:';
  const footer = '(Sent from the website)';

  if (!lines || lines.length === 0) {
    return `${header}\n${footer}`;
  }

  const formattedLines = lines.map((line, idx) => formatLineText(line, idx));

  // Check if all lines fit within the limit
  const fullBody = formattedLines.join('\n');
  const fullMessage = `${header}\n${fullBody}\n${footer}`;

  if (fullMessage.length <= MAX_MESSAGE_LENGTH) {
    return fullMessage;
  }

  // If longer than 1,200 characters, keep the first lines that fit
  // and end with "+N more items, I will send them in chat"
  const acceptedLines: string[] = [];

  for (let i = 0; i < formattedLines.length; i++) {
    const candidateLines = [...acceptedLines, formattedLines[i]];
    const remainingCount = formattedLines.length - candidateLines.length;
    const truncationSuffix =
      remainingCount > 0
        ? `\n+${remainingCount} more items, I will send them in chat\n${footer}`
        : `\n${footer}`;

    const candidateMessage = `${header}\n${candidateLines.join('\n')}${truncationSuffix}`;

    if (candidateMessage.length <= MAX_MESSAGE_LENGTH) {
      acceptedLines.push(formattedLines[i]);
    } else {
      break;
    }
  }

  const remaining = formattedLines.length - acceptedLines.length;
  if (acceptedLines.length === 0) {
    return `${header}\n+${remaining} more items, I will send them in chat\n${footer}`;
  }

  return `${header}\n${acceptedLines.join('\n')}\n+${remaining} more items, I will send them in chat\n${footer}`;
}

/**
 * Returns the full wa.me link with the encoded list message.
 */
export function getListUrl(
  lines: ListLine[],
  phoneNumber: string = BUSINESS_CONFIG.phone.raw
): string {
  const message = buildListMessage(lines);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
