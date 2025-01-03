'use client';
import { LuTrash2, LuCalendarPlus } from 'react-icons/lu';
import timeSlots from '../../utils/book/timeSlots';
import { formatAppointmentDate } from '@/utils/appointmentFormatter';
import { useCart } from './CartContext';
import calculatePricing from '@/utils/pricing/calculatePricing';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex w-full justify-between border-t p-3 px-5">
      <div className="flex flex-col items-start justify-center">
        <span className="text-xl font-medium tracking-wider text-black dark:text-foreground">
          {formatAppointmentDate(item.date)}
        </span>
        <span className="font-light">
          {timeSlots[item.start_index]} - {timeSlots[item.end_index]}
        </span>
      </div>
      <div className="flex items-center">
        <div className="border-r pr-5">
          <span className="text-xl text-black dark:text-foreground">
            &euro;{(calculatePricing(item.start_index, item.end_index, item.date) / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center pl-5">
          <button
            className={'text-rose-800'}
            onClick={() => removeFromCart(item.date, item.start_index)}
          >
            <LuTrash2 className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
