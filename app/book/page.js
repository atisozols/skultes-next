import ReservationForm from '@/components/book/ReservationForm';
import TimetableLayout from '@/components/book/TimetableLayout';
import CartContent from '@/components/cart/CartContent';

export default async function Home() {
  const res = await fetch(`${process.env.SERVER_URL}/api/availability`, {
    cache: 'no-store',
  });
  const availability = await res.json();

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
