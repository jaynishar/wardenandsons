import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function processBrandLogo() {
  fs.mkdirSync('public/brand', { recursive: true });

  const inputPath = fs.existsSync('public/brand_logo.webp') ? 'public/brand_logo.webp' : 'public/brand_logo.jpg';
  const img = sharp(inputPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Find exact artwork bounding box
  // Background in the original is off-white: r > 245, g > 245, b > 230
  let minY = height, maxY = 0, minX = width, maxX = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const isBg = (r > 240 && g > 240 && b > 225);
      if (!isBg) {
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }

  console.log(`Detected logo bounds: x: ${minX}..${maxX} (${maxX - minX + 1}px), y: ${minY}..${maxY} (${maxY - minY + 1}px)`);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  // Create an RGBA buffer of the cropped area with transparent background
  const rgbaBuffer = Buffer.alloc(cropW * cropH * 4);

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const srcX = minX + x;
      const srcY = minY + y;
      const srcIdx = (srcY * width + srcX) * channels;
      const dstIdx = (y * cropW + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      // Measure distance from the background color [252, 252, 236]
      const bgDiff = Math.sqrt(
        Math.pow(r - 252, 2) +
        Math.pow(g - 252, 2) +
        Math.pow(b - 236, 2)
      );

      let alpha = 255;
      if (bgDiff < 18) {
        alpha = 0; // completely transparent background
      } else if (bgDiff < 32) {
        // smooth anti-aliased edge without halo
        alpha = Math.round(((bgDiff - 18) / 14) * 255);
      }

      rgbaBuffer[dstIdx] = r;
      rgbaBuffer[dstIdx + 1] = g;
      rgbaBuffer[dstIdx + 2] = b;
      rgbaBuffer[dstIdx + 3] = alpha;
    }
  }

  // Save transparent webp and png
  await sharp(rgbaBuffer, { raw: { width: cropW, height: cropH, channels: 4 } })
    .webp({ quality: 95, alphaQuality: 100 })
    .toFile('public/brand/logo.webp');

  await sharp(rgbaBuffer, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile('public/brand/logo.png');

  console.log('Saved transparent public/brand/logo.webp and logo.png');

  // Verify corners have alpha 0
  const check = await sharp('public/brand/logo.png').raw().toBuffer({ resolveWithObject: true });
  const checkData = check.data;
  const cW = check.info.width;
  const cH = check.info.height;

  function getA(x, y) {
    return checkData[(y * cW + x) * 4 + 3];
  }

  console.log('Corner alphas (should be 0):');
  console.log('Top-left (0,0):', getA(0, 0));
  console.log('Top-right (w-1,0):', getA(cW - 1, 0));
  console.log('Bottom-left (0,h-1):', getA(0, cH - 1));
  console.log('Bottom-right (w-1,h-1):', getA(cW - 1, cH - 1));

  // Generate public/og-card.jpg: 1200x630, logo centered on pure white with >= 10% padding
  const logoForOg = await sharp(rgbaBuffer, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .resize(800, null, { fit: 'inside' })
    .toBuffer();

  const ogLogoMeta = await sharp(logoForOg).metadata();
  const ogLeft = Math.round((1200 - ogLogoMeta.width) / 2);
  const ogTop = Math.round((630 - ogLogoMeta.height) / 2);

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  })
    .composite([{ input: logoForOg, left: ogLeft, top: ogTop }])
    .jpeg({ quality: 92 })
    .toFile('public/og-card.jpg');

  console.log('Generated public/og-card.jpg (1200x630, logo centered on white)');

  // Also generate crisp favicon and icon from the 'W' tile if needed
  // W tile is at x: 0..25 of the cropped logo, y: 0..42
  const wTileCrop = await sharp(rgbaBuffer, { raw: { width: cropW, height: cropH, channels: 4 } })
    .extract({ left: 0, top: 0, width: Math.round(cropW * 0.12), height: Math.round(cropH * 0.65) })
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/brand/w-tile.png');

  console.log('Generated public/brand/w-tile.png');
}

processBrandLogo();
