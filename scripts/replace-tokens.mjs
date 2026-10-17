import fs from 'fs';
import path from 'path';

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== 'out') {
        walk(fullPath, fileList);
      }
    } else if (/\.(tsx|ts)$/.test(file) && !fullPath.includes('globals.css') && !fullPath.includes('site.ts')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = walk('./src');
console.log(`Found ${files.length} ts/tsx files in src`);

const replacements = [
  // Forest #1B4332
  [/\bbg-\[#1[Bb]4332\]/g, 'bg-forest'],
  [/\btext-\[#1[Bb]4332\]/g, 'text-forest'],
  [/\bborder-\[#1[Bb]4332\]/g, 'border-forest'],
  [/\bfill-\[#1[Bb]4332\]/g, 'fill-forest'],
  [/\bhover:bg-\[#1[Bb]4332\]/g, 'hover:bg-forest'],
  [/\bhover:text-\[#1[Bb]4332\]/g, 'hover:text-forest'],
  [/\bhover:border-\[#1[Bb]4332\]/g, 'hover:border-forest'],
  [/\bafter:bg-\[#1[Bb]4332\]/g, 'after:bg-forest'],
  [/\bhover:after:bg-\[#1[Bb]4332\]/g, 'hover:after:bg-forest'],
  [/\bselection:text-\[#1[Bb]4332\]/g, 'selection:text-forest'],
  [/\bfocus:ring-\[#1[Bb]4332\]/g, 'focus:ring-forest'],
  [/\bgroup-open:text-\[#1[Bb]4332\]/g, 'group-open:text-forest'],

  // Forest Dark #143527
  [/\bhover:bg-\[#143527\]/g, 'hover:bg-forest-dark'],
  [/\bbg-\[#143527\]/g, 'bg-forest-dark'],
  [/\bborder-\[#143527\]/g, 'border-forest-dark'],

  // Gold #D4A574
  [/\btext-\[#D4A574\]\/40/g, 'text-gold/40'],
  [/\btext-\[#D4A574\]/g, 'text-gold'],
  [/\bhover:text-\[#D4A574\]/g, 'hover:text-gold'],
  [/\bbg-\[#D4A574\]\/10/g, 'bg-gold/10'],
  [/\bbg-\[#D4A574\]/g, 'bg-gold'],
  [/\bhover:bg-\[#c59663\]/g, 'hover:bg-gold-hover'],
  [/\bborder-\[#D4A574\]\/40/g, 'border-gold/40'],
  [/\bborder-\[#D4A574\]\/30/g, 'border-gold/30'],
  [/\bborder-\[#D4A574\]\/20/g, 'border-gold/20'],
  [/\bborder-\[#D4A574\]\/50/g, 'border-gold/50'],
  [/\bborder-\[#D4A574\]/g, 'border-gold'],
  [/\bfill-\[#D4A574\]/g, 'fill-gold'],
  [/\bselection:bg-\[#D4A574\]\/30/g, 'selection:bg-gold/30'],

  // Cream #FAF8F5
  [/\bbg-\[#FAF8F5\]\/95/g, 'bg-bg-cream/95'],
  [/\bbg-\[#FAF8F5\]\/50/g, 'bg-bg-cream/50'],
  [/\bbg-\[#FAF8F5\]/g, 'bg-bg-cream'],
  [/\bhover:bg-\[#FAF8F5\]/g, 'hover:bg-bg-cream'],
  [/\bborder-\[#FAF8F5\]/g, 'border-bg-cream'],

  // Soft border #EBE7DF
  [/\bborder-\[#EBE7DF\]\/80/g, 'border-border-soft/80'],
  [/\bborder-\[#EBE7DF\]\/70/g, 'border-border-soft/70'],
  [/\bborder-\[#EBE7DF\]\/60/g, 'border-border-soft/60'],
  [/\bborder-\[#EBE7DF\]/g, 'border-border-soft'],
  [/\bhover:border-\[#EBE7DF\]/g, 'hover:border-border-soft'],
  [/\bdivide-\[#EBE7DF\]/g, 'divide-border-soft'],

  // Near black #1A1A1A
  [/\btext-\[#1A1A1A\]/g, 'text-near-black'],
  [/\bbg-\[#1A1A1A\]/g, 'bg-near-black'],
  [/\bborder-\[#1A1A1A\]/g, 'border-near-black'],
  [/\bhover:text-\[#1A1A1A\]/g, 'hover:text-near-black'],

  // Muted #666666
  [/\btext-\[#666666\]/g, 'text-muted'],

  // WhatsApp #25D366
  [/\bbg-\[#25D366\]\/10/g, 'bg-whatsapp/10'],
  [/\bbg-\[#25D366\]/g, 'bg-whatsapp'],
  [/\bhover:bg-\[#20ba59\]/g, 'hover:bg-whatsapp/90'],
  [/\bhover:bg-\[#25D366\]/g, 'hover:bg-whatsapp'],
  [/\btext-\[#25D366\]/g, 'text-whatsapp'],
  [/\bfill-\[#25D366\]\/20/g, 'fill-whatsapp/20'],
  // Text shades
  [/\btext-\[#444\]/g, 'text-muted'],
  [/\btext-\[#555\]/g, 'text-muted'],
  [/\bhover:text-\[#20ba59\]/g, 'hover:text-whatsapp/90'],
  [/\bfrom-\[#FAF8F5\] to-\[#EFECE6\]/g, 'from-bg-cream to-border-soft/30'],
  [/\bfrom-\[#EFECE6\] to-\[#FAF8F5\]/g, 'from-border-soft/30 to-bg-cream'],
  [/\bfrom-\[#FAF8F5\] to-\[#F3EFEA\]/g, 'from-bg-cream to-border-soft/40'],
];

let totalChanges = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  for (const [re, rep] of replacements) {
    content = content.replace(re, rep);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalChanges++;
    console.log(`Updated tokens in: ${file}`);
  }
}
console.log(`Updated ${totalChanges} files.`);
