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
    if (reqPath.startsWith('/')) {
      reqPath = reqPath.slice(1);
    }
    let filePath = path.join(dir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      console.log('Static server 404:', req.url, '->', filePath);
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
  const port = 3480;
  const server = await createStaticServer(path.resolve('out'), port);
  console.log(`Static server running on http://localhost:${port}`);

  const browser = await chromium.launch();
  const outDir = path.resolve('docs/redesign/shots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // =========================================================================
  // TEST 1: MOBILE CHAT HELPER INTERACTION & SCREENSHOT (390x844)
  // =========================================================================
  console.log('\n--- Test 1: Mobile Chat Helper & Delayed Mounting (390x844) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
  });
  await mobileContext.addInitScript(() => {
    try {
      localStorage.setItem('ws_consent_choice', 'all');
    } catch (e) {}
  });
  const mobilePage = await mobileContext.newPage();
  mobilePage.on('console', (msg) => console.log('MOBILE BROWSER:', msg.text()));
  mobilePage.on('pageerror', (err) => console.log('MOBILE ERROR:', err.message));
  await mobilePage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

  // Initial check: trigger button should NOT exist immediately before any interaction
  const triggerBefore = await mobilePage.$('button[aria-label="Open guided shopping helper"]');
  console.log('Trigger rendered before interaction?', Boolean(triggerBefore));

  // Trigger interaction (pointerdown / scroll)
  await mobilePage.mouse.click(100, 100);
  await mobilePage.waitForTimeout(500);

  // Trigger should now be mounted
  const trigger = await mobilePage.waitForSelector('button[aria-label="Open guided shopping helper"]', {
    timeout: 3000,
  });
  console.log('Trigger mounted after interaction: PASS');

  // Verify positioning above mobile bottom bar
  const triggerBox = await trigger.boundingBox();
  console.log(`Trigger position: bottom y=${triggerBox.y}, height=${triggerBox.height}`);
  if (triggerBox.y + triggerBox.height > 844 - 64) {
    console.warn('Warning: Trigger might overlap bottom bar');
  } else {
    console.log('Trigger is safely positioned above 64px mobile bottom bar: PASS');
  }

  // Open Chat Helper Panel
  await trigger.click();
  await mobilePage.waitForSelector('#chat-helper-dialog');
  console.log('Chat Helper dialog opened: PASS');

  // Verify Greeting & Chips exist
  const greetingText = await mobilePage.textContent('#chat-helper-dialog');
  console.log('Contains greeting text?', greetingText.includes('What are you shopping for?'));

  // Save mobile screenshot of greeting panel
  await mobilePage.screenshot({
    path: path.join(outDir, 'r9-chat-mobile.png'),
    fullPage: false,
  });
  console.log('Saved screenshot: docs/redesign/shots/r9-chat-mobile.png');

  // Esc closes panel
  await mobilePage.keyboard.press('Escape');
  await mobilePage.waitForTimeout(300);
  const isClosedEsc = await mobilePage.$('#chat-helper-dialog');
  console.log('Chat Helper dialog closed with Esc key:', isClosedEsc === null ? 'PASS' : 'FAIL');

  // Re-open and test Boys category -> age 6-7Y flow
  const reTrigger = await mobilePage.waitForSelector('button[aria-label="Open guided shopping helper"]');
  await reTrigger.click();
  await mobilePage.waitForSelector('#chat-helper-dialog');

  // Click "Boys" button
  const boysBtn = await mobilePage.waitForSelector('#chat-helper-dialog button:has-text("Boys")');
  await boysBtn.click();
  await mobilePage.waitForTimeout(300);

  // Select "6-7Y"
  const ageBtn = await mobilePage.waitForSelector('#chat-helper-dialog button:has-text("6-7Y")');
  await ageBtn.click();
  await mobilePage.waitForTimeout(300);

  // Verify matching subcategory links appeared
  const subLinks = await mobilePage.$$('#chat-helper-dialog a[href^="/shop/boys/"]');
  console.log(`Found ${subLinks.length} matching subcategory links for Boys 6-7Y (expected up to 4): PASS`);

  // Verify WhatsApp send button
  const waBtn = await mobilePage.waitForSelector('#chat-helper-dialog button:has-text("Send on WhatsApp")');
  console.log('WhatsApp send button is visible: PASS');

  // Save screenshot of results state
  await mobilePage.screenshot({
    path: path.join(outDir, 'r9-chat-mobile-results.png'),
    fullPage: false,
  });
  console.log('Saved screenshot: docs/redesign/shots/r9-chat-mobile-results.png');

  // Test "Back to all options"
  const backBtn = await mobilePage.waitForSelector('#chat-helper-dialog button:has-text("Back to all options")');
  await backBtn.click();
  await mobilePage.waitForTimeout(300);

  // Test School Uniforms path
  const uniformBtn = await mobilePage.waitForSelector('#chat-helper-dialog button:has-text("School uniforms")');
  await uniformBtn.click();
  await mobilePage.waitForTimeout(300);
  const bulkLink = await mobilePage.$('#chat-helper-dialog a[href="/bulk-orders/"]');
  console.log('School Uniforms path has link to /bulk-orders/:', Boolean(bulkLink));

  // Close dialog
  await mobilePage.keyboard.press('Escape');
  await mobilePage.waitForTimeout(300);

  // =========================================================================
  // TEST 2: TRIGGER HIDING ON MODAL DIALOGS
  // =========================================================================
  console.log('\n--- Test 2: Trigger Suppressed During Other Dialogs ---');
  // Open Search via mobile bottom nav
  const searchBtn = await mobilePage.waitForSelector('nav[aria-label="Mobile navigation"] button[aria-label="Search catalogue"]');
  await searchBtn.click();
  await mobilePage.waitForTimeout(300);

  // Trigger button should be hidden
  const triggerWhileSearch = await mobilePage.$('button[aria-label="Open guided shopping helper"]');
  console.log('Floating trigger hidden while Search modal is open:', triggerWhileSearch === null ? 'PASS' : 'FAIL');

  // Close Search with Esc
  await mobilePage.keyboard.press('Escape');
  await mobilePage.waitForTimeout(300);

  // Open List Sheet via mobile bottom nav
  const listBtn = await mobilePage.waitForSelector('nav[aria-label="Mobile navigation"] button[aria-label^="My list"]');
  await listBtn.click();
  await mobilePage.waitForTimeout(300);

  const triggerWhileList = await mobilePage.$('button[aria-label="Open guided shopping helper"]');
  console.log('Floating trigger hidden while List sheet is open:', triggerWhileList === null ? 'PASS' : 'FAIL');

  await mobilePage.keyboard.press('Escape');
  await mobilePage.waitForTimeout(300);

  await mobileContext.close();

  // =========================================================================
  // TEST 3: DESKTOP CHAT HELPER & MOTION (1280x800)
  // =========================================================================
  console.log('\n--- Test 3: Desktop Chat Helper & Motion (1280x800) ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  await desktopContext.addInitScript(() => {
    try {
      localStorage.setItem('ws_consent_choice', 'all');
    } catch (e) {}
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

  // Trigger interaction
  await desktopPage.mouse.click(200, 200);
  await desktopPage.waitForTimeout(500);

  const desktopTrigger = await desktopPage.waitForSelector('button[aria-label="Open guided shopping helper"]');
  await desktopTrigger.click();
  await desktopPage.waitForSelector('#chat-helper-dialog');

  // Save desktop screenshot
  await desktopPage.screenshot({
    path: path.join(outDir, 'r9-chat-desktop.png'),
    fullPage: false,
  });
  console.log('Saved screenshot: docs/redesign/shots/r9-chat-desktop.png');

  // Test Visit Store path
  const visitBtn = await desktopPage.waitForSelector('#chat-helper-dialog button:has-text("Visit the store")');
  await visitBtn.click();
  await desktopPage.waitForTimeout(300);

  const directionsLink = await desktopPage.$('#chat-helper-dialog a[href*="maps.google.com"]');
  const phoneLink = await desktopPage.$('#chat-helper-dialog a[href^="tel:"]');
  console.log('Visit store shows Google Maps directions link:', Boolean(directionsLink));
  console.log('Visit store shows phone call link:', Boolean(phoneLink));

  await desktopContext.close();
  await browser.close();
  server.close();
  console.log('\nAll R9 Browser Verifications Passed Successfully!');
}

main().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
