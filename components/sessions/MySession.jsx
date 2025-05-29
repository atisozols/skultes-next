'use client';

import { format } from 'date-fns';
import SessionActions from './SessionActions';

const MySession = ({ session }) => {
  const startTime = new Date(session.startTime);
  const formattedDate = new Intl.DateTimeFormat('lv-LV', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(startTime);
  const endTime = new Date(session.endTime);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase text-alternate">
          {formattedDate} {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
        </span>
        <span className="font-base text-base">{session.title}</span>
      </div>
      <SessionActions session={session} />
    </div>
  );
};

export default MySession;
