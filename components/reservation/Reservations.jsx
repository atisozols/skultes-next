import CardTitle from '../ui/CardTitle';
import Card from '../ui/Section';
import ReservationList from './ReservationList';

const Reservations = ({ appointments }) => {
  return (
    <Card>
      <CardTitle>Manas rezervācijas</CardTitle>
      {appointments.length ? (
        <ReservationList appointments={appointments} />
      ) : (
        <p className="text-center">Visi apmeklējumi šajā rezervācijā ir atcelti</p>
      )}
      <p className="mx-auto w-5/6 text-center text-xs">
        Atcelt iespējams ne vēlāk kā 24h pirms rezervācijas, iegūstot kuponu apmeklējuma vērtībā
      </p>
    </Card>
  );
};

export default Reservations;
