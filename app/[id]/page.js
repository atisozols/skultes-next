import dbConnect from '@/utils/dbConnect';
import Appointment from '@/models/Appointment';
import stripe from '@/utils/stripe';
import { formatAppointmentData } from '@/utils/appointmentFormatter';
import Navbar from '@/components/Navbar';
import Reservations from '@/components/success/Reservations';
import Footer from '@/components/Footer';

export default async function Page({ params }) {
  const { id } = params;

  try {
    await dbConnect();

    const session = await stripe.checkout.sessions.retrieve(`cs_live_${id}`);
    const appointments = await Appointment.find({
      checkout: `cs_live_${id}`,
      status: 'paid',
    });

    const appointmentData = formatAppointmentData(appointments);

    return (
      <>
        <Navbar />
        <main className="flex w-full max-w-xl flex-col items-stretch gap-4 sm:gap-8 lg:max-w-5xl lg:flex-row">
          <Reservations session={session} appointments={appointmentData} />
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    return (
      <div className="flex flex-grow items-center justify-center break-all text-xs">
        <p>Error: {error.message}</p>
      </div>
    );
  }
}
