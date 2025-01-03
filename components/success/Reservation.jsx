import { LuTrash2, LuCalendarPlus } from 'react-icons/lu';

const Reservation = ({ appointment }) => {
  return (
    <div className="flex w-full justify-between border-t p-3 px-5">
      <div className="flex flex-col items-start justify-center">
        <span className="text-xl font-medium tracking-wider text-black dark:text-foreground">
          {appointment.date}
        </span>
        <span className="font-light">
          {appointment.start} - {appointment.end}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <button
          disabled={!appointment.cancellable}
          className={!appointment.cancellable ? `text-zinc-400` : 'text-rose-700'}
        >
          <LuTrash2 className="h-7 w-7" />
        </button>
        <a href={appointment.add_to_calendar} target="_blank" rel="noopener noreferrer">
          <LuCalendarPlus className="h-7 w-7 text-black dark:text-foreground" />
        </a>
      </div>
    </div>
  );
};

export default Reservation;
