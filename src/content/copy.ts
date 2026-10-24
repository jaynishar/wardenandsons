/**
 * Warden & Sons Official Copy Deck — Redesign V2
 * Sentence case, no eyebrows, concise shopkeeper voice.
 */

export const COPY_DECK = {
  hero: {
    h1: 'Kids Clothes in Kemps Corner, South Mumbai',
    sub: 'Since 1994. Pick what you like and send us your list on WhatsApp.',
    shop: 'Shop',
    chat: 'Chat on WhatsApp',
  },
  categories: {
    heading: 'Shop by category',
    newborn: 'Newborn',
    boys: 'Boys',
    girls: 'Girls',
    men: 'Men',
    women: 'Women',
    uniforms: 'Uniforms & Bulk',
  },
  showcase: {
    heading: 'Garments on offer',
    sub: 'Real cotton basics, cut for comfort.',
    add: 'Add to list',
  },
  how: {
    heading: 'How it works',
    step1Title: 'Pick',
    step1Desc: 'Browse categories and tap plus to build your list.',
    step2Title: 'Send on WhatsApp',
    step2Desc: 'Share your list with us directly from your phone.',
    step3Title: 'We reply with photos and sizes',
    step3Desc: 'We confirm live rack photos and check tape measurements.',
    videoChip: 'Free video call',
  },
  reviews: {
    heading: 'Real reviews',
    googleLink: 'View on Google',
  },
  visit: {
    heading: 'Visit us in Kemps Corner',
    shopName: 'Warden & Sons Kids Wear',
    addressLine1: 'Shop 7, Ground Floor, Haji Habib Building',
    addressLine2: '155/157 August Kranti Marg, Kemps Corner, Mumbai 400036',
    landmark: 'Near St. Stephen’s Church',
    hoursDefault: 'Open daily 9am to 9pm',
    phone: '+91 22 23684640',
    whatsapp: '+91 99207 51567',
    directions: 'Directions on Google Maps',
    call: 'Call store',
    chat: 'Message on WhatsApp',
  },
  footer: {
    signoff: 'Family shop since 1994',
    message: 'Cotton comfort for newborns, kids, and families in South Mumbai.',
    copyright: '© 1994–2026 Warden & Sons Kids Wear. All rights reserved.',
  },
  list: {
    title: 'My list',
    empty: 'Your list is empty. Pick a category to start.',
    send: 'Send list on WhatsApp',
    sentNote: 'WhatsApp opened. Press send there to share your list.',
    clear: 'Clear list',
    call: 'Prefer a call?',
  },
  add: {
    cta: 'Add to list',
    age: 'Age or size',
    notSure: 'Not sure',
    note: 'Note (optional)',
    noteHelp: 'No personal details, please.',
  },
  age: {
    prompt: 'Shopping for?',
    set: 'Showing sizes for {age}',
    change: 'Change',
  },
  search: {
    placeholder: 'Search, e.g. jhabla, nightsuit',
    empty: "Can't find it? Ask us on WhatsApp.",
  },
  call: {
    title: 'Prefer a call?',
    sub: "Leave your number and we'll ring you.",
    consent: 'I agree to be contacted on this number about my enquiry.',
    success: "Thanks. We'll call you soon.",
    fail: "Couldn't save your number. Please message us on WhatsApp instead.",
  },
  chat: {
    greeting: 'Hi! What are you shopping for?',
  },
} as const;

export default COPY_DECK;
