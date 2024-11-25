import ReservationForm from '@/components/book/ReservationForm';
import Timetable from '@/components/book/Timetable';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { getAvailability } from '@/utils/getAvailability';

export default async function Home() {
  const availability = await getAvailability();

  return (
    <>
      <Navbar />
      <main className="flex w-full max-w-xl flex-col items-stretch gap-4 sm:gap-8 lg:max-w-5xl lg:flex-row">
        <Timetable availability={availability} />
        <ReservationForm availability={availability} />
      </main>
      <Footer />
    </>
  );
}
