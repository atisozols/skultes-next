'use client';
import { useCart } from './CartContext';
import CartItem from './CartItem';
import { useUser } from '@clerk/nextjs';

const CartContent = () => {
  const { cart, checkout, total, loading, cartError } = useCart();
  const { isSignedIn } = useUser();

  return (
    <div>
      <div className="scrollbar-hide flex max-h-96 w-full flex-col items-center overflow-y-scroll">
        {cart.map((item, index) => (
          <div
            key={index}
            style={{ borderBottomWidth: `${index <= cart.length - 1 ? '0.5px' : '0'}` }}
            className={`w-full border-alternate px-3.5 py-3 ${index <= cart.length - 1 ? 'border-b' : ''}`}
          >
            <CartItem item={item} />
          </div>
        ))}
      </div>
      {cartError.msg.length > 0 && (
        <div className="flex flex-col gap-5 py-2 text-center text-sm">
          <p>{cartError.msg}</p>
        </div>
      )}
      <div className="flex w-full justify-center">
        <button className="w-full cursor-pointer p-2 text-base" onClick={() => checkout()}>
          {loading ? (
            <div className="p-2">
              <span className="loading loading-dots loading-xs"></span>
            </div>
          ) : (
            <div className="w-full rounded-lg p-2 hover:bg-white hover:bg-opacity-5">
              Apmaksāt: &euro;{(total(isSignedIn) / 100).toFixed(2)}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartContent;
