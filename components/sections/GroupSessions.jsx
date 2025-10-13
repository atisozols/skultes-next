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
      <p className="w-full text-center text-sm">
        Visiem biedriem ar aktīvu Lielās zāles abonementu nodarbības ir{' '}
        <span className="font-medium text-accent">bezmaksas</span>
      </p>
    </Section>
  );
};

export default GroupSessions;
