'use client';
import Link from 'next/link';
import { useCart } from './CartContext';
import timeSlots from '../book/utils/timeSlots';
import CartItem from './CartItem';

const CartContent = ({ toggleCart }) => {
  const { cart } = useCart();

  return (
    <div className="absolute inset-0 flex items-start justify-end p-4 sm:p-8" onClick={toggleCart}>
      <div
        className="relative top-20 mt-2 w-full max-w-lg rounded-3xl bg-white px-4 shadow-md sm:top-24 dark:bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="pb-2 pt-4 text-center text-lg font-bold text-background dark:text-white">
          Rezervāciju grozs
        </h2>
        {cart.length > 0 ? (
          <div className="flex w-full flex-col items-center">
            {cart.map((item) => (
              <div className="w-full p-2" key={item.start_index}>
                <CartItem item={item} />
              </div>
            ))}
            <div className="w-full px-2 pb-2">
              <button className="w-full border-t py-4 font-medium text-background underline-offset-4 hover:underline dark:text-white">
                Apmaksāt
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-10">
            <p className="">Grozs ir tukšs</p>
            <Link
              href="/book"
              className="font-medium text-background underline-offset-4 hover:underline dark:text-white"
              onClick={toggleCart}
            >
              Pieteikties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartContent;
