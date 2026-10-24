'use client';

import React, { useEffect, useRef, useState } from 'react';

const TRUST_PHRASES = [
  '100% Breathable Combed Cotton',
  'South Mumbai Store Est. 1994',
  'Physical Tape Measurements on WhatsApp',
  'Cathedral & St. Mary’s Uniforms',
  'Shop No. 7, Haji Habib Bldg, Kemps Corner',
  'Open All 7 Days 9:00 AM – 9:00 PM',
  'Zero Itchy Tulle or Synthetic Linings',
];

export function TrustMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  // Pause animation when element is offscreen to save battery and CPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[var(--ink)] text-[#FAF9F6] overflow-hidden py-3 font-sans group select-none border-t border-[var(--line)]"
      aria-label="Store commitments ticker"
    >
      <div
        className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animationPlayState: isIntersecting ? undefined : 'paused',
        }}
      >
        {/* Render duplicate items for continuous smooth loop */}
        {[...TRUST_PHRASES, ...TRUST_PHRASES].map((phrase, i) => (
          <div key={i} className="inline-flex items-center mx-8 text-[13px] font-medium tracking-wide">
            <span>{phrase}</span>
            <span className="ml-8 text-[var(--terracotta)] opacity-80" aria-hidden="true">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustMarquee;
