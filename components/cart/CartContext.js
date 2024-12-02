import calculateTotalPricing from '@/utils/pricing/calculateTotalPrice';
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (appointment) => {
    setCart((prevCart) => [...prevCart, appointment]);
    console.log('added to cart:', appointment);
  };

  const removeFromCart = (date, start_index) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.start_index === start_index && item.date === date)),
    );
  };

  const checkout = () => {
    console.log('Checkout with the following:', cart);
  };

  const total = () => {
    return calculateTotalPricing(cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, checkout, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
