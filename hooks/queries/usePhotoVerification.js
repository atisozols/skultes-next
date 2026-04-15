'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const PHOTO_VERIFICATION_QUERY_KEY = ['photoVerification'];

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchPhotoStatus = async (token) => {
  const res = await fetch(`${SERVER_URL}/api/photo/status`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw Object.assign(new Error('Failed to fetch photo status'), { status: res.status });
  return res.json();
};

export function usePhotoVerification() {
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();

  return useQuery({
    queryKey: [...PHOTO_VERIFICATION_QUERY_KEY, isSignedIn ? userId : 'signedOut'],
    queryFn: async () => fetchPhotoStatus(await getToken()),
    enabled: isLoaded && isSignedIn,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => error?.status === 401 ? false : failureCount < 3,
  });
}

export function usePhotoUploadMutation() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const token = await getToken();

      // 1. Get presigned upload URL
      const urlRes = await fetch(`${SERVER_URL}/api/photo/upload-url`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!urlRes.ok) {
        const data = await urlRes.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to get upload URL');
      }
      const { data: { uploadUrl, s3Key } } = await urlRes.json();

      // 2. Upload directly to S3
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': 'image/jpeg' },
      });
      if (!uploadRes.ok) throw new Error('Failed to upload to storage');

      // 3. Confirm upload with backend
      const confirmRes = await fetch(`${SERVER_URL}/api/photo/confirm-upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ s3Key }),
      });
      if (!confirmRes.ok) {
        const data = await confirmRes.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to confirm upload');
      }
      return confirmRes.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHOTO_VERIFICATION_QUERY_KEY });
    },
  });
}
