import fs from 'fs';

const html = fs.readFileSync('out/index.html', 'utf8');

// Extract text between <main> and </main>
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (!mainMatch) {
  console.log('Error: <main> tag not found');
  process.exit(1);
}

// Strip scripts, styles, svg
let text = mainMatch[1]
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<svg[\s\S]*?<\/svg>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&rarr;/g, '')
  .replace(/\s+/g, ' ')
  .trim();

const words = text.split(/\s+/).filter(w => w.length > 0);
console.log('Total visible words in <main>:', words.length);
console.log('Preview text:\n', text.slice(0, 300) + '...');
