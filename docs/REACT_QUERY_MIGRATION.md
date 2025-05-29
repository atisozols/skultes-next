# React Query Migration Guide

This guide explains how to migrate from the current data fetching approach to TanStack React Query in the Skultes app.

## Overview

TanStack React Query has been set up as a parallel implementation to your existing data fetching logic. This allows you to migrate gradually, one component at a time, without breaking the existing functionality.

## Migration Steps

### Step 1: Add React Query Provider to your app

First, you need to wrap your application with the React Query provider. Add it to your root layout:

```jsx
// app/layout.jsx
import ReactQueryProvider from '@/context/providers/ReactQueryProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {/* Your existing providers */}
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
```

### Step 2: Migrate Server Components to Client Components with React Query

For server components that fetch data (like `MakeReservation.jsx` and `MyReservations.jsx`), you'll need to:

1. Convert them to client components
2. Replace the server-side fetch with React Query hooks

#### Example: Converting MakeReservation.jsx

**Before (Server Component):**
```jsx
// components/home/MakeReservation.jsx
import ReservationForm from '@/components/reservation/ReservationForm';
import TimetableLayout from '@/components/timetable/TimetableLayout';
import Container from '../ui/Container';
import Section from '../ui/Section';

const MakeReservation = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/api/availability`, {
    cache: 'no-store',
  });
  const availability = await res.json();

  return (
    <Section title={'Rezervēt mazo zāli'}>
      <Container>
        <TimetableLayout availability={availability} />
        <ReservationForm availability={availability} />
      </Container>
    </Section>
  );
};

export default MakeReservation;
```

**After (Client Component with React Query):**
```jsx
'use client';

import ReservationForm from '@/components/reservation/ReservationForm';
import TimetableLayout from '@/components/timetable/TimetableLayout';
import Container from '../ui/Container';
import Section from '../ui/Section';
import { useAvailabilityQuery } from '@/hooks/queries';

const MakeReservation = () => {
  const { data: availability, isLoading, isError } = useAvailabilityQuery();

  if (isLoading) {
    return <div>Loading availability...</div>;
  }

  if (isError) {
    return <div>Error loading availability data</div>;
  }

  return (
    <Section title={'Rezervēt mazo zāli'}>
      <Container>
        <TimetableLayout availability={availability} />
        <ReservationForm availability={availability} />
      </Container>
    </Section>
  );
};

export default MakeReservation;
```

### Step 3: Replace Context Providers

Replace your existing context providers with the React Query versions:

1. Replace `UserProvider` with `ReactQueryUserProvider`
2. Replace `CartProvider` with `ReactQueryCartProvider`

You can do this gradually by:

1. First, having both providers active
2. Migrating components to use the React Query hooks
3. Eventually removing the old providers

### Step 4: Update Component Imports

In your components, replace:

```jsx
import { useUser } from '@/context/UserContext';
```

with:

```jsx
import { useReactQueryUser } from '@/context/ReactQueryUserContext';
```

And replace:

```jsx
import { useCart } from '@/context/CartContext';
```

with:

```jsx
import { useReactQueryCart } from '@/context/ReactQueryCartContext';
```

### Step 5: Migrate Individual Components

For each component that uses data fetching or context:

1. Identify the data dependencies
2. Replace with the appropriate React Query hooks
3. Update the component to handle loading and error states

## Benefits of React Query

- **Automatic caching**: Data is cached and reused when possible
- **Background refetching**: Data is refreshed in the background
- **Loading and error states**: Built-in handling of loading and error states
- **Devtools**: Powerful debugging tools to inspect queries
- **Mutation handling**: Simplified API for data mutations
- **Prefetching**: Ability to prefetch data for improved UX

## Example Components

Check out the example components in `/components/examples/` to see how to use React Query in your application:

- `UserProfileWithReactQuery.jsx`: Example of using user data
- `SessionsWithReactQuery.jsx`: Example of fetching and displaying sessions
- `AvailabilityWithReactQuery.jsx`: Example of fetching and using availability data
- `CartWithReactQuery.jsx`: Example of using the cart with React Query
- `AppointmentsWithReactQuery.jsx`: Example of fetching and managing appointments

## Demo Page

Visit `/react-query-demo` to see a working example of all the React Query components together.
