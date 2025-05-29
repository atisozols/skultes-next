// components/sessions/SessionActions.jsx
'use client';

import { useState } from 'react';
import { useCancelRegistration } from '@/hooks/queries/useSessions';
import { LuTrash2, LuCalendarPlus, LuCheck, LuX } from 'react-icons/lu';
import Loader from '@/components/ui/Loader';

const SessionActions = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: cancelRegistration, isPending } = useCancelRegistration();

  const handleAddToCalendar = () => {
    // Format the start and end times for the calendar event
    const startTime =
      new Date(session.startTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endTime =
      new Date(session.endTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    // Create a calendar event URL
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(session.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(`Treneris: ${session.coach?.name} ${session.coach?.surname || ''}\nVieta: ${session.gym?.name}\n\n${session.description || ''}`)}&location=${encodeURIComponent(session.gym?.name || '')}`;

    // Open the calendar URL in a new tab
    window.open(calendarUrl, '_blank');
  };

  const handleCancel = () => {
    if (isPending) return;

    cancelRegistration(
      { sessionId: session._id },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
        onError: (error) => {
          console.error(error.message || 'Neizdevās atcelt reģistrāciju');
        },
      },
    );
  };

  // Check if the session can be cancelled (not within 2 hours of start time)
  const isCancellable = () => {
    const now = new Date();
    const sessionStart = new Date(session.startTime);
    const twoHoursBefore = new Date(sessionStart.getTime() - 2 * 60 * 60 * 1000);
    return now < twoHoursBefore;
  };

  return (
    <div className="relative overflow-x-hidden">
      <div className="flex items-center gap-2">
        <button
          onClick={handleAddToCalendar}
          className="rounded-lg p-2 transition-all hover:bg-white hover:bg-opacity-5"
          aria-label="Pievienot kalendāram"
        >
          <LuCalendarPlus className="text-2xl" />
        </button>
        <button
          onClick={() => setIsOpen(true)}
          disabled={!isCancellable()}
          className={`rounded-lg p-2 transition-all hover:bg-white hover:bg-opacity-5 ${
            !isCancellable() ? 'text-alternate' : 'text-accent'
          }`}
          aria-label="Atcelt reģistrāciju"
        >
          <LuTrash2 className="text-2xl" />
        </button>
      </div>

      {/* Confirmation slide-out */}
      <div
        className={`absolute inset-0 translate-x-0 transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-2 bg-container">
          <button
            disabled={isPending}
            className={`flex items-center justify-center rounded-lg p-2 transition-all ${!isPending && 'hover:bg-white hover:bg-opacity-5'}`}
            onClick={handleCancel}
          >
            {isPending ? <Loader /> : <LuCheck className="text-2xl" />}
          </button>
          <button
            disabled={isPending}
            onClick={() => setIsOpen(false)}
            className={`rounded-lg p-2 text-accent transition-all ${!isPending && 'hover:bg-white hover:bg-opacity-5'}`}
          >
            <LuX className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionActions;
