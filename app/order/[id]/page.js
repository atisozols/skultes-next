import dbConnect from '@/utils/dbConnect';
import Appointment from '@/models/Appointment';
import stripe from '@/utils/stripe';
import { formatAppointmentData } from '@/utils/appointmentFormatter';
import Reservations from '@/components/success/Reservations';
import Card from '@/components/ui/Card';
import CardTitle from '@/components/ui/CardTitle';

export default async function Page({ params }) {
  const { id } = params;

  const res = await fetch(`${process.env.SERVER_URL}/api/checkout/${id}`, { cache: 'no-store' });
  if (res.ok) {
    const order = await res.json();
    return <Reservations appointments={order.payment_data} />;
  } else {
    const err = await res.json();
    return (
      <Card>
        <CardTitle>Kļūda: </CardTitle>
        <p className="overflow-x-scroll text-nowrap">{err.msg}</p>
      </Card>
    );
  }
}
