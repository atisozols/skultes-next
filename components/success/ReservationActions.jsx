'use client';
import { useState } from 'react';
import { LuTrash2, LuCalendarPlus, LuCheck, LuX } from 'react-icons/lu';

const ReservationActions = ({ appointment }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative overflow-x-hidden">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          disabled={!appointment.cancellable}
          className={`rounded-lg p-2 transition-all hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-5 ${!appointment.cancellable ? `text-zinc-400` : 'text-rose-600'}`}
        >
          <LuTrash2 className="h-6 w-6" />
        </button>
        <a
          href={appointment.add_to_calendar}
          className="rounded-lg p-2 transition-all hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LuCalendarPlus className="h-6 w-6 text-black dark:text-foreground" />
        </a>
      </div>
      <div
        className={`absolute inset-0 translate-x-0 transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800">
          <button
            className={`rounded-lg p-2 transition-all hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-5`}
          >
            <LuCheck className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className={`rounded-lg p-2 transition-all hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-5 ${!appointment.cancellable ? `text-zinc-400` : 'text-rose-600'}`}
          >
            <LuX className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationActions;
