import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

// Simple static file server for out/ directory + mock leads endpoint
function createTestServer(outDir, port) {
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

  let mockShouldFail = false;

  const server = http.createServer((req, res) => {
    // Enable CORS for testing
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // Handle mock leads endpoint
    if (req.url === '/api/leads' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body);
          console.log(`Mock endpoint received lead ref: ${payload.reference}, consent: ${payload.consent}`);
          
          if (mockShouldFail) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: 'Database simulated failure' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true }));
          }
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'Bad JSON' }));
        }
      });
      return;
    }

    // Static files from out/
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath.endsWith('/')) {
      reqPath += 'index.html';
    }
    let filePath = path.join(outDir, reqPath);

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

  return {
    server: new Promise((resolve) => server.listen(port, () => resolve(server))),
    setFailMode: (fail) => { mockShouldFail = fail; },
    close: () => server.close(),
  };
}

async function main() {
  const port = 3459;
  const mockServer = createTestServer(path.resolve('out'), port);
  await mockServer.server;
  console.log(`Test server running on http://localhost:${port}`);

  const browser = await chromium.launch();
  const outDir = path.resolve('docs/redesign/shots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // TEST 1: Unset endpoint hides the button
  console.log('\n--- Test 1: Verify button is hidden when endpoint is unset ---');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`http://localhost:${port}/shop/boys/`, { waitUntil: 'networkidle' });

    // Add item to list via tile plus button
    const plusBtn = page.locator('button[aria-label*="Add"]').first();
    await plusBtn.click();
    const addSheet = page.locator('[role="dialog"]');
    await addSheet.waitFor({ timeout: 5000 });
    const addToListBtn = addSheet.locator('button:has-text("Add to list")');
    await addToListBtn.click();

    // Open My List sheet from desktop header
    const myListBtn = page.locator('header button[aria-label*="My list"]').first();
    await myListBtn.click();
    const listSheet = page.locator('[role="dialog"]');
    await listSheet.waitFor({ timeout: 5000 });

    // Check that "Prefer a call?" button is NOT rendered
    const callBtn = listSheet.locator('button:has-text("Prefer a call?")');
    const isVisible = await callBtn.isVisible();
    console.log(`"Prefer a call?" button visible when endpoint unset: ${isVisible}`);
    if (isVisible) {
      throw new Error('FAIL: "Prefer a call?" button should be hidden when endpoint is unset');
    }
    console.log('✓ PASS: "Prefer a call?" button is hidden when endpoint is unset');

    await page.close();
  }

  // TEST 2: With endpoint set, button appears and opens form; capture screenshots
  console.log('\n--- Test 2: Verify form opens with endpoint set & capture screenshots ---');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`http://localhost:${port}/shop/boys/`, { waitUntil: 'networkidle' });

    // Inject override before opening list
    await page.evaluate((endpoint) => {
      window.__LEADS_ENDPOINT_OVERRIDE__ = endpoint;
    }, `http://localhost:${port}/api/leads`);

    // Add item to list
    const plusBtn = page.locator('button[aria-label*="Add"]').first();
    await plusBtn.click();
    const addSheet = page.locator('[role="dialog"]');
    await addSheet.waitFor({ timeout: 5000 });
    const addToListBtn = addSheet.locator('button:has-text("Add to list")');
    await addToListBtn.click();

    // Open My List sheet
    const myListBtn = page.locator('header button[aria-label*="My list"]').first();
    await myListBtn.click();

    // Ensure endpoint override persists in state
    await page.evaluate((endpoint) => {
      window.__LEADS_ENDPOINT_OVERRIDE__ = endpoint;
    }, `http://localhost:${port}/api/leads`);

    // Re-trigger render of list sheet if needed
    const listSheet = page.locator('[role="dialog"]');
    await listSheet.waitFor({ timeout: 5000 });

    const callBtn = page.locator('button:has-text("Prefer a call?")');
    await callBtn.waitFor({ timeout: 5000 });
    console.log('✓ PASS: "Prefer a call?" button is visible when endpoint is set');

    // Click "Prefer a call?"
    await callBtn.click();

    // Verify CallbackForm dialog opens
    const callbackDialog = page.locator('[role="dialog"]').last();
    await callbackDialog.waitFor({ timeout: 5000 });
    console.log('✓ PASS: Callback dialog opened successfully');

    // Fill in partial form details for desktop screenshot
    await page.locator('#cb-phone').fill('+91 99207 51567');
    await page.locator('#cb-name').fill('Priya Sharma');
    await page.locator('button:has-text("Morning")').click();

    // Take Desktop Screenshot (1280x800)
    await page.screenshot({ path: path.join(outDir, 'r7-call-form-1280x800.png') });
    console.log('Saved screenshot: r7-call-form-1280x800.png');

    await page.close();
  }

  // Mobile Screenshot (390x844)
  console.log('\n--- Capturing Mobile Screenshot (390x844) ---');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`http://localhost:${port}/shop/boys/`, { waitUntil: 'networkidle' });

    await page.evaluate((endpoint) => {
      window.__LEADS_ENDPOINT_OVERRIDE__ = endpoint;
    }, `http://localhost:${port}/api/leads`);

    // Add item to list
    const plusBtn = page.locator('button[aria-label*="Add"]').first();
    await plusBtn.click();
    const addSheet = page.locator('[role="dialog"]');
    await addSheet.waitFor({ timeout: 5000 });
    const addToListBtn = addSheet.locator('button:has-text("Add to list")');
    await addToListBtn.click();

    // Open My List from bottom nav
    const bottomNavListBtn = page.locator('nav[aria-label="Mobile navigation"] button[aria-label*="list"]');
    await bottomNavListBtn.click();

    await page.evaluate((endpoint) => {
      window.__LEADS_ENDPOINT_OVERRIDE__ = endpoint;
    }, `http://localhost:${port}/api/leads`);

    const callBtn = page.locator('button:has-text("Prefer a call?")');
    await callBtn.waitFor({ timeout: 5000 });
    await callBtn.click();

    const callbackDialog = page.locator('[role="dialog"]').last();
    await callbackDialog.waitFor({ timeout: 5000 });

    await page.locator('#cb-phone').fill('9920751567');
    await page.locator('#cb-name').fill('Rohit Mehta');
    await page.locator('button:has-text("Evening")').click();

    await page.screenshot({ path: path.join(outDir, 'r7-call-form-390x844.png') });
    console.log('Saved screenshot: r7-call-form-390x844.png');

    await page.close();
  }

  // TEST 3: Success state with fake endpoint
  console.log('\n--- Test 3: Verify Success State with fake endpoint ---');
  {
    mockServer.setFailMode(false);
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`http://localhost:${port}/shop/boys/`, { waitUntil: 'networkidle' });

    await page.evaluate((endpoint) => {
      window.__LEADS_ENDPOINT_OVERRIDE__ = endpoint;
    }, `http://localhost:${port}/api/leads`);

    // Add item and open form
    const plusBtn = page.locator('button[aria-label*="Add"]').first();
    await plusBtn.click();
    const addSheet = page.locator('[role="dialog"]');
    await addSheet.waitFor({ timeout: 5000 });
    await addSheet.locator('button:has-text("Add to list")').click();

    const bottomNavListBtn = page.locator('nav[aria-label="Mobile navigation"] button[aria-label*="list"]');
    await bottomNavListBtn.click();

    await page.evaluate((endpoint) => {
      window.__LEADS_ENDPOINT_OVERRIDE__ = endpoint;
    }, `http://localhost:${port}/api/leads`);

    await page.locator('button:has-text("Prefer a call?")').click();
    const callbackDialog = page.locator('[role="dialog"]').last();
    await callbackDialog.waitFor({ timeout: 5000 });

    // Check submit is disabled before consent
    await page.locator('#cb-phone').fill('9920751567');
    const submitBtn = page.locator('button[type="submit"]:has-text("Request a call")');
    expect(await submitBtn.isDisabled()).toBe(true);
    console.log('✓ Submit disabled when consent unticked');

    // Tick consent
    await page.locator('input[type="checkbox"]').check();
    expect(await submitBtn.isDisabled()).toBe(false);
    console.log('✓ Submit enabled after consent ticked & phone valid');

    // Wait 2.1 seconds to satisfy speed rule
    console.log('Waiting 2.1s for speed rule...');
    await page.waitForTimeout(2100);

    // Submit form
    await submitBtn.click();

    // Verify success state text: "Thanks. We'll call you soon."
    const successHeading = page.locator('h3:has-text("Thanks. We\'ll call you soon.")');
    await successHeading.waitFor({ timeout: 5000 });
    console.log('✓ PASS: Success state displayed correctly with copy-deck string!');

    await page.close();
  }

  // TEST 4: Failure state with fake endpoint
  console.log('\n--- Test 4: Verify Failure State with fake endpoint ---');
  {
    mockServer.setFailMode(true); // Simulate failure
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`http://localhost:${port}/shop/boys/`, { waitUntil: 'networkidle' });

    await page.evaluate((endpoint) => {
      window.__LEADS_ENDPOINT_OVERRIDE__ = endpoint;
    }, `http://localhost:${port}/api/leads`);

    // Add item and open form
    const plusBtn = page.locator('button[aria-label*="Add"]').first();
    await plusBtn.click();
    const addSheet = page.locator('[role="dialog"]');
    await addSheet.waitFor({ timeout: 5000 });
    await addSheet.locator('button:has-text("Add to list")').click();

    const bottomNavListBtn = page.locator('nav[aria-label="Mobile navigation"] button[aria-label*="list"]');
    await bottomNavListBtn.click();

    await page.evaluate((endpoint) => {
      window.__LEADS_ENDPOINT_OVERRIDE__ = endpoint;
    }, `http://localhost:${port}/api/leads`);

    await page.locator('button:has-text("Prefer a call?")').click();
    const callbackDialog = page.locator('[role="dialog"]').last();
    await callbackDialog.waitFor({ timeout: 5000 });

    await page.locator('#cb-phone').fill('9820012345');
    await page.locator('input[type="checkbox"]').check();

    // Wait 2.1s
    await page.waitForTimeout(2100);

    // Submit
    await page.locator('button[type="submit"]:has-text("Request a call")').click();

    // Verify failure state displays call.fail
    const failMessage = page.locator('text="Couldn\'t save your number. Please message us on WhatsApp instead."');
    await failMessage.waitFor({ timeout: 5000 });
    console.log('✓ PASS: Failure state displayed call.fail correctly!');

    // Verify WhatsApp alternative button is displayed
    const waFallbackBtn = page.locator('a:has-text("Chat on WhatsApp instead")');
    const waFallbackVisible = await waFallbackBtn.isVisible();
    console.log(`✓ PASS: WhatsApp fallback button visible: ${waFallbackVisible}`);
    if (!waFallbackVisible) {
      throw new Error('FAIL: WhatsApp fallback button not visible on failure');
    }

    await page.close();
  }

  await browser.close();
  mockServer.close();
  console.log('\n======================================================');
  console.log('🎉 ALL R7 VERIFICATION CHECKS PASSED SUCCESSFULLY!');
  console.log('======================================================\n');
}

function expect(val) {
  return {
    toBe: (expected) => {
      if (val !== expected) throw new Error(`Expected ${expected} but got ${val}`);
    },
  };
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
