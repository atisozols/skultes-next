import ReservationForm from '@/components/reservation/ReservationForm';
import TimetableLayout from '@/components/timetable/TimetableLayout';
import Container from '../ui/Container';
import Section from '../ui/Section';

const MakeReservation = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/api/availability`, {
    cache: 'no-store',
  });
  const availability = await res.json();

  return (
    <Section title={'Rezervēt mazo zāli'}>
      <Container>
        <TimetableLayout availability={availability} />
        <ReservationForm availability={availability} />
      </Container>
    </Section>
  );
};

export default MakeReservation;
