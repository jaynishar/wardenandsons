import fs from 'fs';

const html = fs.readFileSync('out/index.html', 'utf8');

console.log('--- Baseline HTML Audit for out/index.html ---');
const langMatch = html.match(/<html[^>]*lang=["']([^"']*)["']/);
console.log('lang attribute:', langMatch ? langMatch[1] : 'NOT FOUND');

const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/);
console.log('canonical tag:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');

const ogMatches = [...html.matchAll(/<meta[^>]*property=["'](og:[^"']*)["'][^>]*content=["']([^"']*)["']/g)];
console.log('og tags count:', ogMatches.length);
ogMatches.forEach(m => console.log(`  ${m[1]}: ${m[2]}`));

const jsonLdMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gs)];
console.log('JSON-LD blocks count:', jsonLdMatches.length);
jsonLdMatches.forEach((m, i) => console.log(`  block ${i + 1} length:`, m[1].length));

const comMatches = (html.match(/wardenandsons\.com/g) || []).length;
console.log('wardenandsons.com occurrences in index.html:', comMatches);

const ampMatches = (html.match(/&amp;/g) || []).length;
console.log('&amp; occurrences in index.html:', ampMatches);

if (fs.existsSync('out/shop/index.html')) {
  const shopHtml = fs.readFileSync('out/shop/index.html', 'utf8');
  console.log('\n--- Baseline HTML Audit for out/shop/index.html ---');
  console.log('shop canonical:', shopHtml.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/)?.[1] || 'NOT FOUND');
  console.log('shop .com count:', (shopHtml.match(/wardenandsons\.com/g) || []).length);
  console.log('shop &amp; count:', (shopHtml.match(/&amp;/g) || []).length);
}

