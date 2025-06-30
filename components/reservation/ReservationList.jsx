'use client';
import { useState } from 'react';
import Reservation from './Reservation';

const ReservationList = ({ appointments }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const visibleAppointments = appointments.slice(0, visibleCount);
  const hasMoreAppointments = visibleCount < appointments.length;

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <>
      {visibleAppointments.map((appointment, index) => (
        <div
          key={appointment.id}
          style={{ borderBottomWidth: `${index < visibleAppointments.length - 1 ? '0.5px' : '0'}` }}
          className={`w-full border-alternate px-3.5 py-3 ${index < visibleAppointments.length - 1 ? 'border-b' : ''}`}
        >
          <Reservation appointment={appointment} />
        </div>
      ))}
      {hasMoreAppointments && (
        <div className="flex w-full justify-center">
          <button
            onClick={handleShowMore}
            style={{
              borderTopWidth: '0.5px',
            }}
            className="w-full border-t border-alternate px-3.5 py-3 text-sm font-medium uppercase text-alternate"
          >
            Parādīt vēl
          </button>
        </div>
      )}
    </>
  );
};

export default ReservationList;
