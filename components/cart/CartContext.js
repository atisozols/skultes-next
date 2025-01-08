'use client';
import calculateTotalPricing from '@/utils/pricing/calculateTotalPrice';
import { ClerkProvider } from '@clerk/nextjs';
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [cartError, setCartError] = useState({ msg: '', conflicts: [] });

  const [loading, setLoading] = useState(false);

  const removeFromCart = (date, start_index) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.start_index === start_index && item.date === date)),
    );
  };

  const addToCart = (appointment) => {
    setCart((prevCart) => [...prevCart, appointment]);
  };

  const checkout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        setCartError(errorData);
        console.error('Error during checkout:', errorData);
      } else {
        setCartError({ msg: '', conflicts: [] });
        const data = await response.json();
        console.log('Checkout success:', data);
        window.location.href = data.url;
      }
    } catch (error) {
      setLoading(false);
      console.error('Network error during checkout:', error);
    }
  };

  const total = () => {
    return calculateTotalPricing(cart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, checkout, total, loading, cartError }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
