import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcPath = path.resolve('public/store_front.jpg');
const webpPath = path.resolve('public/store_front.webp');

async function optimize() {
  const originalBytes = fs.readFileSync(srcPath);

  // Create WebP <= 80KB
  const webpBuffer = await sharp(originalBytes)
    .resize(800, 600, { fit: 'inside' })
    .webp({ quality: 75, effort: 6 })
    .toBuffer();
    
  fs.writeFileSync(webpPath, webpBuffer);
  console.log(`Saved store_front.webp: ${(webpBuffer.length / 1024).toFixed(1)} KB`);

  // Compress original JPG in place <= 90KB
  const jpgBuffer = await sharp(originalBytes)
    .resize(800, 600, { fit: 'inside' })
    .jpeg({ quality: 72, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(srcPath, jpgBuffer);
  console.log(`Saved compressed store_front.jpg: ${(jpgBuffer.length / 1024).toFixed(1)} KB`);
}

optimize().catch(console.error);
