import ReservationActions from './ReservationActions';

const Reservation = ({ appointment }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-md bg-zinc-100 p-1 dark:bg-zinc-800">
      <div className="flex items-center justify-center gap-2 pl-2">
        <span className="text-base font-normal tracking-wider text-black dark:text-foreground">
          {appointment.date}
        </span>
        <span className="text-base font-extralight">
          {appointment.start} - {appointment.end}
        </span>
      </div>
      <ReservationActions appointment={appointment} />
    </div>
  );
};

export default Reservation;
