'use client';

import ReservationForm from '@/components/reservation/ReservationForm';
import TimetableLayout from '@/components/timetable/TimetableLayout';
import Container from '../ui/Container';
import Section from '../ui/Section';
import { useAvailabilityQuery } from '@/hooks/queries/useAvailability';
import { FaLock } from 'react-icons/fa';

const MakeReservation = () => {
  const { data: availability, isLoading, error } = useAvailabilityQuery();

  if (isLoading) {
    return (
      <Section title={<span className="flex items-center text-2xl">Privātā zāle</span>}>
        <Container className="flex h-[268px] animate-pulse items-center justify-center">
          <span className=""></span>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section title={<span className="flex items-center text-2xl">Privātā zāle</span>}>
        <Container className="flex h-[268px] items-center justify-center text-center text-red-500">
          Radās kļūda, ielādējot rezevācijas datus
        </Container>
      </Section>
    );
  }

  return (
    <Section title={<span className="flex items-center text-2xl">Privātā zāle</span>}>
      <Container>{availability && <ReservationForm availability={availability} />}</Container>
    </Section>
  );
};

export default MakeReservation;
