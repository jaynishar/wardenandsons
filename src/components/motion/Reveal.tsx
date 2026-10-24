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
 * Section Entrance Reveal:
 * - Triggered by viewport threshold 0.15
 * - 16-24px rise + opacity 0 to 1 over 360ms ease-out
 * - Respects prefers-reduced-motion via useReducedMotion
 * - Dynamically loads domAnimation features via LazyMotion
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
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.36, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export default Reveal;
