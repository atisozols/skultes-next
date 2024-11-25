'use client';
import { useState, useEffect } from 'react';
import CartButton from './CartButton';
import CartContent from './CartContent';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="">
      <CartButton toggleCart={toggleCart} />
      {isOpen && <CartContent toggleCart={toggleCart} />}
    </div>
  );
};

export default Cart;
