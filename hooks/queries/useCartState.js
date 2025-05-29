'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';
import calculateTotalPricing from '@/utils/pricing/calculateTotalPrice';

// Cart query key
export const CART_QUERY_KEY = ['cart'];

// Hook for managing cart state with React Query
export function useCartState() {
  const queryClient = useQueryClient();
  const [cart, setCart] = useState([]);
  const [isFirstAddToCart, setIsFirstAddToCart] = useState(true);

  // Initialize cart from query cache if available
  useEffect(() => {
    const cachedCart = queryClient.getQueryData(CART_QUERY_KEY);
    if (cachedCart) {
      setCart(cachedCart);
    }
  }, [queryClient]);

  // Update query cache whenever cart changes
  useEffect(() => {
    queryClient.setQueryData(CART_QUERY_KEY, cart);
  }, [cart, queryClient]);

  // Add item to cart
  const addToCart = useCallback((appointment) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, appointment];
      return newCart;
    });

    // If this is the first time adding to cart in this session, scroll the cart into view
    if (isFirstAddToCart) {
      setTimeout(() => {
        const cartElement = document.getElementById('cart');
        if (cartElement) {
          cartElement.scrollIntoView({ behavior: 'smooth' });
        }
        setIsFirstAddToCart(false);
      }, 100);
    }
  }, [isFirstAddToCart]);

  // Remove item from cart
  const removeFromCart = useCallback((date, start_index) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.start_index === start_index && item.date === date))
    );
  }, []);

  // Calculate total price
  const total = useCallback((half = false) => {
    return calculateTotalPricing(cart, half);
  }, [cart]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    total,
    clearCart
  };
}
