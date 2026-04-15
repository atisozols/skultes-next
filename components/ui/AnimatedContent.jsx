'use client';

import { useState, useCallback } from 'react';
import LoadingOverlay from './LoadingOverlay';

/**
 * Wraps signed-in content with a loading overlay and staggered entrance animations.
 * Children receive a className that controls their visibility and entrance animation.
 */
const AnimatedContent = ({ children }) => {
  const [ready, setReady] = useState(false);

  const handleReady = useCallback(() => {
    setReady(true);
  }, []);

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
