'use client';
import Section from '../ui/Section';
import Container from '../ui/Container';
import MembershipStatus from './MembershipStatus';
import ExtendMembership from './ExtendMembership';
import { useRef } from 'react';
import { IoFlameSharp } from 'react-icons/io5';

const Membership = () => {
  const containerRef = useRef(null);

  return (
    <Section title="">
      <Container>
        <div className="" ref={containerRef}>
          <MembershipStatus />
          <ExtendMembership containerRef={containerRef} />
        </div>
      </Container>
    </Section>
  );
};

export default Membership;
