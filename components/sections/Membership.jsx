'use client';
import Section from '../ui/Section';
import Container from '../ui/Container';
import ExtendMembership from '../membership/ExtendMembership';
import { useRef } from 'react';
import Link from 'next/link';
import PublicGymStatus from './PublicGymStatus';

const Membership = () => {
  const containerRef = useRef(null);

  return (
    <Section title={<span className="flex items-center text-2xl">Lielā zāle</span>}>
      <Container>
        <PublicGymStatus />
        <div className="" ref={containerRef}>
          <ExtendMembership containerRef={containerRef} />
        </div>
      </Container>
      <p className="text-center text-xs text-alternate">
        <span className="font-medium">
          Skolēniem, studentiem līdz 25 gadu vecumam un pensionāriem
        </span>{' '}
        pieejama 40% atlaide.{' '}
        <Link href="#contact" className="underline">
          Sazinies ar mums
        </Link>
        , lai saņemtu šo piedāvājumu!
      </p>
    </Section>
  );
};

export default Membership;
