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
    let reqPath = req.url.split('?')[0];
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
  const port = 3456;
  const server = await createStaticServer(path.resolve('out'), port);
  console.log(`Static server running on http://localhost:${port}`);

  const browser = await chromium.launch();

  const viewports = [
    { width: 360, height: 640, name: 'r5-home-360x640.png' },
    { width: 390, height: 844, name: 'r5-home-390x844.png' },
    { width: 768, height: 1024, name: 'r5-home-768x1024.png' },
    { width: 1280, height: 800, name: 'r5-home-1280x800.png' },
  ];

  const outDir = path.resolve('docs/redesign/shots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    const targetFile = path.join(outDir, vp.name);
    await page.screenshot({ path: targetFile, fullPage: true });
    console.log(`Saved screenshot: ${vp.name} (${vp.width}x${vp.height})`);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('All screenshots captured successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
