import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { buildWhatsAppRequestUrl } from '@/lib/whatsapp';
import {
  VALID_BUTTON_LOCATIONS,
  normalizeButtonLocation,
  trackWhatsAppClick,
} from '@/lib/analytics';
import { BUSINESS_CONFIG } from '@/config/business';

describe('Step R9: Guided Chat Helper & Motion Specifications', () => {
  describe('WhatsApp URLs and Message Encoding', () => {
    it('correctly builds and encodes WhatsApp URL for Kids category with selected age', () => {
      const msg =
        'Hi Warden & Sons! I am looking for Boys clothes, age 6-7Y. (Sent from the website, chat helper)';
      const url = buildWhatsAppRequestUrl(msg, BUSINESS_CONFIG.phone.raw);

      expect(url).toContain(`https://wa.me/${BUSINESS_CONFIG.phone.raw}?text=`);
      const encodedQuery = url.split('?text=')[1];
      const decoded = decodeURIComponent(encodedQuery);
      expect(decoded).toBe(msg);
      expect(decoded).toContain('Boys');
      expect(decoded).toContain('6-7Y');
      expect(decoded).toContain('chat helper');
    });

    it('correctly builds and encodes WhatsApp URL for Newborn with selected age', () => {
      const msg =
        'Hi Warden & Sons! I am looking for Newborn clothes, age 0-3M. (Sent from the website, chat helper)';
      const url = buildWhatsAppRequestUrl(msg, BUSINESS_CONFIG.phone.raw);

      const encodedQuery = url.split('?text=')[1];
      const decoded = decodeURIComponent(encodedQuery);
      expect(decoded).toBe(msg);
      expect(decoded).toContain('Newborn');
      expect(decoded).toContain('0-3M');
    });

    it('correctly builds and encodes WhatsApp URL for School Uniforms', () => {
      const msg =
        'Hi Warden & Sons! I am looking for school uniforms and bulk orders. (Sent from the website, chat helper)';
      const url = buildWhatsAppRequestUrl(msg, BUSINESS_CONFIG.phone.raw);

      const encodedQuery = url.split('?text=')[1];
      const decoded = decodeURIComponent(encodedQuery);
      expect(decoded).toBe(msg);
      expect(decoded).toContain('school uniforms and bulk orders');
    });

    it('correctly builds and encodes WhatsApp URL for Men & Women essentials', () => {
      const msg =
        'Hi Warden & Sons! I am looking for Men essentials. (Sent from the website, chat helper)';
      const url = buildWhatsAppRequestUrl(msg, BUSINESS_CONFIG.phone.raw);

      const encodedQuery = url.split('?text=')[1];
      const decoded = decodeURIComponent(encodedQuery);
      expect(decoded).toBe(msg);
      expect(decoded).toContain('Men essentials');
    });
  });

  describe('Analytics & Zero-PII Tracking Dictionary', () => {
    it('includes "chat_helper" in VALID_BUTTON_LOCATIONS', () => {
      expect(VALID_BUTTON_LOCATIONS).toContain('chat_helper');
    });

    it('normalizes chat and helper location strings to "chat_helper"', () => {
      expect(normalizeButtonLocation('chat_helper')).toBe('chat_helper');
      expect(normalizeButtonLocation('chat')).toBe('chat_helper');
      expect(normalizeButtonLocation('helper')).toBe('chat_helper');
      expect(normalizeButtonLocation('guided_chat_helper')).toBe('chat_helper');
    });

    it('dispatches analytics event with button_location "chat_helper" without transmitting child age or custom text', () => {
      const dataLayerMock: Record<string, unknown>[] = [];
      const originalWindow = global.window;

      // Mock window.dataLayer and window.gtag
      (global as unknown as { window: unknown }).window = {
        dataLayer: dataLayerMock,
        location: { pathname: '/' },
        gtag: (type: string, name: string, params: Record<string, unknown>) => {
          dataLayerMock.push({ type, name, ...params });
        },
      };

      trackWhatsAppClick({
        button_location: 'chat_helper',
      });

      const clickEvent = dataLayerMock.find((e) => e.event === 'whatsapp_click');
      expect(clickEvent).toBeDefined();
      expect(clickEvent?.button_location).toBe('chat_helper');

      // Crucial privacy assertion: age, customer choices, or typed messages are NEVER sent
      expect(clickEvent).not.toHaveProperty('age');
      expect(clickEvent).not.toHaveProperty('age_band');
      expect(clickEvent).not.toHaveProperty('child_age');
      expect(clickEvent).not.toHaveProperty('message');

      global.window = originalWindow;
    });
  });

  describe('Motion CSS, Keyframes and Prefers-Reduced-Motion', () => {
    const cssPath = path.resolve(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    it('contains @keyframes badge-bump with scale transformation for list addition', () => {
      expect(cssContent).toContain('@keyframes badge-bump');
      expect(cssContent).toContain('.animate-badge-bump');
      expect(cssContent).toContain('scale(');
    });

    it('contains @keyframes logo-flip under 600ms for first-load homepage logo flip', () => {
      expect(cssContent).toContain('@keyframes logo-flip');
      expect(cssContent).toContain('.animate-logo-flip');
      expect(cssContent).toContain('rotateY(360deg)');
      // Verify animation timing is <= 600ms (550ms configured)
      expect(cssContent).toMatch(/logo-flip\s+550ms/);
    });

    it('contains smooth sheet and dialog transition classes', () => {
      expect(cssContent).toContain('@keyframes slideInFromBottom');
      expect(cssContent).toContain('@keyframes slideInFromRight');
      expect(cssContent).toContain('@keyframes slideInFromLeft');
      expect(cssContent).toContain('@keyframes scaleIn');
      expect(cssContent).toContain('.sheet-bottom');
      expect(cssContent).toContain('.sheet-right');
      expect(cssContent).toContain('.sheet-left');
      expect(cssContent).toContain('.dialog-scale');
      expect(cssContent).toContain('.dialog-overlay');
    });

    it('strictly disables all animations and transitions under prefers-reduced-motion: reduce', () => {
      expect(cssContent).toContain('@media (prefers-reduced-motion: reduce)');
      expect(cssContent).toContain('animation-duration: 0.01ms !important');
      expect(cssContent).toContain('transition-duration: 0.01ms !important');
      expect(cssContent).toContain('animation-iteration-count: 1 !important');
    });
  });

  describe('Component Architecture & Interaction Constraints', () => {
    it('verifies ChatHelperContainer source code enforces interaction and 6-second timeout before mounting', () => {
      const containerPath = path.resolve(
        process.cwd(),
        'src/components/chat/ChatHelperContainer.tsx',
      );
      const containerSource = fs.readFileSync(containerPath, 'utf8');

      expect(containerSource).toContain('pointerdown');
      expect(containerSource).toContain('keydown');
      expect(containerSource).toContain('touchstart');
      expect(containerSource).toContain('scroll');
      expect(containerSource).toContain('6000');
      expect(containerSource).toContain('dynamic');
      expect(containerSource).toContain('ssr: false');
    });

    it('verifies ChatHelper source code suppresses floating trigger button when any dialog is open', () => {
      const helperPath = path.resolve(
        process.cwd(),
        'src/components/chat/ChatHelper.tsx',
      );
      const helperSource = fs.readFileSync(helperPath, 'utf8');

      expect(helperSource).toContain('isListOpen');
      expect(helperSource).toContain('addSheetTarget');
      expect(helperSource).toContain('isSearchOpen');
      expect(helperSource).toContain('hasOtherDialog');
      expect(helperSource).toContain('shouldHideTrigger');
      expect(helperSource).toContain('Dialog.Root');
      expect(helperSource).toContain('Dialog.Portal');
      expect(helperSource).toContain('Dialog.Overlay');
      expect(helperSource).toContain('Dialog.Content');
    });

    it('verifies Reveal component uses LazyMotion with domAnimation and useReducedMotion', () => {
      const revealPath = path.resolve(
        process.cwd(),
        'src/components/motion/Reveal.tsx',
      );
      const revealSource = fs.readFileSync(revealPath, 'utf8');

      expect(revealSource).toContain('LazyMotion');
      expect(revealSource).toContain('domAnimation');
      expect(revealSource).toContain('useReducedMotion');
      expect(revealSource).toContain('y: 12');
      expect(revealSource).toContain('once: true');
    });

    it('verifies Button component has 80ms pressed scale state', () => {
      const buttonPath = path.resolve(
        process.cwd(),
        'src/components/ui/Button.tsx',
      );
      const buttonSource = fs.readFileSync(buttonPath, 'utf8');

      expect(buttonSource).toContain('active:scale-[0.98]');
      expect(buttonSource).toContain('duration-[80ms]');
    });
  });
});
