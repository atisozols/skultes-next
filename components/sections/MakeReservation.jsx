'use client';

import ReservationForm from '@/components/reservation/ReservationForm';
import TimetableLayout from '@/components/timetable/TimetableLayout';
import Container from '../ui/Container';
import Section from '../ui/Section';
import { useAvailabilityQuery } from '@/hooks/queries/useAvailability';
import { FaLock } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';

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
      {new Date() < new Date('2026-01-01') && (
        <Container className="mb-3 border border-foreground">
          <div className="flex items-center px-4 py-2 text-sm text-foreground">
            <FaCircleInfo className="mr-2" />{' '}
            <span>No 01.01.2026. cena mainās uz 25&euro;/stundā</span>
          </div>
        </Container>
      )}
      <Container>{availability && <ReservationForm availability={availability} />}</Container>
    </Section>
  );
};

export default MakeReservation;
