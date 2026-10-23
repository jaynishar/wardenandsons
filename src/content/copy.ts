/**
 * Warden & Sons Official Copy Deck
 * Strictly defined strings per REDESIGN_CONTEXT.md. Do not invent marketing copy.
 */

export const COPY_DECK = {
  hero: {
    sub: 'Since 1994. Pick what you like and send us your list on WhatsApp.',
    shop: 'Shop',
    chat: 'Chat on WhatsApp',
  },
  how: {
    line: 'Pick  ·  Send on WhatsApp  ·  We reply with photos and sizes',
  },
  video: {
    chip: 'Free video call',
  },
  store: {
    line: 'Shop 7, Haji Habib Building, Kemps Corner · Open daily 9am-9pm',
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
