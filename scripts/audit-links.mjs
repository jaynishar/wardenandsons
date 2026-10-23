import fs from 'fs';
import path from 'path';

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  // Match href="..." or href='...'
  const hrefRegex = /href=["']([^"']+)["']/g;
  let m;
  while ((m = hrefRegex.exec(content)) !== null) {
    const url = m[1];
    if (url.startsWith('/') && url !== '/' && !url.includes('.') && !url.endsWith('/') && !url.includes('#')) {
      issues.push(`href without slash: "${url}"`);
    }
  }

  // Match markdown links [text](...)
  const mdRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((m = mdRegex.exec(content)) !== null) {
    const url = m[2];
    if (url.startsWith('/') && url !== '/' && !url.includes('.') && !url.endsWith('/') && !url.includes('#')) {
      issues.push(`markdown link without slash: "${url}"`);
    }
  }

  if (issues.length > 0) {
    console.log(`\n📄 ${filePath}:`);
    issues.forEach(i => console.log(`   - ${i}`));
  }
  return issues.length;
}

function walk(dir) {
  let total = 0;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git' && f !== 'out') {
        total += walk(full);
      }
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.mdx')) {
      total += checkFile(full);
    }
  }
  return total;
}

const totalIssues = walk('src');
console.log(`\nTotal internal links missing trailing slash: ${totalIssues}`);
