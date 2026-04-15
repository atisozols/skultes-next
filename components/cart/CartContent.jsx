'use client';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import CartItem from './CartItem';
import PhotoUploadModal from '../ui/PhotoUploadModal';
import { LuCamera } from 'react-icons/lu';

const isVerificationError = (msg) =>
  typeof msg === 'string' && msg.toLowerCase().includes('photo verification');

const CartContent = () => {
  const { cart, checkout, total, loading, cartError } = useCart();
  const [showPhotoModal, setShowPhotoModal] = useState(false);

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
        isVerificationError(cartError.msg) ? (
          <div className="mx-3.5 my-2 flex items-center gap-3 rounded-xl bg-red-950/60 px-3.5 py-3">
            <LuCamera className="shrink-0 text-lg text-red-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-200">Nepieciešama foto verifikācija</p>
              <p className="mt-0.5 text-xs text-red-300/70">Pirms pirkuma jāaugšupielādē foto.</p>
            </div>
            <button
              onClick={() => setShowPhotoModal(true)}
              className="shrink-0 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-200 transition-colors active:bg-red-500/30"
            >
              Augšupielādēt
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5 py-2 text-center text-sm">
            <p>{cartError.msg}</p>
          </div>
        )
      )}
      <div className="flex w-full justify-center px-3.5 pb-3.5">
        <Button
          size="default"
          loading={loading}
          onClick={() => checkout()}
          className="w-full font-medium uppercase"
          disabled={loading}
        >
          Apmaksāt: &euro;{(total() / 100).toFixed(2)}
        </Button>
      </div>

      {showPhotoModal && (
        <PhotoUploadModal onClose={() => setShowPhotoModal(false)} />
      )}
    </div>
  );
};

export default CartContent;
