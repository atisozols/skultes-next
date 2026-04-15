'use client';

import { useState, useMemo } from 'react';
import { useUser } from '@/hooks/queries/useUser';
import VisitHistoryModal from './VisitHistoryModal';

const WEEKS = 24;

const toDateStr = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const VisitStats = () => {
  const { data: userData } = useUser();
  const stats = userData?.statistics?.visitStats;
  const [showModal, setShowModal] = useState(false);

  const weeks = useMemo(() => {
    const visitDates = new Set((stats?.visitHistory || []).map((v) => v.date));

    const todayStr = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Riga' }).format(
      new Date(),
    );
    const [y, m, d] = todayStr.split('-').map(Number);
    const todayDate = new Date(y, m - 1, d);

    // Monday of current week
    const jsDay = todayDate.getDay();
    const mondayOffset = jsDay === 0 ? 6 : jsDay - 1;
    const currentMonday = new Date(todayDate);
    currentMonday.setDate(currentMonday.getDate() - mondayOffset);

    // Start from the earliest visit, not a fixed window
    const visits = stats?.visitHistory || [];
    let start;

    if (visits.length > 0) {
      const earliest = visits[visits.length - 1].date;
      const [ey, em, ed] = earliest.split('-').map(Number);
      const earliestDate = new Date(ey, em - 1, ed);
      const eDay = earliestDate.getDay();
      const earliestMonday = new Date(earliestDate);
      earliestMonday.setDate(earliestMonday.getDate() - (eDay === 0 ? 6 : eDay - 1));

      const diffWeeks = Math.round((currentMonday - earliestMonday) / (7 * 86400000)) + 1;

      if (diffWeeks <= WEEKS) {
        start = new Date(earliestMonday);
      } else {
        start = new Date(currentMonday);
        start.setDate(start.getDate() - (WEEKS - 1) * 7);
      }
    } else {
      start = new Date(currentMonday);
    }

    const result = [];
    const iter = new Date(start);
    for (let w = 0; w < WEEKS; w++) {
      const week = [];
      for (let day = 0; day < 7; day++) {
        const dateStr = toDateStr(iter);
        week.push({
          date: dateStr,
          visited: visitDates.has(dateStr),
          isToday: dateStr === todayStr,
          isFuture: dateStr > todayStr,
        });
        iter.setDate(iter.getDate() + 1);
      }
      result.push(week);
    }

    return result;
  }, [stats?.visitHistory]);

  if (!stats) return null;

  return (
    <>
      <div
        className="rounded-xl bg-container p-4 transition-transform active:scale-[0.98]"
        onClick={() => setShowModal(true)}
      >
        <div className="flex gap-[3px]">
          <div className="flex flex-1 flex-col gap-[3px] pr-0.5">
            {['P', 'O', 'T', 'C', 'P', 'S', 'S'].map((label, i) => (
              <div
                key={i}
                className="flex aspect-square w-full items-center justify-center text-[7px] leading-none text-alternate"
              >
                {label}
              </div>
            ))}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-1 flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={[
                    'aspect-square w-full rounded-full',
                    day.visited ? 'bg-accent' : 'bg-white/10',
                    day.isToday && 'ring-[1.5px] ring-foreground',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <VisitHistoryModal
          visitHistory={stats?.visitHistory}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default VisitStats;
