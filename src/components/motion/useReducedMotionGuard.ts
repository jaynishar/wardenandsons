'use client';

import { useReducedMotion } from 'motion/react';

export function useReducedMotionGuard(): boolean {
  const prefersReduced = useReducedMotion();
  return Boolean(prefersReduced);
}
