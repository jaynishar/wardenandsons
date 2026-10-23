import fs from 'fs';
import path from 'path';

function getOgTags(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getOgTags(fullPath));
    } else if (entry.name === 'index.html' || (entry.name.endsWith('.html') && entry.name !== '404.html')) {
      const html = fs.readFileSync(fullPath, 'utf8');
      const rel = path.relative('out', fullPath);
      let pagePath = '/' + rel.replace(/\\/g, '/').replace(/index\.html$/, '');
      if (!pagePath.endsWith('/')) pagePath += '/';
      if (pagePath === '//') pagePath = '/';

      const ogUrlMatch = html.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']*)["']/i) ||
                         html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:url["']/i);
      const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);

      results.push({
        url: pagePath,
        title: titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : '',
        canonical: canonMatch ? canonMatch[1] : '',
        ogUrl: ogUrlMatch ? ogUrlMatch[1] : '',
      });
    }
  }
  return results;
}

const tags = getOgTags('out').filter(p => p.url !== '/404/');
tags.sort((a, b) => a.url.localeCompare(b.url));

console.log('| URL | Title | Canonical | og:url |');
console.log('| :--- | :--- | :--- | :--- |');
for (const t of tags) {
  console.log(`| \`${t.url}\` | ${t.title} | \`${t.canonical}\` | \`${t.ogUrl}\` |`);
}
