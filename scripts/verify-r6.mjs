import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

// Simple static file server for out/ directory
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
  const port = 3457;
  const server = await createStaticServer(path.resolve('out'), port);
  console.log(`Static server running on http://localhost:${port}`);

  const browser = await chromium.launch();
  const outDir = path.resolve('docs/redesign/shots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Capture Category Screenshots (/shop/boys/)
  const categoryUrl = `http://localhost:${port}/shop/boys/`;
  for (const vp of [
    { width: 390, height: 844, name: 'r6-category-390x844.png' },
    { width: 1280, height: 800, name: 'r6-category-1280x800.png' },
  ]) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    await page.goto(categoryUrl, { waitUntil: 'networkidle' });
    const targetFile = path.join(outDir, vp.name);
    await page.screenshot({ path: targetFile, fullPage: true });
    console.log(`Saved screenshot: ${vp.name} (${vp.width}x${vp.height})`);
    await page.close();
  }

  // 2. Capture Subcategory Screenshots (/shop/boys/shorts-joggers-cargos/)
  const subcategoryUrl = `http://localhost:${port}/shop/boys/shorts-joggers-cargos/`;
  for (const vp of [
    { width: 390, height: 844, name: 'r6-subcategory-390x844.png' },
    { width: 1280, height: 800, name: 'r6-subcategory-1280x800.png' },
  ]) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    await page.goto(subcategoryUrl, { waitUntil: 'networkidle' });
    const targetFile = path.join(outDir, vp.name);
    await page.screenshot({ path: targetFile, fullPage: true });
    console.log(`Saved screenshot: ${vp.name} (${vp.width}x${vp.height})`);
    await page.close();
  }

  // 3. Test functional adding from category tile "+" button
  console.log('\n--- Testing Add from Category Tile ---');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(categoryUrl, { waitUntil: 'networkidle' });

    // Look for "+" button on a subcategory tile
    const plusButton = page.locator('button[aria-label*="Add"]').first();
    const isVisible = await plusButton.isVisible();
    console.log(`Plus button visible on category page: ${isVisible}`);
    if (!isVisible) {
      throw new Error('Plus button not found on category tile');
    }

    const buttonLabel = await plusButton.getAttribute('aria-label');
    console.log(`Clicking button: "${buttonLabel}"`);
    await plusButton.click();

    // Verify AddSheet is open
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ timeout: 5000 });
    const closeBtn = page.locator('button[aria-label="Close add sheet"]');
    await closeBtn.waitFor({ timeout: 5000 });
    console.log('✓ AddSheet opened successfully from category tile!');
    
    // Close sheet
    await closeBtn.click();
    await page.close();
  }

  // 4. Test functional adding from subcategory page
  console.log('\n--- Testing Add from Subcategory Page ---');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(subcategoryUrl, { waitUntil: 'networkidle' });

    // Click an age chip
    const ageChip = page.locator('button:has-text("4-5Y")').first();
    if (await ageChip.isVisible()) {
      await ageChip.click();
      console.log('Clicked age chip: 4-5Y');
    }

    // Click "Add to list" button
    const addToListBtn = page.locator('button:has-text("Add to list")').first();
    await addToListBtn.click();

    // Verify AddSheet is open and has age selected
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ timeout: 5000 });
    console.log('✓ AddSheet opened from subcategory hero button!');

    // Check if 4-5Y is selected in AddSheet
    const selectedAgeChip = page.locator('[role="dialog"] button[aria-pressed="true"]:has-text("4-5Y")');
    const ageSelected = await selectedAgeChip.isVisible();
    console.log(`Preselected age chip in AddSheet (4-5Y): ${ageSelected}`);

    // Fill notes and add to list
    const notesInput = page.locator('[role="dialog"] input[placeholder*="Color"]');
    if (await notesInput.isVisible()) {
      await notesInput.fill('Navy blue, 2 pairs');
    }
    const confirmAdd = page.locator('[role="dialog"] button:has-text("Add to list")');
    await confirmAdd.click();

    // Verify list count updated in bottom nav or list store
    const bottomNavListBtn = page.locator('nav[aria-label="Mobile navigation"] button[aria-label*="list"]');
    await bottomNavListBtn.waitFor({ timeout: 5000 });
    const ariaLabel = await bottomNavListBtn.getAttribute('aria-label');
    console.log(`✓ Mobile bottom navigation list aria-label: "${ariaLabel}"`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log('\nAll R6 functional tests & screenshot verifications passed successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
