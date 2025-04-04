import ReservationList from '../reservation/ReservationList';
import Container from '../ui/Container';
import Section from '../ui/Section';
import { auth } from '@clerk/nextjs/server';

const MyReservations = async () => {
  const authObject = await auth();
  const token = await authObject.getToken();

  const res = await fetch(`${process.env.SERVER_URL}/api/appointments`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    const order = await res.json();
    return (
      <Section title={'Manas rezervācijas'}>
        <Container>
          <ReservationList appointments={order.payment_data} />
        </Container>
        <p className="w-full text-center text-xs text-alternate">
          Atcelt iespējams ne vēlāk kā 24 stundas pirms rezevācijas sākuma, tādējādi iegūstot kuponu
          apmeklējuma vērtībā
        </p>
      </Section>
    );
  } else {
    const err = await res.json();
    return (
      <Section title={'Neizdevās ielādēt rezervācijas'}>
        <p className="overflow-x-scroll text-nowrap">{err.msg}</p>
      </Section>
    );
  }
};

export default MyReservations;
