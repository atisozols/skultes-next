'use client';
import Carousel from '../ui/Carousel';
import GroupSession from './GroupSession';
import Container from '../ui/Container';

const AvailableSessions = ({ sessions }) => {
  return (
    <Carousel width="100%" origin="auto" perView={1.3} loop={false} mode="snap">
      {sessions.map((session) => (
        <Container key={session._id}>
          <GroupSession session={session} />
        </Container>
      ))}
    </Carousel>
  );
};

export default AvailableSessions;
