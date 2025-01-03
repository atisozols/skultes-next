import ReservationForm from '@/components/book/ReservationForm';
import Timetable from '@/components/book/Timetable';
import CartContent from '@/components/cart/CartContent';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { getAvailability } from '@/utils/getAvailability';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const availability = await getAvailability();

  return (
    <>
      <Navbar />
      <main className="flex w-full max-w-xl flex-col items-start gap-4 sm:gap-8 lg:max-w-5xl lg:flex-row">
        <Timetable availability={availability} />
        <div className="flex w-full flex-col gap-4 sm:gap-8 lg:w-1/2">
          <ReservationForm availability={availability} />
          <CartContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
