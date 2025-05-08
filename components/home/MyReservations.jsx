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
    const data = await res.json();
    return data.appointments.length > 0 ? (
      <Section title={'Manas rezervācijas'}>
        <Container>
          <ReservationList appointments={data.appointments} />
        </Container>
        <p className="w-full text-center text-xs text-alternate">
          Atcelt iespējams ne vēlāk kā 12 stundas pirms rezevācijas sākuma, tādējādi iegūstot kuponu
          apmeklējuma vērtībā
        </p>
      </Section>
    ) : (
      <></>
    );
  } else {
    const data = await res.json();
    return (
      <Section title={'Neizdevās ielādēt rezervācijas'}>
        <p className="overflow-x-scroll text-nowrap">{data.msg}</p>
      </Section>
    );
  }
};

export default MyReservations;
