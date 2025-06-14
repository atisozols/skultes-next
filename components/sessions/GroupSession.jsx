import React from 'react';
import { Button } from '../ui/Button';
import {
  MdPerson,
  MdClose,
  MdCheck,
  MdOutlineAccessTime,
  MdCalendarMonth,
  MdLocationPin,
} from 'react-icons/md';
import { useRegisterForSession, useCancelRegistration } from '@/hooks/queries/useSessions';
import { useAuth } from '@clerk/nextjs';

const formatDateTime = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dateOptions = {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = startDate.toLocaleDateString('lv-LV', dateOptions);

  const startTime = startDate.toLocaleTimeString('lv-LV', timeOptions);
  const endTime = endDate.toLocaleTimeString('lv-LV', timeOptions);
  const formattedTime = `${startTime} - ${endTime}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

const GroupSession = ({ session }) => {
  const { isLoaded: isAuthLoaded } = useAuth();
  const { mutate: registerForSession, isPending: isRegistering } = useRegisterForSession();
  const { mutate: cancelRegistration, isPending: isCancelling } = useCancelRegistration();
  const isLoading = isRegistering || isCancelling;

  const handleRegister = () => {
    if (!isAuthLoaded) return;
    registerForSession({ sessionId: session._id });
  };

  const handleCancel = () => {
    if (!isAuthLoaded) return;
    cancelRegistration({ sessionId: session._id });
  };

  return (
    <div className="flex w-full flex-col items-start gap-4 p-4">
      <div className="flex w-full flex-col items-start gap-2">
        <h5 className="text-lg font-semibold">{session.title}</h5>
        <div className="flex items-center gap-1 text-sm text-alternate">
          <MdPerson className="" />
          <span>
            {session.coach.name} {session.coach.surname}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-alternate">
          <MdLocationPin />
          <span>{session.gym.name}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-alternate">
          <MdCalendarMonth />
          <span>{formatDateTime(session.startTime, session.endTime).date}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-alternate">
          <MdOutlineAccessTime />
          <span>{formatDateTime(session.startTime, session.endTime).time}</span>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <Button
          size="sm"
          variant={session.isRegistered ? 'success' : 'default'}
          className={`font-medium uppercase ${session.isRegistered ? 'cursor-default' : ''}`}
          withArrow
          icon={session.isRegistered ? <MdCheck className="text-xl" /> : null}
          onClick={!session.isRegistered ? handleRegister : undefined}
          loading={isLoading}
          disabled={!isAuthLoaded || isLoading}
        >
          {session.isRegistered ? 'Gatavs' : 'Reģistrēties'}
        </Button>
        <Button size="sm" variant="outline" className="gap-1 font-medium uppercase" disabled>
          <MdPerson className="text-xl" />
          <span className="text-sm">
            {session.currentParticipants} / {session.maxParticipants}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default GroupSession;
