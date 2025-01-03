import ReservationForm from '@/components/book/ReservationForm';
import TimetableLayout from '@/components/book/TimetableLayout';
import CartContent from '@/components/cart/CartContent';
import { getAvailability } from '@/utils/getAvailability';

// export const dynamic = 'force-dynamic';

export default async function Home() {
  const availability = await getAvailability();

  return (
    <>
      <div className="w-full lg:w-1/2">
        <TimetableLayout availability={availability} />
      </div>

      <div className="flex w-full flex-col lg:w-1/2">
        <ReservationForm availability={availability} />
        <CartContent />
      </div>
    </>
  );
}
