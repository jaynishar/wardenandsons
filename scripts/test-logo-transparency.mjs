import sharp from 'sharp';

async function testLogoTransparency() {
  const logo = sharp('public/brand/logo.png');
  const meta = await logo.metadata();

  const backgrounds = [
    { name: 'yellow', color: { r: 246, g: 239, b: 75 } },
    { name: 'blue', color: { r: 37, g: 102, b: 174 } },
    { name: 'red', color: { r: 223, g: 35, b: 44 } },
    { name: 'navy', color: { r: 14, g: 26, b: 51 } }
  ];

  for (const bg of backgrounds) {
    const testImg = await sharp({
      create: {
        width: meta.width + 40,
        height: meta.height + 40,
        channels: 3,
        background: bg.color
      }
    })
      .composite([{ input: 'public/brand/logo.png', left: 20, top: 20 }])
      .png()
      .toFile(`docs/redesign-v2/shots/test-logo-on-${bg.name}.png`);

    console.log(`Rendered logo on ${bg.name} to docs/redesign-v2/shots/test-logo-on-${bg.name}.png`);
  }

  // Check corner pixels of composite: pixel at (5, 5) must be exact background color
  const sample = await sharp(`docs/redesign-v2/shots/test-logo-on-yellow.png`).raw().toBuffer({ resolveWithObject: true });
  const p = [sample.data[0], sample.data[1], sample.data[2]];
  console.log('Background check on yellow composite corner (0,0):', p);
  const isMatch = (p[0] === 246 && p[1] === 239 && p[2] === 75);
  console.log('Corner is exact background (no white box):', isMatch);
}

testLogoTransparency();
