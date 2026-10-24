/**
 * WCAG 2.1 Contrast Ratio Verification Script — Redesign V2
 * Tests all text/background pairs for Warden & Sons against WCAG AA >= 4.5:1.
 */

const TOKENS = {
  bg: '#FFFFFF',
  surface: '#F4F4F2',
  ink: '#0E1A33',
  muted: '#55607A',
  red: '#DF232C',
  blue: '#2566AE',
  yellow: '#F6EF4B',
  wa: '#0F7B4F',
  white: '#FFFFFF',
};

const PAIRS_TO_CHECK = [
  { name: 'ink on bg', fg: TOKENS.ink, bg: TOKENS.bg, minRatio: 4.5 },
  { name: 'ink on surface', fg: TOKENS.ink, bg: TOKENS.surface, minRatio: 4.5 },
  { name: 'muted on bg', fg: TOKENS.muted, bg: TOKENS.bg, minRatio: 4.5 },
  { name: 'muted on surface', fg: TOKENS.muted, bg: TOKENS.surface, minRatio: 4.5 },
  { name: 'white on wa', fg: TOKENS.white, bg: TOKENS.wa, minRatio: 4.5 },
  { name: 'white on blue', fg: TOKENS.white, bg: TOKENS.blue, minRatio: 4.5 },
  { name: 'white on red', fg: TOKENS.white, bg: TOKENS.red, minRatio: 4.5 },
  { name: 'ink on yellow', fg: TOKENS.ink, bg: TOKENS.yellow, minRatio: 4.5 },
  { name: 'white on ink', fg: TOKENS.white, bg: TOKENS.ink, minRatio: 4.5 },
];

function getLuminance(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const srgb = [r, g, b].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function runAudit() {
  console.log('='.repeat(70));
  console.log('  WARDEN & SONS — WCAG 2.1 CONTRAST AUDIT (Redesign V2)');
  console.log('='.repeat(70));

  let allPassed = true;

  for (const pair of PAIRS_TO_CHECK) {
    const ratio = getContrastRatio(pair.fg, pair.bg);
    const passed = ratio >= pair.minRatio;
    const formattedRatio = ratio.toFixed(2) + ':1';
    const status = passed ? 'PASS' : 'FAIL';

    console.log(
      `[${status}] ${pair.name.padEnd(20)}: ${formattedRatio.padStart(8)}  (min ${pair.minRatio}:1)  [${pair.fg} on ${pair.bg}]`
    );

    if (!passed) {
      allPassed = false;
    }
  }

  console.log('='.repeat(70));

  if (!allPassed) {
    console.error('\nContrast audit failed: One or more text pairs are below 4.5:1.');
    process.exit(1);
  } else {
    console.log('\nAll Redesign V2 design token text/background pairs pass WCAG AA (>= 4.5:1).');
    process.exit(0);
  }
}

runAudit();
