'use client';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import CartItem from './CartItem';
import { useUser } from '@clerk/nextjs';

const CartContent = () => {
  const { cart, checkout, total, loading, cartError } = useCart();
  const { isSignedIn } = useUser();

  return (
    <div id="cart">
      <div className="scrollbar-hide flex max-h-96 w-full flex-col items-center overflow-y-scroll">
        {cart.map((item, index) => (
          <div
            key={index}
            style={{ borderBottomWidth: `${index < cart.length - 1 ? '0.5px' : '0'}` }}
            className={`w-full border-alternate px-3.5 py-3 ${index < cart.length - 1 ? 'border-b' : ''}`}
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
      <div className="flex w-full justify-center px-3.5 pb-3.5">
        <Button
          size="default"
          loading={loading}
          onClick={() => checkout()}
          className="w-full font-medium uppercase"
          disabled={loading}
        >
          Apmaksāt: &euro;{(total(isSignedIn) / 100).toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default CartContent;
