import fs from 'fs';
import path from 'path';

function inspectHtmlFiles(dir) {
  const pages = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      pages.push(...inspectHtmlFiles(fullPath));
    } else if (entry.name === 'index.html' || (entry.name.endsWith('.html') && entry.name !== '404.html')) {
      const html = fs.readFileSync(fullPath, 'utf8');
      const rel = path.relative('out', fullPath);
      let pagePath = '/' + rel.replace(/\\/g, '/').replace(/index\.html$/, '');
      if (!pagePath.endsWith('/')) pagePath += '/';
      if (pagePath === '//') pagePath = '/';

      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&').replace(/&#x27;/g, "'") : '';

      const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
                        html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
      const desc = descMatch ? descMatch[1].replace(/&amp;/g, '&').replace(/&#x27;/g, "'") : '';

      const h1Matches = Array.from(html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi));
      const h1Count = h1Matches.length;
      const h1Texts = h1Matches.map(m => m[1].replace(/<[^>]+>/g, '').replace(/[\s\r\n]+/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").trim());

      pages.push({
        url: pagePath,
        title,
        titleLen: title.length,
        desc,
        descLen: desc.length,
        h1Count,
        h1Text: h1Texts.join(' | '),
      });
    }
  }
  return pages;
}

const pages = inspectHtmlFiles('out').filter(p => p.url !== '/404/');
pages.sort((a, b) => a.url.localeCompare(b.url));

let allValid = true;
pages.forEach(p => {
  if (p.titleLen > 60) {
    console.error(`ERROR: Title length > 60 for ${p.url}: ${p.titleLen} chars -> "${p.title}"`);
    allValid = false;
  }
  if (!p.title.endsWith(' | Warden & Sons')) {
    console.error(`ERROR: Title does not end with brand for ${p.url}: "${p.title}"`);
    allValid = false;
  }
  if (p.descLen < 140 || p.descLen > 155) {
    console.error(`ERROR: Description length not in 140-155 for ${p.url}: ${p.descLen} chars -> "${p.desc}"`);
    allValid = false;
  }
  if (p.h1Count !== 1) {
    console.error(`ERROR: H1 count is ${p.h1Count} for ${p.url}`);
    allValid = false;
  }
});

console.log(`Validation result: ${allValid ? 'ALL CHECKS PASSED PERFECTLY!' : 'FAILURES DETECTED'}`);

console.log('\n| URL | Title Length | Description Length | H1 Count | H1 Text |');
console.log('| :--- | :---: | :---: | :---: | :--- |');
for (const p of pages) {
  console.log(`| \`${p.url}\` | ${p.titleLen} | ${p.descLen} | ${p.h1Count} | ${p.h1Text} |`);
}
