'use client';

import { IoFlameSharp } from 'react-icons/io5';
import Container from '../ui/Container';
import Section from '../ui/Section';

const LastVisit = () => {
  return (
    <Section>
      <Container>
        <div className="p-4">
          <h3 className="flex items-center gap-px font-semibold text-accent">
            <IoFlameSharp className="text-xl" /> <span>Iepriekšējais apmekējums</span>
          </h3>
          <p>Tavs iepriekšējais apmeklējums bija pirms 3 dienām</p>
        </div>
      </Container>
    </Section>
  );
};

export default LastVisit;
