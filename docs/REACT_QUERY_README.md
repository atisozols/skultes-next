# React Query Implementation for Skultes App

This document explains the React Query implementation for the Skultes app, providing a unified data fetching and state management solution.

## Structure

The React Query implementation follows this structure:

```
skultes-next/
├── context/
│   ├── ReactQueryCartContext.js       # Cart context using React Query
│   ├── ReactQueryUserContext.js       # User context using React Query
│   └── providers/
│       ├── ReactQueryProvider.jsx     # Base React Query provider
│       └── ReactQueryProviders.jsx    # Combined providers
├── hooks/
│   └── queries/
│       ├── index.js                   # Exports all query hooks
│       ├── useAppointmentsQuery.js    # Hooks for appointments/reservations
│       ├── useAvailabilityQuery.js    # Hooks for availability data
│       ├── useCartMutation.js         # Hooks for cart checkout
│       ├── useCartState.js            # Hooks for cart state management
│       ├── useSessionsQuery.js        # Hooks for sessions data
│       └── useUserQuery.js            # Hooks for user data
└── components/
    └── examples/                      # Example components using React Query
```

## Key Features

### 1. Query Hooks

Each data type has its own query hook that handles:
- Data fetching
- Caching
- Loading states
- Error handling
- Refetching

### 2. Context Providers

The context providers use React Query hooks internally and provide a similar API to your existing contexts, making migration easier.

### 3. Mutation Hooks

Mutation hooks handle data modifications like:
- Cancelling appointments
- Checking out cart items
- Refreshing user data

### 4. Demo Components

Example components show how to use React Query in your application.

## Usage

### Fetching Data

```jsx
import { useSessionsQuery } from '@/hooks/queries';

function MyComponent() {
  const { data, isLoading, isError, error, refetch } = useSessionsQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data.sessions.map(session => (
        <div key={session._id}>{session.title}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Using Context

```jsx
import { useReactQueryUser } from '@/context/ReactQueryUserContext';
import { useReactQueryCart } from '@/context/ReactQueryCartContext';

function MyComponent() {
  const { userData, loading, refresh } = useReactQueryUser();
  const { cart, addToCart, removeFromCart, checkout } = useReactQueryCart();
  
  // Use the context values as needed
}
```

### Mutations

```jsx
import { useCancelAppointmentMutation } from '@/hooks/queries';

function MyComponent() {
  const cancelMutation = useCancelAppointmentMutation();
  
  const handleCancel = async (appointmentId) => {
    try {
      await cancelMutation.mutateAsync(appointmentId);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <button 
      onClick={() => handleCancel('123')}
      disabled={cancelMutation.isPending}
    >
      {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Appointment'}
    </button>
  );
}
```

## Benefits Over Current Implementation

1. **Centralized Data Management**: All data fetching logic is centralized in query hooks
2. **Automatic Caching**: Data is cached and reused when possible
3. **Background Refetching**: Data is refreshed in the background
4. **Consistent Loading States**: Built-in handling of loading and error states
5. **Devtools**: Powerful debugging tools to inspect queries
6. **Optimistic Updates**: Update UI immediately before server confirms changes
7. **Prefetching**: Ability to prefetch data for improved UX
8. **Pagination & Infinite Scroll**: Built-in support for advanced data fetching patterns
9. **Query Invalidation**: Automatically refresh related data when changes occur
10. **Parallel Queries**: Easily fetch multiple data sources in parallel

## Next Steps

1. Review the [Migration Guide](./REACT_QUERY_MIGRATION.md)
2. Explore the example components in `/components/examples/`
3. Visit the demo page at `/react-query-demo`
4. Start migrating components one by one
