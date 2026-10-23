import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('out');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html') && !file.includes('404')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(outDir);
const results = [];
let forbiddenFound = 0;
let jsonErrorFound = 0;

for (const filePath of htmlFiles) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(outDir, filePath).replace(/\\/g, '/');
  let urlPath = '/' + relPath.replace(/index\.html$/, '');
  if (urlPath === '//') urlPath = '/';

  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  const schemas = [];

  while ((match = regex.exec(content)) !== null) {
    const jsonStr = match[1];
    try {
      const parsed = JSON.parse(jsonStr);
      const extractTypes = (obj) => {
        if (!obj) return [];
        if (Array.isArray(obj)) return obj.flatMap(extractTypes);
        const types = [];
        if (obj['@type']) types.push(obj['@type']);
        return types;
      };
      const types = extractTypes(parsed);
      schemas.push(...types);

      // Verify specific requirements
      if (parsed['@type'] === 'ClothingStore') {
        if (!parsed.name) throw new Error('ClothingStore missing name');
        if (!parsed.url) throw new Error('ClothingStore missing url');
        if (!parsed.telephone) throw new Error('ClothingStore missing telephone');
        if (!parsed.image) throw new Error('ClothingStore missing image');
        if (!parsed.address || parsed.address['@type'] !== 'PostalAddress' || parsed.address.addressCountry !== 'IN') {
          throw new Error('ClothingStore invalid PostalAddress');
        }
        if (!parsed.sameAs || !parsed.sameAs.includes('https://share.google/iwNowyZv9IlLRTv8Z') || !parsed.sameAs.includes('https://www.instagram.com/wardenandsonskidswear/')) {
          throw new Error('ClothingStore sameAs mismatch');
        }
        if (!parsed.openingHoursSpecification || parsed.openingHoursSpecification.length === 0) {
          throw new Error('ClothingStore openingHoursSpecification missing');
        }
        if (parsed.aggregateRating || parsed.review || parsed.rating) {
          throw new Error('ClothingStore contains forbidden rating/review fields');
        }
      }

      if (parsed['@type'] === 'BlogPosting') {
        if (!parsed.headline) throw new Error('BlogPosting missing headline');
        if (!parsed.datePublished) throw new Error('BlogPosting missing datePublished');
        if (!parsed.dateModified) throw new Error('BlogPosting missing dateModified');
        if (!parsed.author || parsed.author.name !== 'The Warden & Sons Team') {
          throw new Error(`BlogPosting author mismatch: ${JSON.stringify(parsed.author)}`);
        }
        if (!parsed.publisher) throw new Error('BlogPosting missing publisher');
      }

      if (parsed['@type'] === 'BreadcrumbList') {
        if (!parsed.itemListElement || !Array.isArray(parsed.itemListElement) || parsed.itemListElement.length === 0) {
          throw new Error('BreadcrumbList missing itemListElement');
        }
      }

    } catch (e) {
      jsonErrorFound++;
      schemas.push(`JSON_VALIDATION_ERROR: ${e.message}`);
    }
  }

  const forbidden = ['FAQPage', 'Product', 'Offer', 'AggregateOffer', 'Review'];
  const hasForbidden = schemas.some(t => forbidden.includes(t));
  if (hasForbidden) forbiddenFound++;

  results.push({
    url: urlPath,
    schemas: schemas.join(', ') || '(none)',
  });
}

results.sort((a, b) => a.url.localeCompare(b.url));

console.log('| URL | JSON-LD Schema Types |');
console.log('|---|---|');
for (const r of results) {
  console.log(`| ${r.url} | ${r.schemas} |`);
}

console.log(`\nTotal pages: ${results.length}`);
console.log(`Validation errors: ${jsonErrorFound}`);
console.log(`Forbidden schemas found: ${forbiddenFound}`);
