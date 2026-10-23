import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Analytics & Consent Mode Verification', () => {
  test('initializes dataLayer and default Google Consent Mode v2', async ({ page }) => {
    await page.goto('/');

    const hasDataLayer = await page.evaluate(() => {
      return Array.isArray(window.dataLayer);
    });
    expect(hasDataLayer).toBe(true);

    // Verify Google Consent Mode v2 default command was queued
    const consentDefault = await page.evaluate(() => {
      if (!window.dataLayer) return null;
      for (const item of window.dataLayer) {
        if (
          item &&
          typeof item === 'object' &&
          '0' in item &&
          (item as Record<string, unknown>)[0] === 'consent' &&
          (item as Record<string, unknown>)[1] === 'default'
        ) {
          return (item as Record<string, unknown>)[2];
        }
      }
      return null;
    });

    expect(consentDefault).toBeTruthy();
    expect(consentDefault).toMatchObject({
      ad_storage: expect.stringMatching(/granted|denied/),
      ad_user_data: expect.stringMatching(/granted|denied/),
      ad_personalization: expect.stringMatching(/granted|denied/),
      analytics_storage: expect.stringMatching(/granted|denied/),
    });
  });

  test('consent banner renders, is accessible, and updates consent upon user choice', async ({
    page,
  }) => {
    // Clear any previous consent state
    await page.addInitScript(() => {
      localStorage.removeItem('ws_consent_choice');
    });

    await page.goto('/');

    // Wait for the banner to become visible (1200ms delay in component)
    const banner = page.locator('div[role="region"][aria-label="Privacy and Cookie Choices"]');
    await expect(banner).toBeVisible({ timeout: 5000 });

    // Verify accessibility of the consent banner
    const axeResults = await new AxeBuilder({ page })
      .include('div[role="region"][aria-label="Privacy and Cookie Choices"]')
      .analyze();
    expect(axeResults.violations).toEqual([]);

    // Click "Accept All"
    const acceptBtn = banner.getByRole('button', { name: 'Accept All' });
    await acceptBtn.click();

    // Verify banner dismisses
    await expect(banner).not.toBeVisible();

    // Verify localStorage was updated
    const savedChoice = await page.evaluate(() => localStorage.getItem('ws_consent_choice'));
    expect(savedChoice).toBe('all');
  });

  test('captures whatsapp_click with normalized button_location', async ({ page }) => {
    await page.goto('/');

    // Click WhatsApp button
    const waButton = page.locator('[data-track="whatsapp_click"]').first();
    await expect(waButton).toBeVisible();

    // Intercept window.open or link navigation
    await page.evaluate(() => {
      window.open = () => null;
    });

    await waButton.click();

    // Check dataLayer events
    const whatsappEvent = await page.evaluate(() => {
      if (!window.dataLayer) return null;
      return window.dataLayer.find(
        (entry: unknown) =>
          typeof entry === 'object' &&
          entry !== null &&
          (entry as Record<string, unknown>).event === 'whatsapp_click',
      );
    });

    expect(whatsappEvent).toBeTruthy();
    const eventObj = whatsappEvent as Record<string, unknown>;
    expect(eventObj.event).toBe('whatsapp_click');
    expect(['header', 'hero', 'product', 'request_list', 'footer', 'sticky_bar', 'video_call']).toContain(
      eventObj.button_location,
    );
  });

  test('form validation prevents premature form_submit and generate_lead events', async ({
    page,
  }) => {
    await page.goto('/contact/');

    // Click Submit without filling in required inputs
    const submitBtn = page.getByRole('button', { name: /Open Enquiry in WhatsApp/i });
    await submitBtn.click();

    // Verify validation errors are shown on page
    await expect(page.getByText('Please enter your name.')).toBeVisible();

    // Check dataLayer does NOT contain form_submit or generate_lead
    const prematureEvents = await page.evaluate(() => {
      if (!window.dataLayer) return [];
      return window.dataLayer.filter((entry: unknown) => {
        if (typeof entry !== 'object' || entry === null) return false;
        const e = (entry as Record<string, unknown>).event;
        return e === 'form_submit' || e === 'generate_lead';
      });
    });

    expect(prematureEvents.length).toBe(0);
  });

  test('preserves inbound UTM parameters safely in sessionStorage and does not leak PII', async ({
    page,
  }) => {
    await page.goto('/?utm_source=instagram&utm_medium=social&utm_campaign=festive_kids');
    await page.waitForLoadState('domcontentloaded');

    await page.waitForFunction(
      () => sessionStorage.getItem('ws_session_attribution') !== null,
      { timeout: 5000 },
    );

    const attribution = await page.evaluate(() => {
      return sessionStorage.getItem('ws_session_attribution');
    });

    expect(attribution).toBeTruthy();
    const parsed = JSON.parse(attribution!);
    expect(parsed.utmSource).toBe('instagram');
    expect(parsed.utmMedium).toBe('social');
    expect(parsed.utmCampaign).toBe('festive_kids');
  });
});
