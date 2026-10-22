import fs from 'node:fs';
import path from 'node:path';

const routes = [
  { name: 'Home (/)', file: 'index.html' },
  { name: 'About (/about/)', file: 'about/index.html' },
  { name: 'Visit Us (/visit-us/)', file: 'visit-us/index.html' },
  { name: 'Boys Shop (/shop/boys/)', file: 'shop/boys/index.html' },
  { name: 'How It Works (/how-it-works/)', file: 'how-it-works/index.html' },
  { name: 'Dedicated Size Guide (/size-guide/)', file: 'size-guide/index.html' },
  { name: 'Size Chart Blog (/blog/kids-clothing-size-chart-guide/)', file: 'blog/kids-clothing-size-chart-guide/index.html' },
];

for (const r of routes) {
  const p = path.join(process.cwd(), 'out', r.file);
  if (!fs.existsSync(p)) {
    console.log(`${r.name}: FILE NOT FOUND (${p})`);
    continue;
  }
  const html = fs.readFileSync(p, 'utf8');
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let text = '';
  if (bodyMatch) {
    text = bodyMatch[1]
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  const wordCount = text ? text.split(/\s+/).length : 0;
  const cleanH1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim() : 'NONE';

  console.log(`=== ${r.name} ===`);
  console.log(`Title (${titleMatch ? titleMatch[1].length : 0} chars): ${titleMatch ? titleMatch[1] : 'NONE'}`);
  console.log(`Meta Desc (${metaDescMatch ? metaDescMatch[1].length : 0} chars): ${metaDescMatch ? metaDescMatch[1] : 'NONE'}`);
  console.log(`H1: ${cleanH1}`);
  console.log(`Word Count: ${wordCount}`);
  console.log('');
}
