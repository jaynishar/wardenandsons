/**
 * Helpers for store operating hours in Indian Standard Time (IST, UTC+5:30)
 */

export interface StoreStatus {
  isOpen: boolean;
  text: string;
  badgeText: string;
}

export function getStoreStatus(now: Date = new Date()): StoreStatus {
  // Convert UTC date to Asia/Kolkata
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '12', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const timeInMinutes = hour * 60 + minute;

    // Operating hours: 9:00 AM (540m) to 9:00 PM (1260m), 7 days a week
    const openTime = 9 * 60; // 09:00
    const closeTime = 21 * 60; // 21:00

    if (timeInMinutes >= openTime && timeInMinutes < closeTime) {
      return {
        isOpen: true,
        text: 'Open now until 9:00 PM',
        badgeText: 'Open now',
      };
    } else if (timeInMinutes < openTime) {
      return {
        isOpen: false,
        text: 'Opens today at 9:00 AM',
        badgeText: 'Opens at 9am',
      };
    } else {
      return {
        isOpen: false,
        text: 'Closed · Opens tomorrow at 9:00 AM',
        badgeText: 'Opens at 9am',
      };
    }
  } catch {
    return {
      isOpen: true,
      text: 'Open daily 9:00 AM – 9:00 PM',
      badgeText: 'Open daily',
    };
  }
}
