'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useListStore } from '@/lib/list-store';
import { getSub } from '@/data/catalogue';

export function FlyToCartToast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toggleList = useListStore((s) => s.toggleList);

  useEffect(() => {
    let prevCount = useListStore.getState().lines.reduce((sum, l) => sum + l.qty, 0);

    const unsubscribe = useListStore.subscribe((state) => {
      const currentCount = state.lines.reduce((sum, l) => sum + l.qty, 0);
      if (currentCount > prevCount) {
        // Find latest added item
        const lastItem = state.lines[state.lines.length - 1];
        if (lastItem) {
          const sub = getSub(lastItem.categorySlug, lastItem.subSlug);
          const label = sub?.label || lastItem.subSlug;

          // Trigger Toast Announcement
          setToastMessage(`${label} added to list`);
          if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
          toastTimeoutRef.current = setTimeout(() => {
            setToastMessage(null);
          }, 2200);

          // Fly-to-cart Web Animations API
          if (
            typeof window !== 'undefined' &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ) {
            const destBtn =
              document.querySelector('button[aria-label*="My list"]') ||
              document.querySelector('header button');

            if (destBtn) {
              const destRect = destBtn.getBoundingClientRect();
              const flyer = document.createElement('div');
              flyer.style.position = 'fixed';
              flyer.style.width = '24px';
              flyer.style.height = '24px';
              flyer.style.backgroundColor = 'var(--red, #DF232C)';
              flyer.style.borderRadius = '0';
              flyer.style.zIndex = '9999';
              flyer.style.pointerEvents = 'none';

              const startX = window.innerWidth / 2 - 12;
              const startY = window.innerHeight / 2 - 12;
              const endX = destRect.left + destRect.width / 2 - 12;
              const endY = destRect.top + destRect.height / 2 - 12;

              document.body.appendChild(flyer);

              const anim = flyer.animate(
                [
                  { transform: `translate3d(${startX}px, ${startY}px, 0) scale(1)`, opacity: 0.9 },
                  { transform: `translate3d(${endX}px, ${endY}px, 0) scale(0.3)`, opacity: 0.2 },
                ],
                {
                  duration: 500,
                  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }
              );

              anim.onfinish = () => flyer.remove();
            }
          }
        }
      }
      prevCount = currentCount;
    });

    return () => {
      unsubscribe();
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-50 bottom-[calc(var(--bar-h,64px)+env(safe-area-inset-bottom)+24px)] md:bottom-8 left-1/2 -translate-x-1/2 bg-[var(--ink)] text-white px-5 py-3 shadow-xl flex items-center gap-4 text-sm font-sans animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <span>{toastMessage}</span>
      <button
        type="button"
        onClick={() => {
          setToastMessage(null);
          toggleList();
        }}
        className="text-[var(--yellow)] hover:underline font-medium text-xs uppercase tracking-wider cursor-pointer"
      >
        View list &rarr;
      </button>
    </div>
  );
}

export default FlyToCartToast;
