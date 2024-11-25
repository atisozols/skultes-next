import { LuTrash2, LuCalendarPlus } from 'react-icons/lu';
import timeSlots from '../book/utils/timeSlots';

const CartItem = ({ item }) => {
  return (
    <div className="flex w-full justify-between border-t p-3 px-5">
      <div className="flex flex-col items-start justify-center">
        <span className="text-xl font-medium tracking-wider text-background dark:text-foreground">
          {item.date}
        </span>
        <span className="font-light">
          {timeSlots[item.start_index]} - {timeSlots[item.end_index]}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <button className={'text-rose-700'}>
          <LuTrash2 className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
