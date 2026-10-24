'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ChatHelper = dynamic(() => import('./ChatHelper'), {
  ssr: false,
});

/**
 * ChatHelperContainer
 * Defers loading and mounting of the ChatHelper bundle until either:
 * 1. The first user interaction ('pointerdown', 'keydown', 'touchstart', 'scroll'), OR
 * 2. 6 seconds of idle time.
 * This guarantees zero first-load JavaScript overhead for the chat helper.
 */
export default function ChatHelperContainer() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    let triggered = false;

    const triggerMount = () => {
      if (triggered) return;
      triggered = true;
      setShouldMount(true);
      cleanup();
    };

    const timer = setTimeout(triggerMount, 6000);

    const events = ['pointerdown', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];

    const cleanup = () => {
      clearTimeout(timer);
      events.forEach((evt) => {
        window.removeEventListener(evt, triggerMount, true);
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, triggerMount, { capture: true, passive: true, once: true });
    });

    return cleanup;
  }, []);

  if (!shouldMount) {
    return null;
  }

  return <ChatHelper />;
}
