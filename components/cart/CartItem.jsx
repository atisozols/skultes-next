'use client';
import { LuX } from 'react-icons/lu';
import timeSlots from '../../utils/book/timeSlots';
import { formatAppointmentDate } from '@/utils/appointmentFormatter';
import { useCart } from './CartContext';
import calculatePricing from '@/utils/pricing/calculatePricing';
import { useUser } from '@clerk/nextjs';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();
  const { isSignedIn } = useUser();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col items-start justify-center">
        <span className="text-xs font-semibold uppercase text-alternate">
          {new Intl.DateTimeFormat('lv-LV', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          }).format(new Date(item.date))}
        </span>
        <span className="">
          {timeSlots[item.start_index]} - {timeSlots[item.end_index]}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-base font-medium">
          &euro;
          {(calculatePricing(item.start_index, item.end_index, isSignedIn) / 100).toFixed(2)}
        </span>
        <div className="flex items-center">
          <button
            className={
              'rounded-lg p-2 text-accent transition-all hover:bg-white hover:bg-opacity-5'
            }
            onClick={() => removeFromCart(item.date, item.start_index)}
          >
            <LuX className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
