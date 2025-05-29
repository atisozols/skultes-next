'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query key constants
export const SESSIONS_QUERY_KEY = ['sessions'];

// Fetch sessions data from the API
const fetchSessions = async (token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/sessions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sessions data: ${response.status}`);
  }

  return response.json();
};

// Hook for fetching sessions data
export function useSessionsQuery() {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: SESSIONS_QUERY_KEY,
    queryFn: async () => fetchSessions(await getToken()),
    // Sessions data might change, so set a reasonable stale time
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401 (Unauthorized)
      if (error?.status === 401) return false;
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
}

// Update session registration
const updateSessionRegistration = (sessionId, isRegistered, queryClient) => {
  queryClient.setQueryData(SESSIONS_QUERY_KEY, (oldData) => {
    if (!oldData) return oldData;
    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        sessions: page.sessions.map((session) =>
          session._id === sessionId
            ? {
                ...session,
                isRegistered: isRegistered,
                registration: isRegistered ? { _id: 'temp' } : null,
              }
            : session,
        ),
      })),
    };
  });
};

// Register for a session
export function useRegisterForSession() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sessionId }) => {
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sessions/${sessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to register for session');
      }

      return response.json();
    },
    onMutate: async ({ sessionId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: SESSIONS_QUERY_KEY });

      // Snapshot the previous value
      const previousSessions = queryClient.getQueryData(SESSIONS_QUERY_KEY);

      // Don't update the UI here - we'll let the loading state handle the visual feedback
      return { previousSessions, sessionId };
    },
    onError: (err, variables, context) => {
      console.error('Registration error:', err);
      if (context?.previousSessions) {
        queryClient.setQueryData(SESSIONS_QUERY_KEY, context.previousSessions);
      }
    },
    onSuccess: (data, variables, context) => {
      // Only update the UI after the request succeeds
      if (context?.sessionId) {
        queryClient.setQueryData(SESSIONS_QUERY_KEY, (old) => {
          if (!old) return old;

          if (old.pages) {
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                sessions: page.sessions.map((session) =>
                  session._id === context.sessionId
                    ? {
                        ...session,
                        isRegistered: true,
                        currentParticipants: (session.currentParticipants || 0) + 1,
                      }
                    : session,
                ),
              })),
            };
          } else if (old.sessions) {
            return {
              ...old,
              sessions: old.sessions.map((session) =>
                session._id === context.sessionId
                  ? {
                      ...session,
                      isRegistered: true,
                      currentParticipants: (session.currentParticipants || 0) + 1,
                    }
                  : session,
              ),
            };
          }
          return old;
        });
      }
    },
    onSettled: () => {
      // Invalidate to ensure we have fresh data
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
    },
  });
}

// Cancel a registration
export function useCancelRegistration() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sessionId }) => {
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sessions/${sessionId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to cancel registration');
      }

      return response.json();
    },
    onMutate: async ({ sessionId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: SESSIONS_QUERY_KEY });

      // Snapshot the previous value
      const previousSessions = queryClient.getQueryData(SESSIONS_QUERY_KEY);

      // Don't update the UI here - we'll let the loading state handle the visual feedback
      return { previousSessions, sessionId };
    },
    onError: (err, variables, context) => {
      console.error('Cancellation error:', err);
      if (context?.previousSessions) {
        queryClient.setQueryData(SESSIONS_QUERY_KEY, context.previousSessions);
      }
    },
    onSuccess: (data, variables, context) => {
      // Only update the UI after the request succeeds
      if (context?.sessionId) {
        queryClient.setQueryData(SESSIONS_QUERY_KEY, (old) => {
          if (!old) return old;

          if (old.pages) {
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                sessions: page.sessions.map((session) =>
                  session._id === context.sessionId
                    ? {
                        ...session,
                        isRegistered: false,
                        currentParticipants: Math.max(0, (session.currentParticipants || 0) - 1),
                      }
                    : session,
                ),
              })),
            };
          } else if (old.sessions) {
            return {
              ...old,
              sessions: old.sessions.map((session) =>
                session._id === context.sessionId
                  ? {
                      ...session,
                      isRegistered: false,
                      currentParticipants: Math.max(0, (session.currentParticipants || 0) - 1),
                    }
                  : session,
              ),
            };
          }
          return old;
        });
      }
    },
    onSettled: () => {
      // Invalidate to ensure we have fresh data
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
    },
  });
}
