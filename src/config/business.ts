/**
 * Warden & Sons Kids Wear — Central Business Configuration
 * Central source of truth for business contact details, locations,
 * opening hours, and WhatsApp messaging protocols.
 */

export const BUSINESS_CONFIG = {
  name: 'Warden & Sons Kids Wear',
  legalName: 'Warden & Sons',
  tagline: 'Quality Kidswear & Cotton Essentials in South Mumbai',

  /**
   * ESTABLISHMENT YEAR AUDIT NOTE:
   * Historical project materials cite both 1994 and 1995.
   * Until owner provides documented incorporation proof,
   * we do not assert a disputed single year as fact.
   * We use the truthful, undisputed representation:
   * "Serving South Mumbai families for over 30 years".
   */
  establishment: {
    status: 'PENDING_OWNER_CONFIRMATION',
    disputedYears: ['1994', '1995'],
    displayText: 'Serving South Mumbai Families For Over 30 Years',
    badgeText: 'Kemps Corner, South Mumbai',
  },

  phone: {
    display: '+91 99207 51567',
    raw: '919920751567',
    telLink: 'tel:+919920751567',
    landline: '+91 22 23684640',
    whatsappUrl: 'https://wa.me/919920751567',
  },

  location: {
    shopNumber: 'Shop No. 7, Ground Floor',
    building: 'Haji Habib Building',
    streetAddress: '155/157 August Kranti Marg (Gowalia Tank Road)',
    neighborhood: 'Kemps Corner',
    area: 'South Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400036',
    country: 'India',
    fullAddress:
      'Shop No. 7, Ground Floor, Haji Habib Building, 155/157 August Kranti Marg, Near St. Stephen’s Church, Kemps Corner, Mumbai, Maharashtra 400036',
    landmarks:
      'Near St. Stephen’s Church, Pedder Road flyover, Altamount Road, Breach Candy, and Nepean Sea Road.',
    geo: {
      latitude: 18.9654,
      longitude: 72.8152,
    },
    googleBusinessProfileUrl: 'https://www.google.com/search?q=warden+and+sons+kids+wear',
    googleBusinessShareUrl: 'https://www.google.com/search?q=warden+and+sons+kids+wear',
    googleMapsSearchUrl:
      'https://maps.google.com/?q=Warden+%26+Sons+Kids+Wear+Shop+No+7+Haji+Habib+Building+Kemps+Corner+Mumbai+400036',
    googleReviewUrl: 'https://g.page/r/CRi_iIq4yd6gEBM/review',
  },

  hours: {
    display: 'Mon – Sun: 9:00 AM – 9:00 PM',
    days: 'Monday through Sunday (Open all 7 days)',
    openTime: '09:00',
    closeTime: '21:00',
    sunday: '9:00 AM – 9:00 PM',
    note: 'Open daily from 9:00 AM to 9:00 PM. WhatsApp enquiries answered during operating hours.',
  },

  businessModel: {
    type: 'Digital Catalogue & WhatsApp Request Builder',
    description:
      'Warden & Sons operates as a physical shop at Kemps Corner. This website is a digital catalogue and enquiry builder. Customers build a request list and send it via WhatsApp. The shop confirms live availability, shares actual photos, provides exact size measurements with a measuring tape, and completes sales directly.',
  },

  whatsappUrl: (message?: string) =>
    message
      ? `https://wa.me/919920751567?text=${encodeURIComponent(message)}`
      : 'https://wa.me/919920751567',
};

/**
 * Generates a clean, well-encoded WhatsApp URL with no empty brackets or undefined fields.
 */
export function buildWhatsAppUrl(message: string, phoneNumber = BUSINESS_CONFIG.phone.raw): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
