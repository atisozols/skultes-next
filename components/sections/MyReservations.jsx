'use client';

import { useAppointments } from '@/hooks/queries/useAppointments';
import ReservationList from '../reservation/ReservationList';
import Container from '../ui/Container';
import Section from '../ui/Section';

const MyReservations = () => {
  const { data, isLoading, error } = useAppointments();

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  // If no appointments or empty array
  if (!data?.appointments?.length) {
    return null;
  }

  return (
    <Section title="Privātās zāles rezervācijas">
      <Container>
        <ReservationList appointments={data.appointments} />
      </Container>
      <p className="w-full text-center text-xs text-alternate">
        Atcelt iespējams ne vēlāk kā 12 stundas pirms rezevācijas sākuma, tādējādi iegūstot kuponu
        apmeklējuma vērtībā
      </p>
    </Section>
  );
};

export default MyReservations;
