'use client';

import { useSessionsQuery } from '@/hooks/queries/useSessions';
import Container from '../ui/Container';
import Section from '../ui/Section';
import MySessionsList from '../sessions/MySessionsList';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

const MySessions = () => {
  const { data, isLoading, error } = useSessionsQuery();
  const { userId } = useAuth();
  const [registeredSessions, setRegisteredSessions] = useState([]);

  useEffect(() => {
    if (data?.sessions && userId) {
      const userSessions = data.sessions.filter((session) => session.isRegistered);
      setRegisteredSessions(userSessions);
    }
  }, [data?.sessions, userId]);

  if (isLoading) {
    return null;
  }

  if (error) {
    console.error('Error loading sessions:', error);
    return null;
  }

  if (!registeredSessions?.length) {
    return null;
  }

  return (
    <Section title="Manas nodarbības">
      <Container>
        <MySessionsList sessions={registeredSessions} />
      </Container>
      <p className="w-full text-center text-xs text-alternate">
        Atcelt iespējams ne vēlāk kā 2 stundas pirms nodarbības sākuma
      </p>
    </Section>
  );
};

export default MySessions;
