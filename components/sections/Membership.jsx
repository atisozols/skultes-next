'use client';
import Section from '../ui/Section';
import Container from '../ui/Container';
import ExtendMembership from '../membership/ExtendMembership';
import OccupancyGraph from './OccupancyGraph';
import VisitStats from './VisitStats';
import { useUser } from '@/hooks/queries/useUser';
import { useRef } from 'react';

const Membership = () => {
  const containerRef = useRef(null);
  const { data: userData, isLoading } = useUser();
  const isMember = Boolean(userData?.isMember);

  if (isLoading || !userData) return null;

  return (
    <>
      {isMember ? (
        <Section title={<span className="flex items-center text-lg">Apmeklējumi</span>}>
          <VisitStats />
        </Section>
      ) : null}
      <Section title={<span className="flex items-center text-lg">Lielā zāle</span>}>
        <Container className="py-2">
          {isMember ? <OccupancyGraph /> : null}
          <div ref={containerRef}>
            <ExtendMembership containerRef={containerRef} />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Membership;
