'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { getSavedConsent, updateGoogleConsent, ConsentChoice } from '@/lib/consent';

export default function ConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getSavedConsent();
    if (!saved) {
      // Small timeout to prevent layout shift during initial paint
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
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
      role="region"
      aria-label="Privacy and Cookie Choices"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-border-soft p-5 shadow-xl text-near-black">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-serif font-bold text-sm text-forest">Privacy & Store Analytics</h3>
            <p className="text-xs text-muted leading-relaxed">
              We use privacy-conscious analytics to understand how families discover our cotton
              essentials and connect with our Kemps Corner store. We never store personal customer
              details or message text in cookies.
            </p>
            <div className="pt-1">
              <Link
                href="/privacy-policy/"
                className="text-[11px] text-forest underline hover:text-gold font-medium"
              >
                Read our Customer Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border-soft flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold text-muted hover:text-near-black hover:bg-bg-cream transition-colors cursor-pointer"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => handleChoice('all')}
            className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold bg-forest hover:bg-forest-dark text-white shadow-xs transition-colors cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
