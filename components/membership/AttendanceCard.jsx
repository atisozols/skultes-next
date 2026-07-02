'use client';
import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import VisitHistoryModal from '../sections/VisitHistoryModal';
import { levelFromVisits } from '@/lib/challenges/levels';

const WEEKS = 24;

const toDateStr = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const nf = new Intl.NumberFormat('lv-LV');

// Merged level + attendance card: a transit-line-style level progress (current
// visits → count needed to level up) plus the GitHub-style contribution grid.
const AttendanceCard = ({ totalVisits = 0, visitHistory = [] }) => {
  const shouldReduce = useReducedMotion();
  const [showModal, setShowModal] = useState(false);
  const { level, nextThreshold, progress, isMax } = levelFromVisits(totalVisits);

  // Contribution grid — identical bucketing to VisitStats.
  const weeks = useMemo(() => {
    const visitDates = new Set((visitHistory || []).map((v) => v.date));
    const todayStr = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Riga' }).format(
      new Date(),
    );
    const [y, m, d] = todayStr.split('-').map(Number);
    const todayDate = new Date(y, m - 1, d);

    const jsDay = todayDate.getDay();
    const mondayOffset = jsDay === 0 ? 6 : jsDay - 1;
    const currentMonday = new Date(todayDate);
    currentMonday.setDate(currentMonday.getDate() - mondayOffset);

    const visits = visitHistory || [];
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
        });
        iter.setDate(iter.getDate() + 1);
      }
      result.push(week);
    }
    return result;
  }, [visitHistory]);

  const totalFmt = nf.format(totalVisits || 0);

  return (
    <>
      <div className="flex flex-col gap-5 px-5 py-5">
        <div className="flex flex-col gap-5">
          {/* header: level | visits / target */}
          <div className="flex items-center justify-between gap-3">
            <span className="whitespace-nowrap text-sm font-light uppercase tracking-[0.18em] text-white/80">
              LVL {level}
            </span>
            <span className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-foreground">
              {totalFmt} apmeklējumi
              {!isMax && (
                <span className="font-normal text-alternate"> / {nf.format(nextThreshold)}</span>
              )}
            </span>
          </div>

          {/* progress bar — full-bleed, doubles as the divider under the header */}
          <div className="relative -mx-5 h-[3px] bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              initial={shouldReduce ? false : { width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* contribution grid */}
        <div
          className="cursor-pointer transition-transform active:scale-[0.98]"
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
      </div>

      {showModal && (
        <VisitHistoryModal visitHistory={visitHistory} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default AttendanceCard;
