'use client';
import Section from '../ui/Section';
import Container from '../ui/Container';
import ExtendMembership from '../membership/ExtendMembership';
import { useRef } from 'react';
import { FaStar } from 'react-icons/fa';

const Membership = () => {
  const containerRef = useRef(null);

  return (
    <Section title={<span className="flex items-center text-2xl">Lielā zāle</span>}>
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
