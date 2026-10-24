import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

function createStaticServer(dir, port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath.endsWith('/')) {
      reqPath += 'index.html';
    }
    let filePath = path.join(dir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function main() {
  const port = 3460;
  const server = await createStaticServer(path.resolve('out'), port);
  console.log(`Static server running on http://localhost:${port}`);

  const browser = await chromium.launch();
  const outDir = path.resolve('docs/redesign/shots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. DESKTOP SEARCH VERIFICATION (1280x800)
  console.log('\n--- Test 1: Desktop Search ("jhabla", "nightsuit", "cricket") ---');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

    // Click desktop header search button
    const searchBtn = page.locator('header button[aria-label="Search catalogue"]').first();
    await searchBtn.click();

    // Verify SearchOverlay is open
    const searchInput = page.locator('input[type="search"]');
    await searchInput.waitFor({ timeout: 5000 });
    console.log('✓ Search dialog opened on desktop');

    // Test query 1: "jhabla"
    await searchInput.fill('jhabla');
    const jhablaResult = page.locator('li:has-text("Bodysuits & Jhablas")');
    await jhablaResult.waitFor({ timeout: 5000 });
    console.log('✓ Search "jhabla" found: Bodysuits & Jhablas');

    // Capture desktop search screenshot
    await page.screenshot({ path: path.join(outDir, 'r8-search-1280x800.png') });
    console.log('Saved screenshot: r8-search-1280x800.png');

    // Test query 2: "nightsuit"
    await searchInput.fill('nightsuit');
    const nightwearResult = page.locator('li:has-text("Nightwear")').first();
    await nightwearResult.waitFor({ timeout: 5000 });
    console.log('✓ Search "nightsuit" found: Nightwear');

    // Test query 3: "cricket"
    await searchInput.fill('cricket');
    const cricketResult = page.locator('li:has-text("Sportswear & Cricket Whites")');
    await cricketResult.waitFor({ timeout: 5000 });
    console.log('✓ Search "cricket" found: Sportswear & Cricket Whites');

    // Test keyboard selection: hit Enter on first result
    await searchInput.press('Enter');
    await page.waitForFunction(() => window.location.pathname.includes('sportswear-cricket-whites'));
    console.log('✓ Enter key navigated to: /shop/boys/sportswear-cricket-whites/');

    await page.close();
  }

  // 2. MOBILE SEARCH VERIFICATION (390x844)
  console.log('\n--- Test 2: Mobile Search (390x844) ---');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

    // Click mobile bottom nav search button
    const mobileSearchBtn = page.locator('nav[aria-label="Mobile navigation"] button[aria-label="Search catalogue"]');
    await mobileSearchBtn.click();

    const searchInput = page.locator('input[type="search"]');
    await searchInput.waitFor({ timeout: 5000 });
    console.log('✓ Search dialog opened on mobile');

    await searchInput.fill('jhabla');
    const jhablaResult = page.locator('li:has-text("Bodysuits & Jhablas")');
    await jhablaResult.waitFor({ timeout: 5000 });

    await page.screenshot({ path: path.join(outDir, 'r8-search-390x844.png') });
    console.log('Saved screenshot: r8-search-390x844.png');

    await page.close();
  }

  // 3. HOMEPAGE AGE CARD & PERSISTENCE & ADD SHEET PRESELECTION
  console.log('\n--- Test 3: Age Card Selection, Persistence & AddSheet Preselection ---');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

    // Verify Age Card is visible under hero
    const ageCardSection = page.locator('section[aria-label="Filter catalogue by child age"]');
    await ageCardSection.waitFor({ timeout: 5000 });
    console.log('✓ Age Card rendered on homepage');

    // Screenshot AgeCard initial state (desktop)
    await page.screenshot({ path: path.join(outDir, 'r8-agecard-1280x800.png') });
    console.log('Saved screenshot: r8-agecard-1280x800.png');

    // Click age chip "4-5Y"
    const chip45 = ageCardSection.locator('button:has-text("4-5Y")');
    await chip45.click();
    console.log('Clicked age chip: 4-5Y');

    // Verify card collapses to single line: "Showing sizes for 4-5Y"
    const collapsedText = page.locator('text="Showing sizes for 4-5Y"');
    await collapsedText.waitFor({ timeout: 5000 });
    console.log('✓ Age Card collapsed to single line: "Showing sizes for 4-5Y"');

    // Reload page to test localStorage persistence
    console.log('Reloading page to test persistence...');
    await page.reload({ waitUntil: 'networkidle' });

    const persistedText = page.locator('text="Showing sizes for 4-5Y"');
    await persistedText.waitFor({ timeout: 5000 });
    console.log('✓ Age Card persists selection across reloads: "Showing sizes for 4-5Y"');

    // Navigate to /shop/boys/
    console.log('Navigating to /shop/boys/ ...');
    await page.goto(`http://localhost:${port}/shop/boys/`, { waitUntil: 'networkidle' });

    // Verify "Fits 4-5Y" badge is rendered on tiles covering 4-5Y
    const fitsBadge = page.locator('span:has-text("Fits 4-5Y")').first();
    await fitsBadge.waitFor({ timeout: 5000 });
    console.log('✓ "Fits 4-5Y" badge is displayed on subcategory tiles');

    // Click "+" button on a subcategory tile
    const plusBtn = page.locator('button[aria-label*="Add"]').first();
    await plusBtn.click();

    // Verify AddSheet dialog opens with "4-5Y" chip preselected!
    const addSheet = page.locator('[role="dialog"]');
    await addSheet.waitFor({ timeout: 5000 });
    console.log('✓ AddSheet opened');

    const preselectedChip = addSheet.locator('button[aria-pressed="true"]:has-text("4-5Y")');
    const isPreselected = await preselectedChip.isVisible();
    console.log(`✓ AddSheet has 4-5Y preselected: ${isPreselected}`);
    if (!isPreselected) {
      throw new Error('FAIL: Expected 4-5Y to be preselected in AddSheet');
    }

    await page.close();
  }

  // 4. MOBILE AGE CARD SCREENSHOT (390x844)
  console.log('\n--- Capturing Mobile Age Card Screenshot (390x844) ---');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

    const ageCardSection = page.locator('section[aria-label="Filter catalogue by child age"]');
    await ageCardSection.waitFor({ timeout: 5000 });

    await page.screenshot({ path: path.join(outDir, 'r8-agecard-390x844.png') });
    console.log('Saved screenshot: r8-agecard-390x844.png');

    await page.close();
  }

  await browser.close();
  server.close();
  console.log('\n======================================================');
  console.log('🎉 ALL R8 VERIFICATION CHECKS PASSED SUCCESSFULLY!');
  console.log('======================================================\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
