import { describe, it, expect } from 'vitest';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

describe('Brand Logo Alpha & Transparency', () => {
  const logoPath = path.resolve(process.cwd(), 'public/brand/logo.png');

  it('logo.png file exists in public/brand/', () => {
    expect(fs.existsSync(logoPath)).toBe(true);
  });

  it('has RGBA channels with alpha support', async () => {
    const meta = await sharp(logoPath).metadata();
    expect(meta.channels).toBe(4);
    expect(meta.hasAlpha).toBe(true);
  });

  it('corners are fully transparent with alpha = 0 (no white box)', async () => {
    const { data, info } = await sharp(logoPath).raw().toBuffer({ resolveWithObject: true });
    // Check top-left pixel (0, 0)
    const tlAlpha = data[3];
    // Check top-right pixel (width-1, 0)
    const trIndex = (info.width - 1) * info.channels;
    const trAlpha = data[trIndex + 3];
    // Check bottom-left pixel (0, height-1)
    const blIndex = (info.height - 1) * info.width * info.channels;
    const blAlpha = data[blIndex + 3];
    // Check bottom-right pixel (width-1, height-1)
    const brIndex = ((info.height - 1) * info.width + (info.width - 1)) * info.channels;
    const brAlpha = data[brIndex + 3];

    expect(tlAlpha).toBe(0);
    expect(trAlpha).toBe(0);
    expect(blAlpha).toBe(0);
    expect(brAlpha).toBe(0);
  });
});
