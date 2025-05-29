'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

// Checkout mutation function
const checkoutCart = async (cart) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
};

// Hook for cart checkout
export function useCartMutation() {
  const queryClient = useQueryClient();
  const [cartError, setCartError] = useState({ msg: '', conflicts: [] });
  
  const mutation = useMutation({
    mutationFn: checkoutCart,
    onSuccess: (data) => {
      // Clear any previous errors
      setCartError({ msg: '', conflicts: [] });
      
      // Invalidate relevant queries after successful checkout
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      
      // Redirect to the checkout URL
      window.location.href = data.url;
    },
    onError: (error) => {
      setCartError(error);
      console.error('Error during checkout:', error);
    },
  });

  return {
    checkout: mutation.mutate,
    isLoading: mutation.isPending,
    cartError,
    reset: () => {
      setCartError({ msg: '', conflicts: [] });
      mutation.reset();
    }
  };
}
