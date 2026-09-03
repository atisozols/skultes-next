'use client';

import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { usePhotoVerification } from '@/hooks/queries/usePhotoVerification';
import PhotoUploadModal from './PhotoUploadModal';

// Reachable while gated — the modal links to the privacy policy, and terms
// should never be walled off behind a verification step.
const EXEMPT_PATHS = ['/pp', '/tc'];

/**
 * Forces a signed-in customer into the photo upload flow whenever their photo
 * verification is missing or rejected. While gated they cannot reach the QR
 * codes or either checkout — the only way forward is to upload a photo, which
 * flips the status to `pending` and dissolves this gate on the next refetch.
 */
const PhotoVerificationGate = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname();
  const { data } = usePhotoVerification();

  if (!isLoaded || !isSignedIn) return null;
  if (EXEMPT_PATHS.includes(pathname)) return null;

  // Undefined until the status query resolves — don't flash the gate.
  if (data?.data?.blocked !== true) return null;

  return <PhotoUploadModal forced onClose={() => {}} rejectionReason={data.data.rejectionReason} />;
};

export default PhotoVerificationGate;
