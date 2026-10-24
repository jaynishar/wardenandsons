import fs from 'fs';

const descriptions = {
  'newborn/bodysuits-jhablas': 'Pure combed cotton jhablas, wrap vests, and snap infant bodysuits for newborns 0-24M. Enquire on WhatsApp for live photos from our Kemps Corner store.',
  'newborn/rompers-sleepsuits': 'Breathable muslin daytime rompers and two-way zipper sleepsuits for babies 0-24M. Enquire on WhatsApp for live photos from our Kemps Corner store desk.',
  'newborn/swaddles-blankets': 'Double-gauze breathable muslin swaddles and soft cotton receiving blankets for babies. Enquire on WhatsApp for live photos from our Kemps Corner store.',
  'newborn/bath-towels': 'Plush combed cotton hooded baby bath towels and gentle face washcloth sets for infants. Enquire on WhatsApp for live photos from our Kemps Corner shop.',
  'newborn/caps-mittens-booties': 'Soft scratch-prevention mittens, ribbed newborn knot caps, booties, and bandana bibs. Enquire on WhatsApp for live photos from our Kemps Corner boutique.',
  'boys/t-shirts-shirts': 'Heavy-duty combed cotton daily tees, polo collars, and casual woven shirts for boys 0-16Y. Enquire on WhatsApp for tape sizing from Kemps Corner.',
  'boys/shorts-joggers-cargos': 'Reinforced cotton twill cargo shorts, durable play joggers, and drawstring casual shorts for boys. Enquire on WhatsApp for tape sizing from Kemps Corner.',
  'boys/jeans-trousers': 'Comfort-stretch denim jeans, soft cotton chinos, and smart trousers for boys 0-16 years. Enquire on WhatsApp for flat tape sizing from Kemps Corner.',
  'boys/nightwear': 'Two-piece combed hosiery cotton nightsuits, lounge shorts, and breathable sleep pants for boys. Enquire on WhatsApp for tape sizing from Kemps Corner.',
  'boys/sportswear-cricket-whites': 'Dryfit sports coordinates and school academy match cricket whites for boys 0-16 years. Enquire on WhatsApp for flat measurements from Kemps Corner.',
  'boys/hoodies-jackets': 'Lightweight French terry zipper hoodies, denim overshirts, and travel jackets for boys 0-16Y. Enquire on WhatsApp for measurements from Kemps Corner.',
  'boys/thermals-innerwear-socks': 'Tagless pure cotton briefs, ribbed vests, winter thermals, and cushioned sports socks for boys. Enquire on WhatsApp for tape sizing from Kemps Corner.',
  'boys/swimwear': 'Chlorine-resistant boys swim shorts, rash guards, and UV protective swimming sets for 0-16Y. Enquire on WhatsApp for live sizes from Kemps Corner.',
  'girls/dresses-frocks': 'Breezy cotton cambric frocks, pure muslin summer dresses, and lined party frocks for girls 0-16Y. Enquire on WhatsApp for live photos from Kemps Corner.',
  'girls/tops': 'Frilled cotton voile tops, casual tunics, and comfortable daily knit t-shirts for girls 0-16Y. Enquire on WhatsApp for measurements from Kemps Corner.',
  'girls/leggings-tights': 'Four-way stretch cotton lycra ankle leggings, cycling shorts, and daily slip shorts for girls. Enquire on WhatsApp for tape sizing from Kemps Corner.',
  'girls/nightwear': 'Notched-collar buttoned pajama sets, soft hosiery nightsuits, and sleep dresses for girls 0-16Y. Enquire on WhatsApp for tape sizing from Kemps Corner.',
  'girls/hoodies-jackets': 'Soft pre-washed denim shackets, cotton cardigans, and lightweight travel hoodies for girls 0-16Y. Enquire on WhatsApp for sizing from Kemps Corner.',
  'girls/innerwear-socks': 'Soft cotton camisoles, bloomers, seamless slips, frill socks, and daily ankle socks for girls. Enquire on WhatsApp for tape sizing from Kemps Corner.',
  'girls/sportswear': 'Breathable dryfit active sports sets, track pants, and comfortable cycling shorts for girls 0-16Y. Enquire on WhatsApp for sizing from Kemps Corner.',
  'girls/swimwear': 'UV protective swimming frocks, one-piece swimsuits, and rash guard swimwear sets for girls 0-16Y. Enquire on WhatsApp for sizes from Kemps Corner.',
  'men/innerwear': 'Combed cotton tagless vests, classic briefs, and comfortable woven cotton boxers in sizes S-XXL. Enquire on WhatsApp for tape sizing from Kemps Corner.',
  'men/t-shirts': 'Heavyweight 200 GSM combed cotton crew-neck tees and everyday plain solid t-shirts in sizes S-XXL. Enquire on WhatsApp for sizing from Kemps Corner.',
  'men/shorts-track-pants': 'Double-knit cotton lounge shorts, interlock track pants, and breathable home trousers in sizes S-XXL. Enquire on WhatsApp for tape sizing from store.',
  'men/gym-wear': 'Moisture-wicking dryfit t-shirts, workout shorts, and flexible gym training apparel in sizes S-XXL. Enquire on WhatsApp for sizing from Kemps Corner.',
  'men/thermals': 'Warm ribbed cotton-rich thermal tops, long johns, and winter base layers in adult sizes S to XXL. Enquire on WhatsApp for sizing from Kemps Corner.',
  'men/socks-handkerchiefs': 'Fine woven cotton handkerchiefs, formal dress socks, and cushioned sports ankle socks for men. Enquire on WhatsApp for live stock from Kemps Corner.',
  'women/nightsuits': 'Double-gauze muslin buttoned pajama sets, notched-collar nightsuits, and sleep shirts for women. Enquire on WhatsApp for tape sizing from Kemps Corner.',
  'women/leggings-tights': 'Four-way stretch cotton ankle-length leggings, daily churidars, and slip shorts in sizes S to XXL. Enquire on WhatsApp for sizing from Kemps Corner.',
  'women/tops-kaftans': 'Airy cotton muslin kaftans, casual summer tunics, and comfortable daily tops in sizes S to XXL. Enquire on WhatsApp for tape sizing from Kemps Corner.',
  'women/t-shirts': 'Soft combed cotton crewneck t-shirts, relaxed daily casual tees, and lounge tops in sizes S to XXL. Enquire on WhatsApp for sizing from Kemps Corner.',
  'women/gym-wear': 'Flexible yoga pants, cycling shorts, dryfit sports tops, and workout basics in adult sizes S to XXL. Enquire on WhatsApp for sizing from Kemps Corner.',
  'women/innerwear': 'Anti-chafing slip shorts, breathable cotton camisoles, slips, and everyday inner basics in S-XXL. Enquire on WhatsApp for sizing from Kemps Corner.',
  'women/socks-thermals': 'Soft cotton everyday ankle socks, winter thermal tops, and thermal leggings in adult sizes S to XXL. Enquire on WhatsApp for sizing from Kemps Corner.',
};

let content = fs.readFileSync('src/data/catalogue.ts', 'utf8');

for (const [key, text] of Object.entries(descriptions)) {
  const [cat, sub] = key.split('/');
  // Match subcategory by finding categorySlug and slug, then find the seoDescription in that block
  const blockRegex = new RegExp(
    `(\\{[\\s\\S]*?categorySlug:\\s*['"]${cat}['"][\\s\\S]*?slug:\\s*['"]${sub}['"][\\s\\S]*?seoDescription:\\s*\\r?\\n?\\s*)['"][^'"]+['"]`,
    'g'
  );

  if (!blockRegex.test(content)) {
    console.error(`Pattern not found for ${key}`);
    process.exit(1);
  }
  content = content.replace(blockRegex, `$1'${text}'`);
}

fs.writeFileSync('src/data/catalogue.ts', content, 'utf8');
console.log('Updated all 34 subcategory descriptions in src/data/catalogue.ts successfully!');
