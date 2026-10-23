/**
 * Warden & Sons Kids Wear — Pure WhatsApp Request Message Formatting & URL Helpers
 * Pure, side-effect free functions for building enquiry messages.
 * Never asserts unverified stock, confirmed price, delivery promises, or payments.
 */

import { RequestItem } from '@/store/cart';
import { BUSINESS_CONFIG } from '@/config/business';
import { getWhatsAppAttributionLabel } from './attribution';

export interface WhatsAppMessageOptions {
  items: RequestItem[];
  customerName?: string;
  notes?: string;
  pickupOrDeliveryPreference?: string;
}

/**
 * Maximum safe length for WhatsApp wa.me URLs across mobile web browsers
 */
export const MAX_SAFE_WHATSAPP_MESSAGE_LENGTH = 1800;

export const VIDEO_CALL_MESSAGE =
  "Hi Warden & Sons, I'd like a video call to see options for my child (age: ). Please tell me a good time.";

export function buildVideoCallUrl(phoneNumber: string = BUSINESS_CONFIG.phone.raw): string {
  const attribution = getWhatsAppAttributionLabel('video call enquiry');
  const messageWithRef = `${VIDEO_CALL_MESSAGE}\n\n(Sent from the website, ${attribution})`;
  return buildWhatsAppRequestUrl(messageWithRef, phoneNumber);
}

/**
 * Pure function to format an itemized enquiry message for WhatsApp.
 */
export function formatWhatsAppRequestMessage(options: WhatsAppMessageOptions): string {
  const { items, customerName, notes, pickupOrDeliveryPreference } = options;
  const attributionTag = getWhatsAppAttributionLabel('request list');

  if (!items || items.length === 0) {
    return `Hello Warden & Sons Kids Wear! I would like to enquire about your catalogue.\n\n(Sent from the website, ${attributionTag})`;
  }

  const lines: string[] = [
    'Hello Warden & Sons Kids Wear!',
    '',
    'I would like to enquire about the following items from your catalogue:',
    '',
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    if (item.quantity > 1) {
      lines.push(`   Quantity: ${item.quantity}`);
    }
    if (item.ageGroup && item.ageGroup.trim()) {
      lines.push(`   Age / Group: ${item.ageGroup.trim()}`);
    }
    if (item.size && item.size.trim()) {
      lines.push(`   Size: ${item.size.trim()}`);
    }
    if (item.preferredColor && item.preferredColor.trim()) {
      lines.push(`   Preferred colour/style: ${item.preferredColor.trim()}`);
    }
    if (item.styleNotes && item.styleNotes.trim()) {
      lines.push(`   Notes: ${item.styleNotes.trim()}`);
    }
    lines.push('');
  });

  // Optional line for parent to fill in child's age/height
  lines.push("Child's age/height: ");
  lines.push('');

  if (customerName && customerName.trim()) {
    lines.push(`Customer Name: ${customerName.trim()}`);
  }
  if (pickupOrDeliveryPreference && pickupOrDeliveryPreference.trim()) {
    lines.push(`Preference: ${pickupOrDeliveryPreference.trim()}`);
  }
  if (notes && notes.trim()) {
    lines.push(`Additional requirements: ${notes.trim()}`);
  }

  lines.push('');
  lines.push(
    'Please share suitable available options with photographs, and confirm current pricing and availability.',
  );
  lines.push('');
  lines.push('Thank you!');
  lines.push('');
  lines.push(`(Sent from the website, ${attributionTag})`);

  const fullMessage = lines.join('\n');

  // Long-list size guard to avoid URL breakage in mobile browsers
  if (fullMessage.length > MAX_SAFE_WHATSAPP_MESSAGE_LENGTH) {
    const truncatedNote = `\n\n[Note: Request truncated due to WhatsApp message size limit (${items.length} items total). Please see primary selections above.]\n\n(Sent from the website, ${attributionTag})`;
    return (
      fullMessage.slice(0, MAX_SAFE_WHATSAPP_MESSAGE_LENGTH - truncatedNote.length) + truncatedNote
    );
  }

  return fullMessage;
}

/**
 * Pure function to build a properly encoded WhatsApp URL.
 */
export function buildWhatsAppRequestUrl(
  message: string,
  phoneNumber: string = BUSINESS_CONFIG.phone.raw,
): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
