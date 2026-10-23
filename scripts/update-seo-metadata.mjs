import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 1. Update Hero.tsx
const heroPath = path.join(process.cwd(), 'src/components/Hero.tsx');
let hero = fs.readFileSync(heroPath, 'utf8');
hero = hero.replace(
  /<h1[^>]*>[\s\r\n]*Breathable Cotton Comfort, Since 1994\.[\s\r\n]*<\/h1>/,
  `<h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest leading-[1.12]">
              Kids Clothes in Kemps Corner, South Mumbai
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-forest/90 font-medium tracking-tight">
              Breathable Cotton Comfort, Since 1994.
            </p>`
);
fs.writeFileSync(heroPath, hero, 'utf8');
console.log('Updated Hero.tsx');

// 2. Helper to replace metadata in page files
function updatePageMetadata(filePath, title, description) {
  const fullPath = path.join(process.cwd(), filePath);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace title: { absolute: ... } or title: ...
  content = content.replace(
    /title:\s*\{\s*absolute:\s*['"][^'"]*['"]\s*\}/,
    `title: { absolute: ${JSON.stringify(title)} }`
  );

  // Replace description: ...
  content = content.replace(
    /description:\s*['"][\s\S]*?['"],\n/m,
    `description: ${JSON.stringify(description)},\n`
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

// Update static pages
updatePageMetadata(
  'src/app/page.tsx',
  'Kids Clothes in Kemps Corner, South Mumbai | Warden & Sons',
  'Buy pure cotton kids clothes in Kemps Corner, South Mumbai since 1994. Browse newborn sets, daily playwear, nightsuits and uniforms on WhatsApp.'
);

updatePageMetadata(
  'src/app/shop/page.tsx',
  'Shop Kids Clothes by Age, Mumbai | Warden & Sons',
  "Browse pure cotton children's clothing organized by age group. Select everyday playwear, sleepwear, and infant essentials to order on WhatsApp."
);

updatePageMetadata(
  'src/app/bulk-orders/page.tsx',
  'School Uniforms & Bulk Orders, South Mumbai | Warden & Sons',
  "Custom school uniforms, sports house t-shirts, and bulk cotton children's clothing in South Mumbai. Get direct WhatsApp quotes and fabric swatches."
);

updatePageMetadata(
  'src/app/visit-us/page.tsx',
  'Visit Our Kids Wear Store, Kemps Corner | Warden & Sons',
  "Visit our children's clothing shop at Kemps Corner, near Pedder Road flyover in South Mumbai. Open daily 9am-9pm for in-store fitting and pickup."
);

updatePageMetadata(
  'src/app/how-it-works/page.tsx',
  'How to Buy Kids Clothes on WhatsApp | Warden & Sons',
  'Build a Request List online, view live rack photos on WhatsApp, and confirm tape measurements before paying. Follow 3 easy steps for home delivery.'
);

updatePageMetadata(
  'src/app/about/page.tsx',
  'About Our Shop: 30 Years in Kemps Corner | Warden & Sons',
  'Dressing South Mumbai families at Kemps Corner since 1994. Learn about our pure cotton fabrics, honest measuring tape sizing, and family service.'
);

updatePageMetadata(
  'src/app/blog/page.tsx',
  'Parenting Guides & Cotton Care Advice | Warden & Sons',
  'Practical parenting guides on pure cotton babywear, kids clothing size charts, gentle fabric care, and local shopping advice in South Mumbai.'
);

updatePageMetadata(
  'src/app/contact/page.tsx',
  'Contact Our Kemps Corner Store Desk | Warden & Sons',
  'Get in touch with our Kemps Corner store counter in South Mumbai. Ask sizing questions, check current rack stock, or message our team on WhatsApp.'
);

updatePageMetadata(
  'src/app/size-guide/page.tsx',
  'Kids Clothes Size Chart by Age (0-16Y) | Warden & Sons',
  "Accurate children's clothing size chart by age, chest, and height (0-16Y). Compare sizes or message our Kemps Corner shop desk for counter measurements."
);

updatePageMetadata(
  'src/app/shipping-returns/page.tsx',
  'Delivery, Store Pickup & Size Exchanges | Warden & Sons',
  'Mumbai doorstep delivery, store pickup at Kemps Corner, and straightforward size exchanges. Read our simple fulfillment terms and WhatsApp support.'
);

updatePageMetadata(
  'src/app/privacy-policy/page.tsx',
  'Customer Privacy Policy & WhatsApp Care | Warden & Sons',
  'Read the customer privacy policy of Warden & Sons Kids Wear. How we protect your personal contact details, phone numbers, and WhatsApp enquiries.'
);

updatePageMetadata(
  'src/app/terms/page.tsx',
  'Shop Policies & WhatsApp Order Terms | Warden & Sons',
  'Read the terms of service for Warden & Sons Kids Wear in Kemps Corner. Guidelines on catalogue requests, pricing, deliveries, and size exchanges.'
);

// 3. Update Category Editorials in src/app/shop/[category]/page.tsx
const catPath = path.join(process.cwd(), 'src/app/shop/[category]/page.tsx');
let catContent = fs.readFileSync(catPath, 'utf8');

const CATEGORIES = {
  newborn: {
    titleTag: 'Newborn Baby Clothes & Swaddles Mumbai | Warden & Sons',
    metaDesc: 'Breathable combed cotton jhablas, onesies, rompers, and muslin swaddles for babies 0-24M. Request live photos from our Kemps Corner store racks.',
  },
  boys: {
    titleTag: "Boys' Clothes, 0-16 Years, Mumbai | Warden & Sons",
    metaDesc: 'Durable combed cotton t-shirts, cargo shorts, cricket whites, and nightsuits for boys 0-16 years. Check counter tape sizing directly on WhatsApp.',
  },
  girls: {
    titleTag: "Girls' Clothes, 0-16 Years, Mumbai | Warden & Sons",
    metaDesc: 'Breathable cotton frocks, daily casual tops, leggings, and notched-collar nightsuits for girls 0-16 years. View current shop racks on WhatsApp.',
  },
  men: {
    titleTag: "Men's Cotton Loungewear & Basics | Warden & Sons",
    metaDesc: 'Comfortable combed cotton crewneck t-shirts, lounge shorts, and woven pajama sets for men. Message our Kemps Corner shop desk for measurements.',
  },
  women: {
    titleTag: "Women's Muslin Sleepwear & Basics | Warden & Sons",
    metaDesc: 'Soft double-gauze muslin pajama sets, breathable cotton tops, and comfortable daily leggings for women. Request live availability on WhatsApp.',
  },
};

for (const [key, val] of Object.entries(CATEGORIES)) {
  const blockRegex = new RegExp(`(${key}:\\s*\\{[\\s\\S]*?titleTag:\\s*)['"][^'"]*['"]([\\s\\S]*?metaDesc:\\s*)['"][\\s\\S]*?['"]`, 'm');
  catContent = catContent.replace(blockRegex, `$1${JSON.stringify(val.titleTag)}$2${JSON.stringify(val.metaDesc)}`);
}

fs.writeFileSync(catPath, catContent, 'utf8');
console.log('Updated Category Editorials');

// 4. Update Blog Posts
const blogUpdates = {
  'baby-swaddling-blankets-bathrobes.mdx': {
    metaTitle: 'Baby Swaddle & Bathrobes Guide | Warden & Sons',
    metaDescription: "Learn how to choose the right baby swaddle blankets, wraps, and soft hooded bathrobes for Mumbai's climate from Warden & Sons Kids Wear Kemps Corner.",
  },
  'best-sportswear-kids-guide.mdx': {
    metaTitle: 'Kids Sportswear & Cricket Whites Guide | Warden & Sons',
    metaDescription: 'Find the best sportswear for kids in Mumbai. Compare breathable dryfit jerseys, pure cotton sets, and academy cricket whites from Warden & Sons.',
  },
  'boys-vs-girls-nightwear-fabrics.mdx': {
    metaTitle: 'Kids Nightwear Fabrics Guide | Warden & Sons',
    metaDescription: "Compare combed cotton, soft hosiery, and airy muslin sleepwear for children in Mumbai's climate. Tips on choosing breathable nightwear for sleep.",
  },
  'custom-matching-family-outfits-festivals.mdx': {
    metaTitle: 'Matching Family Festival Outfits | Warden & Sons',
    metaDescription: 'Plan coordinated family outfits and custom festival sets in pure cotton. Learn about group orders, sizing support, and timelines at Warden & Sons.',
  },
  'how-to-buy-kids-clothes-whatsapp.mdx': {
    metaTitle: 'WhatsApp Kids Clothing Shopping Guide | Warden & Sons',
    metaDescription: 'Step-by-step guide to buying quality kids clothing on WhatsApp from Warden & Sons Kemps Corner. Personalized rack photos, measurements, and delivery.',
  },
  'innerwear-basics-guide-cotton.mdx': {
    metaTitle: 'Cotton Innerwear & Basics Guide | Warden & Sons',
    metaDescription: 'Learn about fabric quality in daily essentials. Discover why 180 GSM combed cotton keeps you cool and find quality cotton basics at Warden & Sons.',
  },
  'kemps-corner-shopping-guide.mdx': {
    metaTitle: 'Kemps Corner Family Shopping Guide | Warden & Sons',
    metaDescription: "Discover family and kids shopping in Kemps Corner, South Mumbai. Neighborhood landmarks, children's clothing boutiques, and stores like Warden & Sons.",
  },
  'kids-clothing-size-chart-guide.mdx': {
    metaTitle: 'Kids Clothing Size & Measuring Guide | Warden & Sons',
    metaDescription: 'Practical advice on measuring children for cotton clothes, avoiding shrinkage issues, and ordering correct sizes with counter tape measurements.',
  },
  'kids-winterwear-guide-mumbai.mdx': {
    metaTitle: 'Kids Winterwear Layering in Mumbai | Warden & Sons',
    metaDescription: "Dress your children comfortably for Mumbai's mild winter months. Practical cotton layering advice, light jackets, and cardigans from Warden & Sons.",
  },
  'newborn-clothing-essentials-mumbai.mdx': {
    metaTitle: 'Newborn Baby Clothes Checklist (0-24M) | Warden & Sons',
    metaDescription: 'Looking for newborn baby clothes in Mumbai? Essential 0-24 months checklist of combed cotton jhablas, onesies, and swaddles from Warden & Sons.',
  },
  'school-uniform-bulk-clothing-mumbai.mdx': {
    metaTitle: 'School Uniform & Bulk Order Guide | Warden & Sons',
    metaDescription: "School uniform orders and custom children's clothing in Mumbai. Fabric durability, colorfast twills, sizing runs, and ordering from Warden & Sons.",
  },
  'video-call-shopping-kids-clothing.mdx': {
    metaTitle: 'Video Call Shopping for Kids Clothes | Warden & Sons',
    metaDescription: "Discover how live video call shopping helps South Bombay parents buy children's clothing. Inspect fabrics, colors, and tape measurements in real time.",
  },
};

const blogDir = path.join(process.cwd(), 'src/content/blog');
for (const [filename, updates] of Object.entries(blogUpdates)) {
  const filePath = path.join(blogDir, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  parsed.data.metaTitle = updates.metaTitle;
  parsed.data.metaDescription = updates.metaDescription;
  const newContent = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated blog: ${filename}`);
}

console.log('All metadata updates completed successfully.');
