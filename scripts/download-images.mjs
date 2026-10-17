import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const categoriesDir = path.resolve('public/categories');
const productsDir = path.resolve('public/products');

if (!fs.existsSync(categoriesDir)) fs.mkdirSync(categoriesDir, { recursive: true });
if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });

// Curated tasteful editorial photography from Unsplash
const imagesToFetch = [
  // Categories (16:10 or 4:5 editorial, width: 800, height: 600 or 500)
  {
    dest: 'public/categories/newborn.webp',
    id: 'photo-1515488042361-ee00e0ddd4e4',
    width: 800,
    height: 500,
  },
  {
    dest: 'public/categories/boys.webp',
    id: 'photo-1503919545889-aef636e10ad4',
    width: 800,
    height: 500,
  },
  {
    dest: 'public/categories/girls.webp',
    id: 'photo-1518831959646-742c3a14ebf7',
    width: 800,
    height: 500,
  },
  {
    dest: 'public/categories/men.webp',
    id: 'photo-1521572267360-ee0c2909d518',
    width: 800,
    height: 500,
  },
  {
    dest: 'public/categories/women.webp',
    id: 'photo-1515886657613-9f3515b0c78f',
    width: 800,
    height: 500,
  },
  {
    dest: 'public/categories/bulk.webp',
    id: 'photo-1598033129183-c4f50c736f10',
    width: 800,
    height: 500,
  },
  // Hero Editorial (16:10 ratio, 960x600)
  {
    dest: 'public/hero-editorial.webp',
    id: 'photo-1503919545889-aef636e10ad4',
    width: 960,
    height: 600,
  },
  // Products (4:5 ratio, 600x750)
  // Newborn
  { dest: 'public/products/nb-bodysuit.webp', id: 'photo-1522771739844-6a9f6d5f14af', width: 600, height: 750 },
  { dest: 'public/products/nb-swaddle.webp', id: 'photo-1555252333-9f8e92e65df9', width: 600, height: 750 },
  { dest: 'public/products/nb-towel.webp', id: 'photo-1544126592-807ade215a0b', width: 600, height: 750 },
  { dest: 'public/products/nb-romper.webp', id: 'photo-1596870230751-ebdfce98ec42', width: 600, height: 750 },
  { dest: 'public/products/nb-accessories.webp', id: 'photo-1616423640778-28d1b53229bd', width: 600, height: 750 },
  { dest: 'public/products/nb-sleepsuit.webp', id: 'photo-1505377059067-e285a7bac49b', width: 600, height: 750 },
  // Boys
  { dest: 'public/products/by-tee.webp', id: 'photo-1503919545889-aef636e10ad4', width: 600, height: 750 },
  { dest: 'public/products/by-sportswear.webp', id: 'photo-1471286174890-9c112ffca564', width: 600, height: 750 },
  { dest: 'public/products/by-cricket.webp', id: 'photo-1519085360753-af0119f7cbe7', width: 600, height: 750 },
  { dest: 'public/products/by-nightsuit.webp', id: 'photo-1516627145497-ae6968895b74', width: 600, height: 750 },
  { dest: 'public/products/by-cargos.webp', id: 'photo-1508214751196-bcfd4ca60f91', width: 600, height: 750 },
  { dest: 'public/products/by-layering.webp', id: 'photo-1485546246426-74dc88dec4d9', width: 600, height: 750 },
  // Girls
  { dest: 'public/products/gl-dress.webp', id: 'photo-1518831959646-742c3a14ebf7', width: 600, height: 750 },
  { dest: 'public/products/gl-nightsuit.webp', id: 'photo-1508807526345-15e9b5f4eaff', width: 600, height: 750 },
  { dest: 'public/products/gl-top.webp', id: 'photo-1519456264937-453f0764746b', width: 600, height: 750 },
  { dest: 'public/products/gl-leggings.webp', id: 'photo-1502086223501-7ea6ecd79368', width: 600, height: 750 },
  { dest: 'public/products/gl-sportswear.webp', id: 'photo-1513201099705-a9746e1e201f', width: 600, height: 750 },
  { dest: 'public/products/gl-jacket.webp', id: 'photo-1476820865390-c52aeebb9891', width: 600, height: 750 },
  // Men
  { dest: 'public/products/mn-tee.webp', id: 'photo-1521572267360-ee0c2909d518', width: 600, height: 750 },
  { dest: 'public/products/mn-shorts.webp', id: 'photo-1506630448388-4e683c67ddb0', width: 600, height: 750 },
  { dest: 'public/products/mn-trackpants.webp', id: 'photo-1488161628813-04466f872be2', width: 600, height: 750 },
  { dest: 'public/products/mn-pajamas.webp', id: 'photo-1507679799987-c73779587ccf', width: 600, height: 750 },
  // Women
  { dest: 'public/products/wm-muslin-set.webp', id: 'photo-1515886657613-9f3515b0c78f', width: 600, height: 750 },
  { dest: 'public/products/wm-leggings.webp', id: 'photo-1506152983158-b4a74a01c721', width: 600, height: 750 },
  { dest: 'public/products/wm-top.webp', id: 'photo-1434389677669-e08b4cac3105', width: 600, height: 750 },
  { dest: 'public/products/wm-kaftan.webp', id: 'photo-1490481651871-ab68de25d43d', width: 600, height: 750 },
  // Bulk
  { dest: 'public/products/bk-uniform.webp', id: 'photo-1598033129183-c4f50c736f10', width: 600, height: 750 },
  { dest: 'public/products/bk-cricket-kit.webp', id: 'photo-1581655353564-df123a1eb820', width: 600, height: 750 },
];

async function processImages() {
  console.log(`Starting download and WebP optimization for ${imagesToFetch.length} images...`);

  for (const item of imagesToFetch) {
    const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=${item.width}&h=${item.height}&q=80`;
    try {
      console.log(`Downloading: ${item.dest}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const inputBuffer = Buffer.from(arrayBuffer);

      // Process and optimize with Sharp
      await sharp(inputBuffer)
        .resize(item.width, item.height, { fit: 'cover', position: 'center' })
        .webp({ quality: 80, effort: 5 })
        .toFile(item.dest);

      const stats = fs.statSync(item.dest);
      const sizeKb = (stats.size / 1024).toFixed(1);
      console.log(`  ✓ Saved ${item.dest} (${sizeKb} KB - ${sizeKb <= 90 ? 'OK <= 90KB' : 'WARNING > 90KB'})`);
    } catch (err) {
      console.error(`  ✗ Error processing ${item.dest}:`, err.message);
    }
  }
  console.log('Finished processing all images.');
}

processImages();
