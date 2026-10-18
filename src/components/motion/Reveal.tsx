import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Failsafe layout wrapper that renders children with 100% opacity immediately.
 * Never hides content behind initial opacity: 0 or scroll-trigger delays.
 */
export default function Reveal({ children, className = '' }: RevealProps) {
  return <div className={className}>{children}</div>;
}
