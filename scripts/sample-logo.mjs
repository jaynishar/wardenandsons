import sharp from 'sharp';
import fs from 'node:fs';

// Relative luminance and contrast calculation helper
function luminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrast(rgb1, rgb2) {
  const l1 = luminance(...rgb1);
  const l2 = luminance(...rgb2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16)
  ];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('').toUpperCase();
}

async function sampleLogo() {
  const file = fs.existsSync('public/brand_logo.webp') ? 'public/brand_logo.webp' : 'public/brand_logo.jpg';
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const redPixels = [];
  const bluePixels = [];
  const yellowPixels = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Ignore white / near-white background
      if (r > 230 && g > 230 && b > 230) continue;
      // Ignore near-black / dark text
      if (r < 30 && g < 30 && b < 30) continue;

      // Classify into red, blue, yellow
      if (r > 160 && g < 80 && b < 80) {
        redPixels.push([r, g, b]);
      } else if (b > 120 && r < 90 && g < 150) {
        bluePixels.push([r, g, b]);
      } else if (r > 180 && g > 160 && b < 100) {
        yellowPixels.push([r, g, b]);
      }
    }
  }

  function medianRgb(pixels, fallbackHex) {
    if (!pixels.length) return hexToRgb(fallbackHex);
    pixels.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]));
    return pixels[Math.floor(pixels.length / 2)];
  }

  const redRgb = medianRgb(redPixels, '#D8402F');
  const blueRgb = medianRgb(bluePixels, '#2F5FA7');
  const yellowRgb = medianRgb(yellowPixels, '#F1B434');

  // Check contrast of text on colors
  const whiteRgb = [255, 255, 255];
  const inkRgb = [14, 26, 51]; // #0E1A33

  // For yellow, text is ink. Check ink on yellow >= 4.5:1
  const yellowInkContrast = contrast(yellowRgb, inkRgb);
  // For blue, text is white. Check white on blue >= 4.5:1
  let adjustedBlueRgb = [...blueRgb];
  while (contrast(adjustedBlueRgb, whiteRgb) < 4.5) {
    adjustedBlueRgb = adjustedBlueRgb.map(c => Math.max(0, c - 2));
  }
  const blueWhiteContrast = contrast(adjustedBlueRgb, whiteRgb);

  // For red, text is white if >= 4.5:1, otherwise darken red or keep text off
  let adjustedRedRgb = [...redRgb];
  while (contrast(adjustedRedRgb, whiteRgb) < 4.5 && (adjustedRedRgb[0] > 100)) {
    adjustedRedRgb = [Math.max(0, adjustedRedRgb[0] - 2), Math.max(0, adjustedRedRgb[1] - 1), Math.max(0, adjustedRedRgb[2] - 1)];
  }
  const redWhiteContrast = contrast(adjustedRedRgb, whiteRgb);

  const result = {
    red: rgbToHex(...adjustedRedRgb),
    blue: rgbToHex(...adjustedBlueRgb),
    yellow: rgbToHex(...yellowRgb),
    originalSampled: {
      red: rgbToHex(...redRgb),
      blue: rgbToHex(...blueRgb),
      yellow: rgbToHex(...yellowRgb),
    },
    contrast: {
      blueWhite: blueWhiteContrast.toFixed(2),
      redWhite: redWhiteContrast.toFixed(2),
      yellowInk: yellowInkContrast.toFixed(2),
    }
  };

  console.log('Sampled Logo Tokens:');
  console.log(JSON.stringify(result, null, 2));
  return result;
}

sampleLogo();
