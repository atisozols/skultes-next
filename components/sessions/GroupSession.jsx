import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { LuTicket } from 'react-icons/lu';
import {
  MdPerson,
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

  // Determine background image based on session category
  const getBackgroundImage = () => {
    // This is a placeholder - replace with actual category-based images
    return '/sessions/public.jpg';
  };

  const handleRegister = () => {
    if (!isAuthLoaded) return;
    registerForSession({ sessionId: session._id });
  };

  const handleCancel = () => {
    if (!isAuthLoaded) return;
    cancelRegistration({ sessionId: session._id });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black">
      {/* Background image */}
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={getBackgroundImage()}
          alt={session.title}
          fill
          className="object-cover opacity-45"
        />
        {/* Blurry overlay with mask to fade it out */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[220px]">
          <div className="fade-blur-bottom absolute inset-0"></div>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex w-full flex-col items-start gap-4 p-4">
          <div className="flex w-full flex-col items-start gap-2">
            <h5 className="text-xl font-semibold">{session.title}</h5>
            <div className="flex items-center gap-1 text-sm">
              <MdPerson className="" />
              <span>
                {session.coach.name} {session.coach.surname}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <MdLocationPin />
              <span>{session.gym.name}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <MdCalendarMonth />
              <span>{formatDateTime(session.startTime, session.endTime).date}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <MdOutlineAccessTime />
              <span>{formatDateTime(session.startTime, session.endTime).time}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <LuTicket />
              <span>&euro;{session.price} (Apmaksa klātienē)</span>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            {session.inQueue ? (
              <Button
                variant="default"
                className={`bg-warning text-sm font-medium uppercase`}
                withArrow
                icon={session.isRegistered ? <MdCheck className="text-xl" /> : null}
                onClick={session.isRegistered ? handleCancel : undefined}
                loading={isLoading}
                disabled={!isAuthLoaded || isLoading}
              >
                {session.queuePosition}. rindā
              </Button>
            ) : (
              <Button
                variant={session.isRegistered ? 'success' : 'default'}
                className={`text-sm font-medium uppercase ${session.isRegistered ? 'cursor-default' : ''}`}
                withArrow
                icon={session.isRegistered ? <MdCheck className="text-xl" /> : null}
                onClick={!session.isRegistered ? handleRegister : undefined}
                loading={isLoading}
                disabled={!isAuthLoaded || isLoading}
              >
                {session.isRegistered ? 'Gatavs' : 'Reģistrēties'}
              </Button>
            )}
            <Button variant="outline" className="gap-1 font-medium uppercase" disabled>
              <MdPerson className="text-xl" />
              <span className="text-sm">
                {session.currentParticipants} / {session.maxParticipants}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupSession;

// Add this CSS to your globals.css if it's not already there
// .fade-blur-bottom {
//   background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
// }
