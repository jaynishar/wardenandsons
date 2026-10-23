import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'out');

if (!fs.existsSync(outDir)) {
  console.error('Directory out/ does not exist. Run npm run build first.');
  process.exit(1);
}

// 1. Find all HTML files
function findHtmlFiles(dir, baseDir = dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath, baseDir));
    } else if (entry.name.endsWith('.html')) {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push({ fullPath, relPath });
    }
  }
  return results;
}

const htmlFiles = findHtmlFiles(outDir);

// 2. Map files to routes
const pages = [];
for (const file of htmlFiles) {
  let route = '/' + file.relPath.replace(/\.html$/, '');
  if (route.endsWith('/index')) {
    route = route.slice(0, -5); // /shop/index -> /shop/
  }
  if (route === '/index') {
    route = '/';
  }
  if (route !== '/' && !route.endsWith('/')) {
    route = route + '/';
  }

  // Skip 404 page from standard table or treat separately
  if (route === '/404/') continue;

  const content = fs.readFileSync(file.fullPath, 'utf8');

  // Title
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&').replace(/&#x27;/g, "'").trim() : '';

  // Canonical
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const canonical = canonMatch ? canonMatch[1] : '';

  // Open Graph URL
  const ogUrlMatch = content.match(/<meta\s+(?:property|name)=["']og:url["']\s+content=["']([^"']*)["']/i);
  const ogUrl = ogUrlMatch ? ogUrlMatch[1] : '';

  // H1 tags
  const h1Matches = content.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Count = h1Matches.length;

  // Extract all hrefs on this page
  const outgoingHrefs = [];
  const hrefRegex = /<a\b[^>]*\bhref=["']([^"']+)["']/gi;
  let m;
  while ((m = hrefRegex.exec(content)) !== null) {
    let target = m[1];
    if (target.startsWith('https://wardenandsons.in')) {
      target = target.replace('https://wardenandsons.in', '');
    }
    if (target.startsWith('/') && !target.includes('.') && !target.startsWith('/#')) {
      // Clean query / hash
      target = target.split('?')[0].split('#')[0];
      if (target !== '/' && !target.endsWith('/')) {
        target = target + '/';
      }
      outgoingHrefs.push(target);
    }
  }

  pages.push({
    file: file.relPath,
    route,
    title,
    canonical,
    ogUrl,
    h1Count,
    outgoingHrefs,
    inboundCount: 0,
  });
}

// 3. Calculate inbound internal links for each page
for (const p of pages) {
  let count = 0;
  for (const other of pages) {
    // Count how many times 'other' page links to 'p.route'
    // (or count distinct pages linking to p.route)
    const linksToP = other.outgoingHrefs.filter(href => href === p.route).length;
    count += linksToP;
  }
  p.inboundCount = count;
}

// Sort pages alphabetically by URL (home '/' first)
pages.sort((a, b) => {
  if (a.route === '/') return -1;
  if (b.route === '/') return 1;
  return a.route.localeCompare(b.route);
});

// 4. Output results and sanity checks
console.log(`\nAudited ${pages.length} pages in out/:\n`);

let hasError = false;
for (const p of pages) {
  if (!p.canonical) {
    console.error(`❌ Page ${p.route} is missing canonical!`);
    hasError = true;
  }
  if (!p.ogUrl) {
    console.error(`❌ Page ${p.route} is missing og:url!`);
    hasError = true;
  }
  if (p.canonical !== p.ogUrl) {
    console.error(`❌ Page ${p.route} has canonical != og:url (${p.canonical} vs ${p.ogUrl})`);
    hasError = true;
  }
  if (p.route !== '/' && p.ogUrl === 'https://wardenandsons.in/') {
    console.error(`❌ Page ${p.route} has homepage as og:url!`);
    hasError = true;
  }
  if (p.h1Count !== 1) {
    console.warn(`⚠️ Page ${p.route} has ${p.h1Count} H1 tags.`);
  }
}

if (!hasError) {
  console.log('✅ ALL PAGES PASS CANONICAL & OG:URL INTEGRITY CHECKS!');
}

// 5. Generate Markdown Table for CHANGES.md
let markdownTable = `| URL | Title | Canonical | og:url | H1 Count | Inbound Internal Link Count |\n`;
markdownTable += `| :--- | :--- | :--- | :--- | :---: | :---: |\n`;

for (const p of pages) {
  markdownTable += `| \`${p.route}\` | ${p.title} | \`${p.canonical}\` | \`${p.ogUrl}\` | ${p.h1Count} | ${p.inboundCount} |\n`;
}

console.log('\n--- Markdown Table Preview ---\n');
console.log(markdownTable);

// Export table to a file for easy inclusion in CHANGES.md
fs.writeFileSync('scripts/pages-table.md', markdownTable, 'utf8');
console.log('Saved to scripts/pages-table.md');
