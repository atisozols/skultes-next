'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const DISCOUNT_VERIFICATION_QUERY_KEY = ['discountVerification'];

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchDocumentStatus = async (token) => {
  const res = await fetch(`${SERVER_URL}/api/document/status`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw Object.assign(new Error('Failed to fetch document status'), { status: res.status });
  return res.json();
};

export function useDiscountVerification() {
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();

  return useQuery({
    queryKey: [...DISCOUNT_VERIFICATION_QUERY_KEY, isSignedIn ? userId : 'signedOut'],
    queryFn: async () => fetchDocumentStatus(await getToken()),
    enabled: isLoaded && isSignedIn,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => error?.status === 401 ? false : failureCount < 3,
  });
}

export function useDocumentUploadMutation() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    // files: Array of { file: File, originalName: string }
    mutationFn: async (files) => {
      const token = await getToken();

      // 1. Get presigned upload URLs for all files
      const urlRes = await fetch(`${SERVER_URL}/api/document/upload-urls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fileCount: files.length }),
      });
      if (!urlRes.ok) {
        const data = await urlRes.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to get upload URLs');
      }
      const { data: { uploads } } = await urlRes.json();

      // 2. Upload each file directly to S3
      await Promise.all(
        uploads.map(({ uploadUrl }, i) =>
          fetch(uploadUrl, {
            method: 'PUT',
            body: files[i].file,
            headers: { 'Content-Type': files[i].file.type },
          }).then((res) => {
            if (!res.ok) throw new Error(`Failed to upload file ${i + 1}`);
          })
        )
      );

      // 3. Confirm all uploads
      const confirmedFiles = uploads.map(({ s3Key }, i) => ({
        s3Key,
        originalName: files[i].originalName || files[i].file.name || null,
      }));

      const confirmRes = await fetch(`${SERVER_URL}/api/document/confirm-upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ files: confirmedFiles }),
      });
      if (!confirmRes.ok) {
        const data = await confirmRes.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to confirm upload');
      }
      return confirmRes.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DISCOUNT_VERIFICATION_QUERY_KEY });
    },
  });
}
