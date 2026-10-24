import sharp from 'sharp';

async function inspect() {
  const { data, info } = await sharp('public/brand_logo.webp').raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  function px(x, y) {
    const i = (y * width + x) * channels;
    return [data[i], data[i+1], data[i+2]];
  }

  // Let's find columns where vertical lines of colored tiles exist
  console.log('--- Logo Analysis ---');
  // At y=96 to 105: "KIDS WEAR"
  // Let's check text "KIDS WEAR"
  console.log('Checking KIDS WEAR line:');
  for (let x = 20; x <= 260; x += 5) {
    const p = px(x, 100);
    if (p[2] > 120 && p[0] < 80) {
      console.log(`x=${x} blue pixel in KIDS WEAR: [${p.join(',')}]`);
    }
  }
}

inspect();
