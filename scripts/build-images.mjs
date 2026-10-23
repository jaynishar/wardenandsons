import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PHOTOS_DIR = path.join(process.cwd(), 'assets', 'photos');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'img');
const MANIFEST_PATH = path.join(process.cwd(), 'src', 'data', 'image-manifest.json');
const TARGET_WIDTHS = [480, 800, 1200];
const VALID_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function findImages(dir, baseDir = dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await findImages(fullPath, baseDir);
      files.push(...nested);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (VALID_EXTENSIONS.has(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function buildImages() {
  console.log('='.repeat(65));
  console.log('  WARDEN & SONS — IMAGE PIPELINE BUILDER');
  console.log('='.repeat(65));

  // Ensure assets/photos exists
  if (!fs.existsSync(PHOTOS_DIR)) {
    fs.mkdirSync(PHOTOS_DIR, { recursive: true });
  }

  const imageFiles = await findImages(PHOTOS_DIR);

  if (imageFiles.length === 0) {
    console.log(' No photos found in assets/photos. Generating empty image manifest.');
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify({}, null, 2));
    console.log(' Manifest saved to src/data/image-manifest.json');
    console.log('='.repeat(65));
    process.exit(0);
  }

  console.log(` Found ${imageFiles.length} source photo(s). Processing AVIF, WebP & blur...`);

  const manifest = {};

  for (const file of imageFiles) {
    const relativePath = path.relative(PHOTOS_DIR, file);
    const parsed = path.parse(relativePath);
    // Standard key: <category>/<sub>/<name> (using forward slashes)
    const key = path.join(parsed.dir, parsed.name).replace(/\\/g, '/');

    const outDir = path.join(OUTPUT_DIR, parsed.dir);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    try {
      const image = sharp(file);
      const metadata = await image.metadata();

      // Generate 16px wide blurred base64 placeholder (preserving 4:5 ratio)
      const blurBuffer = await sharp(file)
        .resize(16, 20, { fit: 'cover' })
        .webp({ quality: 20 })
        .toBuffer();
      const blur = `data:image/webp;base64,${blurBuffer.toString('base64')}`;

      // Generate AVIF and WebP for target widths
      for (const width of TARGET_WIDTHS) {
        const height = Math.round((width * 5) / 4); // 4:5 portrait crop

        const avifPath = path.join(outDir, `${parsed.name}-${width}.avif`);
        const webpPath = path.join(outDir, `${parsed.name}-${width}.webp`);

        await sharp(file)
          .resize(width, height, { fit: 'cover' })
          .avif({ quality: 80, effort: 4 })
          .toFile(avifPath);

        await sharp(file)
          .resize(width, height, { fit: 'cover' })
          .webp({ quality: 85, effort: 4 })
          .toFile(webpPath);
      }

      manifest[key] = {
        width: metadata.width || 1600,
        height: metadata.height || 2000,
        blur,
        widths: TARGET_WIDTHS,
      };

      console.log(` ✓ Processed: ${key}`);
    } catch (err) {
      console.error(` ✗ Error processing ${key}:`, err.message);
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\n Successfully generated manifest with ${Object.keys(manifest).length} items.`);
  console.log('='.repeat(65));
}

buildImages().catch((err) => {
  console.error('Fatal error in build-images:', err);
  process.exit(1);
});
