import fs from 'node:fs';
import path from 'node:path';

const allowedLocations = [
  'header',
  'hero',
  'product',
  'request_list',
  'footer',
  'sticky_bar',
  'video_call',
];

const distinctLocations = new Set();
const invalidLocations = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /data-track-location="([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const loc = match[1];
    distinctLocations.add(loc);
    if (!allowedLocations.includes(loc)) {
      invalidLocations.push({ file: filePath, location: loc });
    }
  }
}

function walkDir(dir, extensions) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, extensions);
    } else if (extensions.some(ext => file.endsWith(ext))) {
      checkFile(fullPath);
    }
  }
}

walkDir('src', ['.tsx', '.ts']);
walkDir('out', ['.html']);

console.log('Distinct button_location values found across source and rendered output:');
const sortedList = Array.from(distinctLocations).sort();
for (const loc of sortedList) {
  console.log(`- ${loc}`);
}

if (invalidLocations.length > 0) {
  console.error('\nFound invalid locations:', invalidLocations);
  process.exit(1);
} else {
  console.log(`\nAll ${distinctLocations.size} distinct button_location values are valid.`);
}
