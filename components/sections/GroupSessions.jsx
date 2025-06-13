'use client';
import React from 'react';
import Section from '../ui/Section';
import AvailableSessions from '../sessions/AvailableSessions';
import { useSessionsQuery } from '@/hooks/queries/useSessions';

const GroupSessions = () => {
  const { data, isLoading, error } = useSessionsQuery();

  if (isLoading) return null;
  if (error) return null;
  if (!data || !data.sessions || data.sessions.length === 0) return null;
  return (
    <Section title="Grupu nodarbības">
      <AvailableSessions sessions={data.sessions} />
      <p className="w-full text-center text-xs text-alternate">
        Katras nodarbības cena: €10.00. Atcelt dalību iespējams divas stundas pirms nodarbības,
        pretējā gadījumā par nodarbību ir jāmaksā.
      </p>
    </Section>
  );
};

export default GroupSessions;
