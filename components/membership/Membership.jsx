'use client';
import Section from '../ui/Section';
import Container from '../ui/Container';
import LastVisit from '../sections/LastVisit';
import ExtendMembership from './ExtendMembership';
import { useRef } from 'react';

const Membership = () => {
  const containerRef = useRef(null);

  return (
    <Section title="">
      <Container>
        {/* <LastVisit /> */}
        <div className="" ref={containerRef}>
          <ExtendMembership containerRef={containerRef} />
        </div>
      </Container>
    </Section>
  );
};

export default Membership;
