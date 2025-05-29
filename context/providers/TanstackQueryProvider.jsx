'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function TanstackQueryProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true,
            retry: (failureCount, error) => {
              // Don't retry on 401 (Unauthorized)
              if (error?.status === 401) return false;
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            retryDelay: 1000, // 1 second between retries
            onError: (error) => {
              console.error('Query error:', error);
            },
          },
          mutations: {
            onError: (error) => {
              console.error('Mutation error:', error);
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
