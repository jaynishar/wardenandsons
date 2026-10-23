import fs from 'fs';
import path from 'path';

function getHtmlFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getHtmlFiles(full));
    } else if (entry.name === 'index.html' || (entry.name.endsWith('.html') && entry.name !== '404.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = getHtmlFiles('out');

// Map page path to canonical URL representation
function getPageUrl(filePath) {
  const rel = path.relative('out', filePath);
  let p = '/' + rel.replace(/\\/g, '/').replace(/index\.html$/, '');
  if (!p.endsWith('/')) p += '/';
  if (p === '//') p = '/';
  return p;
}

const allPages = htmlFiles.map(getPageUrl).filter(p => p !== '/404/');
allPages.sort();

// Count inbound links
const inboundCounts = {};
for (const p of allPages) {
  inboundCounts[p] = 0;
}

for (const file of htmlFiles) {
  const fromPage = getPageUrl(file);
  const content = fs.readFileSync(file, 'utf8');
  // Match href="..."
  const hrefMatches = Array.from(content.matchAll(/href=["']([^"']+)["']/g));
  const seenOnThisPage = new Set();

  for (const match of hrefMatches) {
    let href = match[1];
    // Strip domain if absolute
    href = href.replace(/^https?:\/\/wardenandsons\.in/, '');
    // Strip hash or query
    href = href.split('#')[0].split('?')[0];

    if (!href.startsWith('/')) continue;
    if (href !== '/' && !href.endsWith('/') && !href.includes('.')) {
      href += '/';
    }

    if (inboundCounts[href] !== undefined) {
      // If linking to self, do we count or only distinct from other pages?
      // Standard inbound link count counts all links pointing to this page from anywhere
      inboundCounts[href]++;
    }
  }
}

console.log('| URL | Inbound Link Count |');
console.log('| :--- | :---: |');
let allAbove2 = true;
for (const p of allPages) {
  const count = inboundCounts[p];
  if (count < 2) allAbove2 = false;
  console.log(`| \`${p}\` | ${count} |`);
}

console.log(`\nAll pages have at least 2 inbound links: ${allAbove2 ? 'YES' : 'NO'}`);
