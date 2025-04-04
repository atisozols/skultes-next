import Reservation from './Reservation';

const ReservationList = ({ appointments }) => {
  return (
    <>
      {appointments.map((appointment, index) => (
        <div
          key={appointment.id}
          style={{ borderBottomWidth: `${index < appointments.length - 1 ? '0.5px' : '0'}` }}
          className={`border-alternate w-full px-3.5 py-3 ${index < appointments.length - 1 ? 'border-b' : ''}`}
        >
          <Reservation appointment={appointment} />
        </div>
      ))}
    </>
  );
};

export default ReservationList;
