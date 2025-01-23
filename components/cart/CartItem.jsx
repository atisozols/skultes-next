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
    <div className="flex w-full justify-between gap-4 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
      <div className="flex w-full items-center justify-start gap-2 rounded-md px-2">
        <span className="text-base font-normal tracking-wider text-black dark:text-foreground">
          {formatAppointmentDate(item.date)}
        </span>
        <span className="text-base font-extralight">
          {timeSlots[item.start_index]} - {timeSlots[item.end_index]}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-base text-black dark:text-foreground">
          &euro;
          {(calculatePricing(item.start_index, item.end_index, isSignedIn) / 100).toFixed(2)}
        </span>
        <div className="flex items-center">
          <button
            className={
              'rounded-lg p-2 text-rose-800 transition-all hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-5'
            }
            onClick={() => removeFromCart(item.date, item.start_index)}
          >
            <LuX className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
