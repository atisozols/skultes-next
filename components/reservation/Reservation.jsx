import ReservationActions from './ReservationActions';

const Reservation = ({ appointment }) => {
  const [day, month, year] = appointment.date.split('.');
  const dateObj = new Date(`${year}-${month}-${day}`);
  const formattedDate = new Intl.DateTimeFormat('lv-LV', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(dateObj);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col items-start justify-center">
        <span className="text-alternate text-xs font-semibold uppercase">{formattedDate}</span>
        <span className="font-base text-base">
          {appointment.start} - {appointment.end}
        </span>
      </div>
      <ReservationActions appointment={appointment} />
    </div>
  );
};

export default Reservation;
