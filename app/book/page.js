import ReservationForm from '@/components/book/ReservationForm';
import Timetable from '@/components/book/Timetable';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default async function Home() {
  const response = await fetch('http://localhost:5000/api/availability', {
    cache: 'no-store', // Ensures fresh data is fetched every time
  });

  const availability = await response.json(); // Parse the JSON response
  return (
    <>
      <Navbar />
      <main className="flex flex-col lg:flex-row gap-8 items-stretch w-full max-w-xl lg:max-w-5xl">
        <Timetable availability={availability} />
        <ReservationForm availability={availability} />
      </main>
      <Footer />
    </>
  );
}
