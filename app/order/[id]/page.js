import dbConnect from '@/utils/dbConnect';
import Appointment from '@/models/Appointment';
import stripe from '@/utils/stripe';
import { formatAppointmentData } from '@/utils/appointmentFormatter';
import Reservations from '@/components/success/Reservations';

export default async function Page({ params }) {
  const { id } = params;

  try {
    await dbConnect();

    const session = await stripe.checkout.sessions.retrieve(id);
    const appointments = await Appointment.find({
      checkout: id,
      status: 'paid',
    });

    const appointmentData = formatAppointmentData(appointments);

    return <Reservations session={session} appointments={appointmentData} />;
  } catch (error) {
    return (
      <div className="flex flex-grow items-center justify-center break-all text-xs">
        <p>Error: {error.message}</p>
      </div>
    );
  }
}
