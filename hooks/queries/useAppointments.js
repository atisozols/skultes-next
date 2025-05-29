'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query key constants
export const APPOINTMENTS_QUERY_KEY = ['appointments'];

// Fetch user appointments from the API
const fetchAppointments = async (token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/appointments`, {
    method: 'GET',
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

// Cancel an appointment
const cancelAppointment = async (appointmentId, token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/appointments/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: appointmentId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData.message || 'Failed to cancel appointment');
    return null;
  }

  return response.json();
};

// Hook for fetching user appointments
export function useAppointments() {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: APPOINTMENTS_QUERY_KEY,
    queryFn: async () => fetchAppointments(await getToken()),
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

// Hook for cancelling an appointment
export function useCancelAppointmentMutation() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentId) => cancelAppointment(appointmentId, await getToken()),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: APPOINTMENTS_QUERY_KEY });
      return data;
    },
  });
}
