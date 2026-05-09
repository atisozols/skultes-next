'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const ENTRY_QR_CODES_QUERY_KEY = ['entryQRCodes'];

/**
 * Fetch QR codes for gym entry
 * @param {string} token - Auth token
 * @returns {Promise<{dressingRoom: string, gym: string|null}>} - QR code data
 */
const fetchEntryQRCodes = async (token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/entry`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = new Error(`Failed to fetch QR codes: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    const { data } = await response.json();

    if (!data || !data.dressingRoom) {
      throw new Error('Invalid QR code data received');
    }

    return {
      dressingRoom: data.dressingRoom,
      gym: data.gym,
    };
  } catch (error) {
    console.error('Error fetching entry QR codes:', error);
    throw error;
  }
};

/**
 * Hook for fetching QR codes for gym entry.
 *
 * The TTLock cyclic payload rotates every 3 minutes (refreshTime=3 in
 * skultesapi/utilities/ttlockFunctions.js), so we poll every 60 seconds and
 * also force a refetch whenever the page becomes visible again — important
 * for PWAs resuming from a locked screen or app switch, where TanStack's
 * default focus detection is unreliable on iOS.
 */
export function useEntryQRCodes() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ENTRY_QR_CODES_QUERY_KEY,
    queryFn: async () => fetchEntryQRCodes(await getToken()),
    retry: (_failureCount, error) => error?.status !== 401,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 15000),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    const invalidate = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        queryClient.invalidateQueries({ queryKey: ENTRY_QR_CODES_QUERY_KEY });
      }
    };

    document.addEventListener('visibilitychange', invalidate);
    window.addEventListener('pageshow', invalidate);

    return () => {
      document.removeEventListener('visibilitychange', invalidate);
      window.removeEventListener('pageshow', invalidate);
    };
  }, [queryClient]);

  return query;
}
