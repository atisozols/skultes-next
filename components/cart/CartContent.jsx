'use client';
import Link from 'next/link';
import { useCart } from './CartContext';
import timeSlots from '../../utils/book/timeSlots';
import CartItem from './CartItem';

const CartContent = () => {
  const { cart, checkout, total, loading, cartError } = useCart();

  return (
    cart.length > 0 && (
      <div className="relative h-full w-full rounded-3xl bg-white p-7 shadow-lg dark:bg-background">
        <h2 className="pb-6 text-center text-lg font-light tracking-tight text-black sm:text-2xl dark:text-white">
          Rezervāciju grozs
        </h2>
        <div>
          <div className="flex max-h-96 w-full flex-col items-center overflow-y-scroll">
            {cart.map((item) => (
              <div className="w-full" key={item.start_index}>
                <CartItem item={item} />
              </div>
            ))}
          </div>
          {cartError.msg.length > 0 && (
            <div className="flex flex-col gap-5 py-2 text-center text-sm">
              <p>{cartError.msg}</p>
            </div>
          )}
          <div className="flex w-full justify-center pt-7">
            <button
              className="w-full max-w-sm rounded-md bg-background p-2 px-3 text-white shadow-lg hover:underline hover:underline-offset-4 sm:max-w-md dark:bg-foreground dark:text-background"
              onClick={() => checkout()}
            >
              {loading ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : (
                <>Apmaksāt: &euro;{(total() / 100).toFixed(2)}</>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CartContent;
