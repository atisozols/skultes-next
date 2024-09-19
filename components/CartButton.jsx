import { MdShoppingCart, MdOutlineShoppingCart } from 'react-icons/md';

const CartButton = ({ cartItems = 3 }) => {
  return (
    <button className="relative flex items-center justify-center lg:mr-5 mb-1">
      {/* Display the filled icon if cartItems > 0, else the outline */}
      {cartItems > 0 ? (
        <MdShoppingCart className="h-8 w-8 text-2xl text-white" />
      ) : (
        <MdOutlineShoppingCart className="h-8 w-8 text-2xl text-white" />
      )}
      {/* Cart item count badge */}
      {cartItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-violet-400 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
          {cartItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;
