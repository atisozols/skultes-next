// Export all query hooks from a single file for easier imports

// User data
export { useUser, useRefreshUserMutation, USER_QUERY_KEY } from './useUser';

// Availability data
export { useAvailabilityQuery, AVAILABILITY_QUERY_KEY } from './useAvailability';

// Sessions data
export { useSessionsQuery, SESSIONS_QUERY_KEY } from './useSessions';

// Appointments data
export {
  useAppointmentsQuery,
  useCancelAppointmentMutation,
  APPOINTMENTS_QUERY_KEY,
} from './useAppointments';

// Cart state
export { useCartState, CART_QUERY_KEY } from './useCartState';

// Cart checkout
export { useCartMutation } from './useCartMutation';
