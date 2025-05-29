'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';

// Query key constants
export const AVAILABILITY_QUERY_KEY = ['availability'];

// Fetch availability data from the API
const fetchAvailability = async (token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/availability`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error(`Failed to fetch appointments: ${response.status}`);
    return null;
  }

  return response.json();
};

// Hook for fetching availability data
export function useAvailabilityQuery() {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: AVAILABILITY_QUERY_KEY,
    queryFn: async () => fetchAvailability(await getToken()),
    // Availability data changes frequently, so set a shorter stale time
    retry: (failureCount, error) => {
      // Don't retry on 401 (Unauthorized)
      if (error?.status === 401) return false;
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: 1000, // Wait 1 second between retries
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
