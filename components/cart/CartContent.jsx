'use client';
import Link from 'next/link';
import { useCart } from './CartContext';
import timeSlots from '../../utils/book/timeSlots';
import CartItem from './CartItem';
import Card from '../ui/Card';
import CardTitle from '../ui/CardTitle';

const CartContent = () => {
  const { cart, checkout, total, loading, cartError } = useCart();

  return (
    cart.length > 0 && (
      <Card>
        <CardTitle>Rezervāciju grozs</CardTitle>
        <div>
          <div className="scrollbar-hide flex max-h-96 w-full flex-col items-center gap-2 overflow-y-scroll">
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
          <div className="flex w-full justify-center pt-5">
            <button
              className="w-full max-w-sm rounded-md bg-emerald-500 p-2 px-3 text-white shadow-lg transition-all hover:opacity-90 sm:max-w-md dark:bg-emerald-600"
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
      </Card>
    )
  );
};

export default CartContent;
