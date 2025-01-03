import ReservationList from './ReservationList';

const Reservations = ({ session, appointments }) => {
  return (
    <div className="flex w-full flex-col items-center gap-5 rounded-3xl bg-white p-5 shadow-lg dark:bg-background">
      <h2 className="text-center text-lg font-light tracking-tight text-black sm:text-2xl dark:text-white">
        Rezervētie laiki:
      </h2>
      {appointments.length ? (
        <ReservationList appointments={appointments} />
      ) : (
        <p className="text-center">Visi apmeklējumi šajā rezervācijā ir atcelti</p>
      )}
      <p className="text-center text-xs">
        Atceļot ne vēlāk kā 24h pirms rezervācijas, iegūsiet kuponu apmeklējuma vērtībā
      </p>
    </div>
  );
};

export default Reservations;
