import http from 'http';
import fs from 'fs';
import path from 'path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

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
    if (reqPath.endsWith('/')) reqPath += 'index.html';
    if (reqPath.startsWith('/')) reqPath = reqPath.slice(1);
    const filePath = path.join(dir, reqPath);

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

async function auditUrl(url, port) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'seo'],
    port: chrome.port,
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      disabled: false,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  };

  const runnerResult = await lighthouse(url, options);
  await chrome.kill();

  const lhr = runnerResult.lhr;
  return {
    performance: Math.round((lhr.categories.performance?.score || 0) * 100),
    accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
    seo: Math.round((lhr.categories.seo?.score || 0) * 100),
    cls: lhr.audits['cumulative-layout-shift']?.numericValue ?? 0,
    lcp: (lhr.audits['largest-contentful-paint']?.numericValue ?? 0) / 1000,
  };
}

async function main() {
  const port = 3510;
  const server = await createStaticServer(path.resolve('out'), port);
  console.log(`Static server running on http://localhost:${port}`);

  console.log('\nRunning Lighthouse Mobile on Homepage (http://localhost:' + port + '/)...');
  const homeResult = await auditUrl(`http://localhost:${port}/`, port);
  console.log('Homepage Result:', homeResult);

  console.log('\nRunning Lighthouse Mobile on /shop/boys/ (http://localhost:' + port + '/shop/boys/)...');
  const boysResult = await auditUrl(`http://localhost:${port}/shop/boys/`, port);
  console.log('Shop Boys Result:', boysResult);

  server.close();

  console.log('\n=== LIGHTHOUSE MOBILE SUMMARY ===');
  console.log(`Homepage: Perf ${homeResult.performance}, A11y ${homeResult.accessibility}, SEO ${homeResult.seo}, CLS: ${homeResult.cls.toFixed(3)}`);
  console.log(`Category Boys: Perf ${boysResult.performance}, A11y ${boysResult.accessibility}, SEO ${boysResult.seo}, CLS: ${boysResult.cls.toFixed(3)}`);

  if (homeResult.cls > 0.05 || boysResult.cls > 0.05) {
    console.error('FAIL: CLS exceeded 0.05');
    process.exit(1);
  } else {
    console.log('PASS: CLS <= 0.05 on all tested routes');
  }
}

main().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
