/**
 * WCAG 2.1 Contrast Ratio Verification Script
 * Checks all defined text/background pairs against the minimum 4.5:1 AA standard.
 */

const TOKENS = {
  ivory: '#FBF7F0',
  paper: '#F3EDE2',
  line: '#E3DAC9',
  ink: '#16233F',
  'ink-soft': '#4A5470',
  blue: '#2F5FA7',
  red: '#D8402F',
  yellow: '#F1B434',
  wa: '#0F7B4F',
  white: '#FFFFFF',
};

// Required pairs per Step R1 specification
const PAIRS_TO_CHECK = [
  { name: 'ink on ivory', fg: TOKENS.ink, bg: TOKENS.ivory, minRatio: 4.5 },
  { name: 'ink-soft on ivory', fg: TOKENS['ink-soft'], bg: TOKENS.ivory, minRatio: 4.5 },
  { name: 'ink-soft on paper', fg: TOKENS['ink-soft'], bg: TOKENS.paper, minRatio: 4.5 },
  { name: 'white on --wa', fg: TOKENS.white, bg: TOKENS.wa, minRatio: 4.5 },
  { name: 'ivory on ink', fg: TOKENS.ivory, bg: TOKENS.ink, minRatio: 4.5 },
  { name: 'blue on ivory', fg: TOKENS.blue, bg: TOKENS.ivory, minRatio: 4.5 },
];

/**
 * Calculates relative luminance for an sRGB hex code
 * @param {string} hex
 * @returns {number}
 */
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

/**
 * Computes contrast ratio between two hex colors
 * @param {string} hex1
 * @param {string} hex2
 * @returns {number}
 */
function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function runAudit() {
  console.log('='.repeat(65));
  console.log('  WARDEN & SONS — WCAG 2.1 CONTRAST AUDIT (Step R1)');
  console.log('='.repeat(65));

  let allPassed = true;

  for (const pair of PAIRS_TO_CHECK) {
    const ratio = getContrastRatio(pair.fg, pair.bg);
    const passed = ratio >= pair.minRatio;
    const formattedRatio = ratio.toFixed(2) + ':1';
    const status = passed ? 'PASS' : 'FAIL';

    console.log(
      `[${status}] ${pair.name.padEnd(22)}: ${formattedRatio.padStart(8)}  (min ${pair.minRatio}:1)  [${pair.fg} on ${pair.bg}]`
    );

    if (!passed) {
      allPassed = false;
    }
  }

  console.log('='.repeat(65));

  if (!allPassed) {
    console.error('\n Contrast audit failed: One or more text pairs are below the 4.5:1 minimum threshold.');
    process.exit(1);
  } else {
    console.log('\n All design token text/background pairs pass WCAG AA (>= 4.5:1).');
    process.exit(0);
  }
}

runAudit();
