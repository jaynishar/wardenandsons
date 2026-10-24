import fs from 'fs';
import path from 'path';

const outDir = path.resolve('out');

// 1. Read sitemap
const sitemapPath = path.join(outDir, 'sitemap.xml');
let sitemapUrls = new Set();
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = sitemapXml.match(/<loc>([\s\S]*?)<\/loc>/g) || [];
  locMatches.forEach(m => {
    const url = m.replace(/<loc>/, '').replace(/<\/loc>/, '').trim();
    sitemapUrls.add(url);
  });
}

// 2. Discover all shop html files
const shopRoutes = ['/shop'];
const categories = ['newborn', 'boys', 'girls', 'men', 'women'];
categories.forEach(c => shopRoutes.push(`/shop/${c}`));

// Read all subcategories from catalogue.ts
const catalogueFile = fs.readFileSync('src/data/catalogue.ts', 'utf8');
const subRegex = /categorySlug:\s*['"]([a-z]+)['"],\s*slug:\s*['"]([a-z0-9-]+)['"]/g;
let match;
while ((match = subRegex.exec(catalogueFile)) !== null) {
  shopRoutes.push(`/shop/${match[1]}/${match[2]}`);
}

console.log(`Found ${shopRoutes.length} shop pages to audit.\n`);

const results = [];

for (const route of shopRoutes) {
  let htmlPath = path.join(outDir, route.replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(htmlPath)) {
    console.error(`MISSING HTML FILE for ${route} at ${htmlPath}`);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');

  // Title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : '';
  const titleLen = title.length;

  // Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
  const desc = descMatch ? descMatch[1].replace(/&amp;/g, '&') : '';
  const descLen = desc.length;

  // H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Count = h1Matches.length;

  // Canonical
  const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["']/i);
  const canonical = canonMatch ? canonMatch[1] : '';

  // OG:URL
  const ogUrlMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([\s\S]*?)["']/i);
  const ogUrl = ogUrlMatch ? ogUrlMatch[1] : '';

  // Noindex
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([\s\S]*?)["']/i);
  const noindex = robotsMatch && robotsMatch[1].includes('noindex') ? 'yes' : 'no';

  // In Sitemap
  const expectedUrl = `https://wardenandsons.in${route}/`;
  const inSitemap = sitemapUrls.has(expectedUrl) ? 'yes' : 'no';

  results.push({
    route,
    titleLen,
    descLen,
    h1Count,
    canonical,
    ogUrl,
    noindex,
    inSitemap,
    title,
    desc,
  });
}

// Print formatted Markdown Table
console.log('| URL | Title (len) | Desc (len) | H1 | Canonical matches? | og:url matches? | Noindex | In Sitemap |');
console.log('|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|');

for (const r of results) {
  const expectedUrl = `https://wardenandsons.in${r.route}/`;
  const canonOk = r.canonical === expectedUrl ? '✓' : `MISMATCH (${r.canonical})`;
  const ogOk = r.ogUrl === expectedUrl ? '✓' : `MISMATCH (${r.ogUrl})`;
  const titleStatus = r.titleLen <= 60 ? `${r.titleLen}` : `**${r.titleLen} (>60)**`;
  const descStatus = (r.route.split('/').length > 3)
    ? (r.descLen >= 140 && r.descLen <= 155 ? `${r.descLen}` : `**${r.descLen}**`)
    : `${r.descLen}`;

  console.log(`| \`${r.route}/\` | ${titleStatus} | ${descStatus} | ${r.h1Count} | ${canonOk} | ${ogOk} | ${r.noindex} | ${r.inSitemap} |`);
}

// Check for any failures
const failures = results.filter(r => {
  const expectedUrl = `https://wardenandsons.in${r.route}/`;
  const isSub = r.route.split('/').length > 3;
  if (r.h1Count !== 1) return true;
  if (r.canonical !== expectedUrl) return true;
  if (r.ogUrl !== expectedUrl) return true;
  if (isSub && (r.titleLen > 60 || r.descLen < 140 || r.descLen > 155)) return true;
  return false;
});

if (failures.length > 0) {
  console.error(`\nFound ${failures.length} audit violations!`);
  process.exit(1);
} else {
  console.log(`\nALL ${results.length} SHOP PAGES PASSED AUDIT WITH 100% COMPLIANCE!`);
}
