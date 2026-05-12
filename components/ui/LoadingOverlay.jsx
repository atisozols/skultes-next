'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';
import { usePhotoVerification } from '@/hooks/queries/usePhotoVerification';

const HARD_TIMEOUT_MS = 4000;

/**
 * Full-screen loading overlay shown while Clerk and initial data loads.
 * Fades out once ready, then triggers content entrance animations.
 */
const LoadingOverlay = ({ onReady }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { isFetching: photoFetching } = usePhotoVerification();
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  // Track that fetching has actually started, so we don't dismiss before
  // the query has even fired (avoids false-positive ready on Clerk fast-load).
  const [fetchStarted, setFetchStarted] = useState(false);
  useEffect(() => {
    if (photoFetching) setFetchStarted(true);
  }, [photoFetching]);

  // Dismiss as soon as Clerk reports signed-out — the overlay is a signed-in
  // boot screen, not an auth-loading screen, so we shouldn't keep waiting on
  // a photo query that will never run when the session has expired.
  const ready =
    isLoaded && (!isSignedIn || (fetchStarted && !photoFetching));

  // Guard against firing more than once (React Strict Mode double-effect).
  const dismissed = useRef(false);

  useEffect(() => {
    if (!ready || dismissed.current) return;
    dismissed.current = true;
    setFading(true);
    onReady?.();
    setTimeout(() => setVisible(false), 300);
  }, [ready, onReady]);

  // Safety net: never let the overlay sit on screen longer than HARD_TIMEOUT_MS.
  // If a query hangs (offline, dead backend, expired-but-unrecognized session)
  // we force dismissal so the user can interact with whatever the page renders.
  useEffect(() => {
    const id = setTimeout(() => {
      if (dismissed.current) return;
      dismissed.current = true;
      setFading(true);
      onReady?.();
      setTimeout(() => setVisible(false), 300);
    }, HARD_TIMEOUT_MS);
    return () => clearTimeout(id);
  }, [onReady]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Image
        src='/logo_red.png'
        alt='Ielādē'
        width={750}
        height={204}
        className='mx-auto w-full max-w-[200px]'
        priority
      />
    </div>
  );
};

export default LoadingOverlay;
