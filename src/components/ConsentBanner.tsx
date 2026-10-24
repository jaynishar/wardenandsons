'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSavedConsent, updateGoogleConsent, ConsentChoice } from '@/lib/consent';

export default function ConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getSavedConsent();
    if (saved) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Listen for open requests (e.g. from footer link "Cookie Preferences")
  useEffect(() => {
    const handleReopen = () => setVisible(true);
    window.addEventListener('ws:open_consent_banner', handleReopen);
    return () => window.removeEventListener('ws:open_consent_banner', handleReopen);
  }, []);

  const handleChoice = (choice: ConsentChoice) => {
    updateGoogleConsent(choice);
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      data-ui="consent-banner"
      role="region"
      aria-label="Privacy and Cookie Choices"
      className="fixed bottom-[calc(var(--bar-h,64px)+env(safe-area-inset-bottom)+16px)] md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in duration-200 font-sans"
    >
      <div className="bg-white border border-[var(--line)] rounded-md shadow-lg p-5 text-[var(--ink)]">
        <div className="space-y-2">
          <h3 className="font-sans font-medium text-sm text-[var(--ink)]">
            Privacy &amp; Store Analytics
          </h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed font-normal">
            We use privacy-conscious analytics to understand how families discover our cotton
            essentials and connect with our Kemps Corner store. We never store personal customer
            details or inquiry text in cookies.
          </p>
          <div className="pt-1">
            <Link
              href="/privacy-policy/"
              className="text-xs text-[var(--ink)] underline hover:text-[var(--terracotta)] font-medium"
            >
              Read Customer Privacy Policy
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="h-9 min-h-[36px] px-3.5 rounded-sm text-xs font-medium text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer border border-[var(--line)]"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => handleChoice('all')}
            className="h-9 min-h-[36px] px-4 rounded-sm text-xs font-medium bg-[var(--ink)] hover:bg-[var(--blue)] text-white transition-colors cursor-pointer shadow-xs"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
