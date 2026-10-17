import fs from 'fs';

const file = 'src/lib/products.ts';
let code = fs.readFileSync(file, 'utf8');

const mapping = {
  'cat-nb-01': '/products/nb-bodysuit.webp',
  'cat-nb-02': '/products/nb-swaddle.webp',
  'cat-nb-03': '/products/nb-towel.webp',
  'cat-nb-04': '/products/nb-romper.webp',
  'cat-nb-05': '/products/nb-accessories.webp',
  'cat-nb-06': '/products/nb-sleepsuit.webp',

  'cat-by-01': '/products/by-tee.webp',
  'cat-by-02': '/products/by-sportswear.webp',
  'cat-by-03': '/products/by-cricket.webp',
  'cat-by-04': '/products/by-nightsuit.webp',
  'cat-by-05': '/products/by-cargos.webp',
  'cat-by-06': '/products/by-layering.webp',

  'cat-gr-01': '/products/gl-dress.webp',
  'cat-gr-02': '/products/gl-nightsuit.webp',
  'cat-gr-03': '/products/gl-top.webp',
  'cat-gr-04': '/products/gl-leggings.webp',
  'cat-gr-05': '/products/gl-sportswear.webp',
  'cat-gr-06': '/products/gl-jacket.webp',

  'cat-mn-01': '/products/mn-tee.webp',
  'cat-mn-02': '/products/mn-shorts.webp',
  'cat-mn-03': '/products/mn-trackpants.webp',
  'cat-mn-04': '/products/mn-pajamas.webp',

  'cat-wm-01': '/products/wm-muslin-set.webp',
  'cat-wm-02': '/products/wm-leggings.webp',
  'cat-wm-03': '/products/wm-kaftan.webp',
  'cat-wm-04': '/products/wm-top.webp',

  'cat-bk-01': '/products/bk-uniform.webp',
  'cat-bk-02': '/products/bk-cricket-kit.webp',
};

let matchCount = 0;
for (const [id, img] of Object.entries(mapping)) {
  const pattern = new RegExp(`(id:\\s*['"]${id}['"],[\\s\\S]*?image:\\s*['"])(['"])`);
  if (pattern.test(code)) {
    code = code.replace(pattern, `$1${img}$2`);
    matchCount++;
  } else {
    console.warn(`Could not find item with id: ${id}`);
  }
}

fs.writeFileSync(file, code, 'utf8');
console.log(`Successfully mapped ${matchCount} of ${Object.keys(mapping).length} product images in ${file}`);
