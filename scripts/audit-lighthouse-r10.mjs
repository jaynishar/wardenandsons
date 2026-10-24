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

async function auditUrl(url) {
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
    tbt: lhr.audits['total-blocking-time']?.numericValue ?? 0,
  };
}

async function main() {
  const port = 3520;
  const server = await createStaticServer(path.resolve('out'), port);
  console.log(`Static server running on http://localhost:${port}`);

  const routes = [
    { name: '/', path: '/' },
    { name: '/shop/', path: '/shop/' },
    { name: '/shop/newborn/', path: '/shop/newborn/' },
    { name: '/shop/boys/shorts-joggers-cargos/', path: '/shop/boys/shorts-joggers-cargos/' },
    { name: '/bulk-orders/', path: '/bulk-orders/' },
    { name: '/blog/newborn-clothing-essentials-mumbai/', path: '/blog/newborn-clothing-essentials-mumbai/' },
  ];

  const results = [];

  for (const r of routes) {
    console.log(`\nAuditing ${r.name}...`);
    const res = await auditUrl(`http://localhost:${port}${r.path}`);
    console.log(`Result for ${r.name}:`, res);
    results.push({ ...r, ...res });
  }

  server.close();

  console.log('\n========================================================================');
  console.log('FINAL LIGHTHOUSE MOBILE RESULTS (R10)');
  console.log('========================================================================');
  console.table(
    results.map((r) => ({
      Route: r.name,
      Perf: r.performance,
      A11y: r.accessibility,
      SEO: r.seo,
      'LCP (s)': r.lcp.toFixed(2),
      'CLS': r.cls.toFixed(3),
      'TBT (ms)': Math.round(r.tbt),
    }))
  );

  fs.writeFileSync(
    path.resolve('docs/redesign/r10-lighthouse.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('Saved results to docs/redesign/r10-lighthouse.json');
}

main().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
