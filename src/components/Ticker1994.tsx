'use client';

import React, { useEffect, useRef, useState } from 'react';

export function Ticker1994() {
  const [val, setVal] = useState(1994);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle tick between 1994 and 30+ Years every 4 seconds when in view and not hovered
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (!isIntersecting || isHovered) return;

    const interval = setInterval(() => {
      setVal((v) => (v === 1994 ? 30 : 1994));
    }, 4000);

    return () => clearInterval(interval);
  }, [isIntersecting, isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--surface)] border border-[var(--ink)]/15 text-xs font-sans font-medium text-[var(--ink)] cursor-default select-none"
      title="Serving South Mumbai families since 1994"
    >
      <span className="w-2 h-2 rounded-none bg-[var(--red)]" />
      <span className="transition-all duration-300">
        {val === 1994 ? 'Established 1994' : '30+ Years in Kemps Corner'}
      </span>
    </div>
  );
}

export default Ticker1994;
