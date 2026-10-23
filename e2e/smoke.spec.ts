import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage Smoke & Responsive Tests', () => {
  test('homepage loads, navigates, renders mobile viewport without horizontal scroll, and has no console errors', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    // 1. Homepage loads
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/Warden & Sons/);

    // 2. Main navigation works
    const catalogueLink = page.getByRole('link', { name: 'Catalogue' }).first();
    await expect(catalogueLink).toBeVisible();
    await catalogueLink.click();
    await expect(page).toHaveURL(/\/shop\/?$/);

    // Navigate back to homepage for mobile viewport and console error check
    await page.goto('/');

    // 3. 390px-wide mobile viewport renders without horizontal scroll
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBe(false);

    // 4. No console errors
    expect(consoleErrors).toEqual([]);
  });
});

test.describe('Accessibility Tests', () => {
  test('homepage passes axe accessibility checks', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
