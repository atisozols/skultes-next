'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query key constants
export const USER_QUERY_KEY = ['user'];

// Fetch user data from the API
const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      // If we get a 401, the user is not authenticated
      if (response.status === 401) {
        // Clear any existing user data
        return null;
      }

      const error = new Error(`Failed to fetch user data: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();

    // If the response is empty or invalid, return null
    if (!data || typeof data !== 'object') {
      console.error('Invalid user data received:', data);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Re-throw the error so React Query can handle it
    throw error;
  }
};

// Hook for fetching user data
export function useUser() {
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();

  return useQuery({
    queryKey: [...USER_QUERY_KEY, isSignedIn ? userId : 'signedOut'],
    queryFn: async () => fetchUserData(await getToken()),
    enabled: isLoaded && isSignedIn,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: 'always',
    retry: (failureCount, error) => {
      // Don't retry on 401 (Unauthorized)
      if (error?.status === 401) return false;
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: 1000, // Wait 1 second between retries
    staleTime: 0, // Always treat as stale to ensure fresh user data on mount
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for refreshing user data
export function useRefreshUserMutation() {
  const queryClient = useQueryClient();
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!isLoaded || !isSignedIn) return null;
      const token = await getToken();
      return fetchUserData(token);
    },
    onSuccess: (data) => {
      if (isSignedIn && userId) {
        queryClient.setQueryData([...USER_QUERY_KEY, userId], data);
      }
    },
  });
}
