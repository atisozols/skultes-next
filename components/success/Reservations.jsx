import CardTitle from '../ui/CardTitle';
import Card from '../ui/Card';
import ReservationList from './ReservationList';

const Reservations = ({ session, appointments }) => {
  return (
    <Card>
      <CardTitle>Rezervētie laiki:</CardTitle>
      {appointments.length ? (
        <ReservationList appointments={appointments} />
      ) : (
        <p className="text-center">Visi apmeklējumi šajā rezervācijā ir atcelti</p>
      )}
      <p className="text-center text-xs">
        Atceļot ne vēlāk kā 24h pirms rezervācijas, iegūsiet kuponu apmeklējuma vērtībā
      </p>
    </Card>
  );
};

export default Reservations;
