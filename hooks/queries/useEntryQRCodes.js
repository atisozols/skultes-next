'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

// Query key constants
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
      gym: data.gym, // This could be null for non-members
    };
  } catch (error) {
    console.error('Error fetching entry QR codes:', error);
    throw error;
  }
};

/**
 * Hook for fetching QR codes for gym entry
 * Fetches QR codes with a stale time of 2 minutes (refresh interval of QR codes)
 */
export function useEntryQRCodes() {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ENTRY_QR_CODES_QUERY_KEY,
    queryFn: async () => fetchEntryQRCodes(await getToken()),
    retry: (failureCount, error) => {
      // Don't retry on 401 (Unauthorized)
      if (error?.status === 401) return false;
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: 1000, // Wait 1 second between retries
    staleTime: 10 * 1000, // 10 seconds (QR code refresh interval)
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}
