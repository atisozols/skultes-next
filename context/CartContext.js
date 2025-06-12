'use client';
import calculateTotalPricing from '@/utils/pricing/calculateTotalPrice';
import React, { createContext, useContext, useState, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { getToken } = useAuth();
  const [cart, setCart] = useState([]);

  const [cartError, setCartError] = useState({ msg: '', conflicts: [] });

  const [loading, setLoading] = useState(false);

  // Track if an item has been added to cart in this session
  const isFirstAddToCart = useRef(true);

  const removeFromCart = (date, start_index) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.start_index === start_index && item.date === date)),
    );
  };

  const addToCart = (appointment) => {
    setCart((prevCart) => [...prevCart, appointment]);

    // If this is the first time adding to cart in this session, scroll the cart into view
    if (isFirstAddToCart.current) {
      setTimeout(() => {
        const cartElement = document.getElementById('cart');
        if (cartElement) {
          cartElement.scrollIntoView({ behavior: 'smooth' });
        }
        isFirstAddToCart.current = false;
      }, 100);
    }
  };

  const checkout = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

  const total = (half = false) => {
    return calculateTotalPricing(cart, half);
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
