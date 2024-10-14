import Reservation from './Reservation';

const ReservationList = ({ appointments }) => {
  return (
    <ul className="flex w-full flex-col gap-3">
      {appointments.map((appointment) => (
        <li key={appointment.id} className="w-full">
          <Reservation appointment={appointment} />
        </li>
      ))}
    </ul>
  );
};

export default ReservationList;
