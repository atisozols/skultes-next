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

  // Clamp the node/label/fill position so the moving current node and its label
  // never clip the card edges (true progress drives it; extremes are nudged in).
  const pos = Math.min(Math.max(progress, 0.1), 0.9);

  // Contribution grid — identical bucketing to VisitStats.
  const weeks = useMemo(() => {
    const visitDates = new Set((visitHistory || []).map((v) => v.date));
    const todayStr = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Riga' }).format(new Date());
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
      <div className="flex flex-col gap-6 px-5 py-5">
        {/* Level — transit-line style: current position → level-up target */}
        <div className="flex flex-col gap-2.5">
          {/* header row */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-light uppercase tracking-[0.18em] text-white/80">
              LVL {level}
            </span>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              Tagad
            </span>
          </div>

          {/* line with current + end nodes */}
          <div className="relative h-3.5">
            <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/10" />
            <motion.div
              className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-accent"
              initial={shouldReduce ? false : { width: 0 }}
              animate={{ width: `${pos * 100}%` }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <div
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-white"
              style={{ left: `${pos * 100}%` }}
            />
            {!isMax && (
              <div className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/25" />
            )}
          </div>

          {/* endpoint counts — one compact row */}
          <div className="flex items-baseline justify-between">
            <span className="flex items-baseline gap-1">
              <span className="text-sm font-semibold leading-none text-foreground">{totalFmt}</span>
              <span className="text-[10px] uppercase tracking-wide text-alternate">apmeklējumi</span>
            </span>
            {isMax ? (
              <span className="text-[10px] uppercase tracking-wide text-accent">
                Augstākais līmenis
              </span>
            ) : (
              <span className="flex items-baseline gap-1">
                <span className="text-sm font-semibold leading-none text-foreground">
                  {nf.format(nextThreshold)}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-accent">
                  {level + 1}. līmenis
                </span>
              </span>
            )}
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
