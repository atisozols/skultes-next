'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import LoadingOverlay from './LoadingOverlay';

/**
 * Wraps signed-in content with a loading overlay and staggered entrance animations.
 * Children receive a className that controls their visibility and entrance animation.
 */
const AnimatedContent = ({ children }) => {
  const [ready, setReady] = useState(false);
  const scrollRestorationRef = useRef(null);

  const handleReady = useCallback(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('scrollRestoration' in window.history)) return;

    scrollRestorationRef.current = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = scrollRestorationRef.current || 'auto';
    };
  }, []);

  useEffect(() => {
    if (!ready || typeof window === 'undefined') return;

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();

    const immediateId = window.setTimeout(resetScroll, 0);
    const settledId = window.setTimeout(resetScroll, 320);

    return () => {
      window.clearTimeout(immediateId);
      window.clearTimeout(settledId);
    };
  }, [ready]);

  return (
    <>
      <LoadingOverlay onReady={handleReady} />
      <div
        className={`flex w-full flex-col items-center transition-opacity duration-300 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default AnimatedContent;
