'use client';

import React from 'react';
import { LazyMotion, m, useReducedMotion } from 'framer-motion';

const loadFeatures = () =>
  import('framer-motion').then((res) => res.domAnimation);

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Reveal Component
 * Animates opacity from 0 to 1 and an upward translate of 12px when the component
 * enters the viewport, once only.
 * Dynamically loads domAnimation features via LazyMotion to keep initial bundle size lean.
 * Fully bypasses animation if the user prefers reduced motion.
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, delay, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export default Reveal;
