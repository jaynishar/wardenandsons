import fs from 'fs';

const html = fs.readFileSync('out/index.html', 'utf8');

// 1. H1 count
const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
console.log('H1 Count:', h1Matches.length);
h1Matches.forEach((m, i) => {
  console.log(`H1 [${i}]: "${m.replace(/<[^>]+>/g, '').trim()}"`);
});

// 2. Title
const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');

// 3. Description
const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
console.log('Description:', descMatch ? descMatch[1] : 'NONE');

// 4. Canonical
const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["']/i);
console.log('Canonical:', canonMatch ? canonMatch[1] : 'NONE');

// 5. OG tags
const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([\s\S]*?)["']/i);
const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([\s\S]*?)["']/i);
const ogUrl = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([\s\S]*?)["']/i);
console.log('OG Title:', ogTitle ? ogTitle[1] : 'NONE');
console.log('OG Description:', ogDesc ? ogDesc[1] : 'NONE');
console.log('OG URL:', ogUrl ? ogUrl[1] : 'NONE');

// 6. JSON-LD
const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = jsonLdRegex.exec(html)) !== null) {
  count++;
  try {
    const parsed = JSON.parse(match[1]);
    console.log(`JSON-LD [${count}]:`, parsed['@type'] || 'Custom JSON-LD');
  } catch (e) {
    console.log(`JSON-LD [${count}] parse error:`, e.message);
  }
}
console.log('Total JSON-LD blocks:', count);
