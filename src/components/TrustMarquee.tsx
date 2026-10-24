'use client';

import React, { useEffect, useRef, useState } from 'react';

const TRUST_PHRASES = [
  '100% Combed Cotton',
  'South Mumbai Store Est. 1994',
  'Flat Tape Measurements on WhatsApp',
  'Cathedral & St. Mary’s Uniforms',
  'Kemps Corner Near St. Stephen’s',
  'Open All 7 Days 9am–9pm',
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
      className="w-full bg-[var(--ink)] text-white overflow-hidden py-3 font-sans group select-none"
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
          <div key={i} className="inline-flex items-center mx-6 text-sm font-medium">
            <span>{phrase}</span>
            <span className="ml-6 text-[var(--yellow)] opacity-60">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustMarquee;
