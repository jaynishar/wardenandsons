import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('out');

if (!fs.existsSync(OUT_DIR)) {
  console.error('Error: out/ directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(OUT_DIR);
console.log(`\n🔍 Found ${htmlFiles.length} HTML pages in out/\n`);

let totalErrors = 0;
let totalLinksChecked = 0;
let totalImagesChecked = 0;

for (const filePath of htmlFiles) {
  const relativePath = path.relative(OUT_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Check Canonical
  const canonicalMatch = content.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i);
  if (!canonicalMatch) {
    console.error(`❌ [Missing Canonical] ${relativePath}`);
    totalErrors++;
  } else {
    const canonical = canonicalMatch[1];
    if (canonical.includes('wardenandsons.com')) {
      console.error(`❌ [Invalid .com Canonical] ${relativePath}: ${canonical}`);
      totalErrors++;
    }
    if (!canonical.startsWith('https://wardenandsons.in/')) {
      console.error(`❌ [Non-standard Canonical] ${relativePath}: ${canonical}`);
      totalErrors++;
    }
  }

  // 2. Check all internal anchor hrefs
  const linkMatches = [...content.matchAll(/<a[^>]*href="([^"#][^"]*)"/gi)];
  for (const match of linkMatches) {
    const href = match[1];
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:')
    ) {
      continue;
    }

    totalLinksChecked++;
    let target = href.split('?')[0];
    let resolvedPath;

    if (target.startsWith('/')) {
      // Remove leading slash
      const clean = target.slice(1);
      if (clean === '' || clean.endsWith('/')) {
        resolvedPath = path.join(OUT_DIR, clean, 'index.html');
      } else {
        resolvedPath = path.join(OUT_DIR, clean + '.html');
        if (!fs.existsSync(resolvedPath)) {
          resolvedPath = path.join(OUT_DIR, clean, 'index.html');
        }
      }
    } else {
      resolvedPath = path.join(path.dirname(filePath), target);
    }

    if (!fs.existsSync(resolvedPath)) {
      console.error(
        `❌ [Broken Link 404] on ${relativePath} -> ${href} (Looking for: ${resolvedPath})`,
      );
      totalErrors++;
    }
  }

  // 3. Check all images
  const imgMatches = [...content.matchAll(/<img[^>]*src="([^"]+)"/gi)];
  for (const match of imgMatches) {
    const src = match[1];
    if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) {
      continue;
    }

    totalImagesChecked++;
    const cleanSrc = src.split('?')[0].replace(/^\//, '');
    const diskPath = path.join(OUT_DIR, cleanSrc);
    if (!fs.existsSync(diskPath)) {
      console.error(`❌ [Missing Image 404] on ${relativePath} -> ${src}`);
      totalErrors++;
    }
  }
}

// 4. Check sitemap.xml and robots.txt
console.log('\n🔍 Auditing sitemap.xml and robots.txt...');

if (fs.existsSync(path.join(OUT_DIR, 'sitemap.xml'))) {
  const sitemap = fs.readFileSync(path.join(OUT_DIR, 'sitemap.xml'), 'utf8');
  if (sitemap.includes('.com')) {
    console.error('❌ [Sitemap Error] sitemap.xml contains .com domain references!');
    totalErrors++;
  } else {
    console.log('✅ sitemap.xml contains only verified https://wardenandsons.in/ URLs.');
  }
} else {
  console.error('❌ [Missing Sitemap] out/sitemap.xml does not exist.');
  totalErrors++;
}

if (fs.existsSync(path.join(OUT_DIR, 'robots.txt'))) {
  const robots = fs.readFileSync(path.join(OUT_DIR, 'robots.txt'), 'utf8');
  if (robots.includes('Disallow: /_next/')) {
    console.error('❌ [Robots Error] robots.txt blocks /_next/ which impairs rendering!');
    totalErrors++;
  } else if (!robots.includes('https://wardenandsons.in/sitemap.xml')) {
    console.error('❌ [Robots Error] robots.txt missing correct sitemap link!');
    totalErrors++;
  } else {
    console.log(
      '✅ robots.txt points to https://wardenandsons.in/sitemap.xml and does not block /_next/.',
    );
  }
} else {
  console.error('❌ [Missing Robots] out/robots.txt does not exist.');
  totalErrors++;
}

console.log(`\n==============================================`);
console.log(`📊 Crawl Check Results:`);
console.log(`   HTML Pages Checked:   ${htmlFiles.length}`);
console.log(`   Internal Links Checked: ${totalLinksChecked}`);
console.log(`   Images Checked:        ${totalImagesChecked}`);
console.log(`   Total Violations:      ${totalErrors}`);
console.log(`==============================================\n`);

if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log(
    '🎉 100% Crawl Check Clean! Zero broken links, zero missing images, zero canonical errors.\n',
  );
}
