import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  console.log('out directory does not exist yet. Run npm run build.');
  process.exit(1);
}

const issues = [];
let auditedCount = 0;

function checkHtmlFile(filePath, relUrl) {
  auditedCount++;
  const content = fs.readFileSync(filePath, 'utf8');

  // Title
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';

  // Description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const desc = descMatch ? descMatch[1] : '';

  // H1
  const h1Matches = content.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || [];

  // Canonical
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const canonical = canonMatch ? canonMatch[1] : '';

  // Lang
  const langMatch = content.match(/<html[^>]*lang=["']([^"']*)["']/i);
  const lang = langMatch ? langMatch[1] : '';

  // Noindex check
  const hasNoindex = /noindex/i.test(content);

  // Wardenandsons.com check
  const hasDotCom = /wardenandsons\.com/i.test(content);

  console.log(`\nURL: ${relUrl || '/'}`);
  console.log(`  Title (${title.length} chars): ${title}`);
  console.log(`  Description (${desc.length} chars): ${desc}`);
  console.log(`  H1 count: ${h1Matches.length} ${h1Matches.length > 0 ? '-> ' + h1Matches[0].replace(/<[^>]+>/g, '').trim() : ''}`);
  console.log(`  Canonical: ${canonical}`);
  console.log(`  Lang: ${lang}`);

  if (!title) issues.push(`${relUrl}: Missing title`);
  if (title.length < 40 || title.length > 65) issues.push(`${relUrl}: Title length (${title.length}) outside recommended ~50-60 chars`);
  if (!desc) issues.push(`${relUrl}: Missing description`);
  if (desc.length < 80 || desc.length > 150) issues.push(`${relUrl}: Description length (${desc.length}) outside recommended ~100-130 chars`);
  if (h1Matches.length !== 1) issues.push(`${relUrl}: Found ${h1Matches.length} H1 tags (expected exactly 1)`);
  if (!canonical.startsWith('https://wardenandsons.in')) issues.push(`${relUrl}: Invalid canonical (${canonical})`);
  if (lang !== 'en-IN') issues.push(`${relUrl}: Lang is '${lang}' (expected 'en-IN')`);
  if (hasNoindex) issues.push(`${relUrl}: Found 'noindex'`);
  if (hasDotCom) issues.push(`${relUrl}: Found 'wardenandsons.com'`);
}

function traverse(dir, prefix = '') {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      traverse(full, prefix + '/' + f);
    } else if (f === 'index.html') {
      checkHtmlFile(full, prefix || '/');
    }
  }
}

traverse(outDir);

console.log(`\n========================================`);
console.log(`Audited ${auditedCount} pages.`);
if (issues.length > 0) {
  console.log(`\nFound ${issues.length} potential issues:`);
  issues.forEach(i => console.log(' - ' + i));
} else {
  console.log(`ALL PAGES PASSED STRICT SEO AUDIT CHECKS!`);
}
