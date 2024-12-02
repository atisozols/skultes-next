import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (appointment) => {
    setCart((prevCart) => [...prevCart, appointment]);
    console.log('added to cart:', appointment);
  };

  const removeFromCart = (appointmentId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== appointmentId));
  };

  const checkout = () => {
    console.log('Checkout with the following:', cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};