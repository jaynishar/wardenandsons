import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: '360x640', width: 360, height: 640, isMobile: true },
  { name: '390x844', width: 390, height: 844, isMobile: true },
  { name: '768x1024', width: 768, height: 1024, isMobile: false },
  { name: '1280x800', width: 1280, height: 800, isMobile: false },
];

const SHOTS_DIR = path.join(process.cwd(), 'docs', 'redesign-v2', 'shots');
if (!fs.existsSync(SHOTS_DIR)) {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const diagnosisData = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });

    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 600));

    // Capture screenshot
    const shotPath = path.join(SHOTS_DIR, `wa-diag-${vp.name}.png`);
    await page.screenshot({ path: shotPath });

    // Measure geometry of WhatsApp triggers
    const geo = await page.evaluate((vpHeight) => {
      // Find all WhatsApp links or triggers
      const triggers = [];
      const links = Array.from(document.querySelectorAll('a[href*="wa.me"], button'));
      
      for (const el of links) {
        const text = el.textContent || '';
        const href = el.getAttribute('href') || '';
        const ariaLabel = el.getAttribute('aria-label') || '';
        const isWa = href.includes('wa.me') || text.toLowerCase().includes('whatsapp') || ariaLabel.toLowerCase().includes('whatsapp') || el.closest('#chat-helper-dialog');
        
        if (isWa) {
          const rect = el.getBoundingClientRect();
          triggers.push({
            tag: el.tagName,
            href,
            text: text.trim().slice(0, 40),
            ariaLabel,
            visible: rect.width > 0 && rect.height > 0 && rect.bottom > 0,
            rect: {
              top: Math.round(rect.top),
              bottom: Math.round(rect.bottom),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            },
            distFromBottom: Math.round(vpHeight - rect.bottom),
          });
        }
      }

      // Check bottom nav bar if present
      const bottomNav = document.querySelector('nav[aria-label="Mobile navigation"]');
      let bottomNavRect = null;
      if (bottomNav) {
        const r = bottomNav.getBoundingClientRect();
        bottomNavRect = {
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          height: Math.round(r.height),
        };
      }

      return { triggers, bottomNavRect };
    }, vp.height);

    diagnosisData.push({
      viewport: vp.name,
      width: vp.width,
      height: vp.height,
      ...geo,
    });

    await page.close();
  }

  await browser.close();

  // Write markdown report
  let md = `# WhatsApp Button Diagnosis\n\n`;
  md += `Audit executed across 4 target viewports (360x640, 390x844, 768x1024, 1280x800) against static export.\n\n`;

  md += `## 1. Viewport Geometries & Measurements\n\n`;
  for (const item of diagnosisData) {
    md += `### Viewport ${item.viewport} (${item.width}x${item.height})\n\n`;
    if (item.bottomNavRect) {
      md += `- **Mobile Bottom Nav**: top: ${item.bottomNavRect.top}px, height: ${item.bottomNavRect.height}px, bottom: ${item.bottomNavRect.bottom}px (anchored to viewport bottom)\n`;
    } else {
      md += `- **Mobile Bottom Nav**: Not rendered (desktop layout)\n`;
    }

    md += `- **Detected WhatsApp Triggers**: ${item.triggers.length}\n\n`;
    md += `| Trigger | Type | Rect (W x H) | Dist From Viewport Bottom | Visible |\n`;
    md += `|---|---|---|---|---|\n`;
    for (const t of item.triggers) {
      const desc = t.text || t.ariaLabel || t.href.slice(0, 30);
      md += `| ${desc} | \`<${t.tag.toLowerCase()}>\` | ${t.rect.width}x${t.rect.height} | ${t.distFromBottom}px | ${t.visible ? 'Yes' : 'No'} |\n`;
    }
    md += `\n`;
  }

  md += `## 2. Issues Diagnosed\n\n`;
  md += `1. **Old Floating Trigger**: \`ChatHelper\` used a rounded-full 48px button with arbitrary shadow and offset \`bottom-[calc(4.5rem+var(--sab,0px)+8px)]\`, creating potential overlaps with mobile safe area and inconsistent spacing.\n`;
  md += `2. **Non-Unified Triggers**: WhatsApp links were scattered across \`Hero\`, \`HowItWorks\`, \`VisitUsSection\`, \`Footer\`, and \`ChatHelper\`, each using different markup, button heights, and hover styles.\n`;
  md += `3. **Visual Inconsistency**: Some buttons used \`#0F7B4F\`, some used dark ink \`#0E1A33\`, some had rounded pills, violating the zero-radius, flat square token rule.\n\n`;

  md += `## 3. Remedy Applied in P5\n\n`;
  md += `- Single unified \`<WhatsAppButton>\` component handling floating, inline, hero, and bottom bar variants.\n`;
  md += `- 56x56 square floating tile with 0 radius, authentic \`--wa\` fill (\`#0F7B4F\`), 28px white icon.\n`;
  md += `- Position on mobile: \`bottom: calc(var(--bar-h, 64px) + env(safe-area-inset-bottom) + 16px)\`, \`right: 16px\`.\n`;
  md += `- Position on desktop: \`bottom: 24px\`, \`right: 24px\`.\n`;
  md += `- z-index \`var(--z-fab, 40)\` strictly below modal overlays (\`50\`) and hides automatically when any sheet is open.\n`;

  fs.writeFileSync(path.join(process.cwd(), 'docs', 'redesign-v2', 'whatsapp-diagnosis.md'), md, 'utf8');
  console.log('WhatsApp diagnosis written to docs/redesign-v2/whatsapp-diagnosis.md');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
