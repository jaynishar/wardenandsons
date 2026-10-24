import fs from 'fs';
import path from 'path';

function getHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getHtmlFiles(full));
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const outDir = path.resolve('out');
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  const sitemapXml = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';

  const sitemapUrls = new Set();
  const urlMatches = sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g);
  for (const match of urlMatches) {
    sitemapUrls.add(match[1].trim());
  }

  const htmlFiles = getHtmlFiles(outDir);
  const rows = [];

  for (const file of htmlFiles) {
    let rel = path.relative(outDir, file).replace(/\\/g, '/');
    if (rel === 'index.html') {
      rel = '/';
    } else if (rel.endsWith('/index.html')) {
      rel = '/' + rel.replace(/\/index\.html$/, '/');
    } else {
      rel = '/' + rel;
    }

    if (rel === '/404.html' || rel === '/404/') continue;

    const html = fs.readFileSync(file, 'utf8');

    // Title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : '';
    const titleLength = title.length;

    // Description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const desc = descMatch ? descMatch[1] : '';
    const descLength = desc.length;

    // Canonical
    const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    const canonical = canonMatch ? canonMatch[1] : '';

    // OG:URL
    const ogUrlMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i);
    const ogUrl = ogUrlMatch ? ogUrlMatch[1] : '';

    // H1 count
    const h1Matches = html.match(/<h1[\s>]/gi) || [];
    const h1Count = h1Matches.length;

    // Noindex
    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
    const noindex = robotsMatch ? robotsMatch[1].toLowerCase().includes('noindex') : false;

    // In sitemap
    const fullUrl = `https://wardenandsons.in${rel}`;
    const inSitemap = sitemapUrls.has(fullUrl);

    // JSON-LD types
    const jsonLdTypes = [];
    const scriptMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    for (const sm of scriptMatches) {
      try {
        const parsed = JSON.parse(sm[1]);
        if (parsed['@type']) {
          jsonLdTypes.push(parsed['@type']);
        } else if (parsed['@graph']) {
          parsed['@graph'].forEach((g) => g['@type'] && jsonLdTypes.push(g['@type']));
        }
      } catch (e) {
        // ignore parse error in match
      }
    }

    rows.push({
      url: rel,
      title,
      titleLength,
      descLength,
      canonical,
      ogUrl,
      h1Count,
      jsonLd: jsonLdTypes.join(', '),
      noindex: noindex ? 'YES' : 'NO',
      inSitemap: inSitemap ? 'YES' : 'NO',
    });
  }

  // Sort rows alphabetically
  rows.sort((a, b) => a.url.localeCompare(b.url));

  fs.writeFileSync(
    path.resolve('docs/redesign/seo-parity-table.json'),
    JSON.stringify(rows, null, 2)
  );

  console.log(`Audited ${rows.length} static HTML pages.`);
}

main().catch((err) => {
  console.error('SEO audit failed:', err);
  process.exit(1);
});
