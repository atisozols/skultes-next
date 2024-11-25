'use client';
import { MdShoppingCart, MdOutlineShoppingCart } from 'react-icons/md';
import { useCart } from './CartContext';

const CartButton = ({ toggleCart }) => {
  const { cart } = useCart();

  return (
    <button onClick={toggleCart} className="relative mb-1 flex items-center justify-center lg:mr-5">
      {/* Display the filled icon if cartItems > 0, else the outline */}
      {cart.length > 0 ? (
        <MdShoppingCart className="h-8 w-8 text-2xl text-white dark:text-foreground" />
      ) : (
        <MdOutlineShoppingCart className="h-8 w-8 text-2xl text-white dark:text-foreground" />
      )}
      {/* Cart item count badge */}
      {cart.length > 0 && (
        <span className="absolute -right-2 -top-2 rounded-full bg-violet-400 px-1.5 py-0.5 text-xs font-bold text-white dark:bg-foreground dark:text-background">
          {cart.length}
        </span>
      )}
    </button>
  );
};

export default CartButton;
