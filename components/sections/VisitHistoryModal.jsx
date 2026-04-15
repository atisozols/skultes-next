'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const formatMonthYear = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  const month = new Intl.DateTimeFormat('lv-LV', { month: 'long' }).format(d);
  const year = d.getFullYear();
  return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
};

const formatVisitDate = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  const formatted = new Intl.DateTimeFormat('lv-LV', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(d);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const groupByMonth = (visits) => {
  const groups = [];
  let currentKey = null;
  let currentGroup = null;

  visits.forEach((visit) => {
    const key = visit.date.slice(0, 7);
    if (key !== currentKey) {
      currentKey = key;
      currentGroup = { key, label: formatMonthYear(visit.date), visits: [] };
      groups.push(currentGroup);
    }
    currentGroup.visits.push(visit);
  });

  return groups;
};

const VisitHistoryModal = ({ visitHistory, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const shouldReduce = useReducedMotion();

  const groups = useMemo(() => groupByMonth(visitHistory || []), [visitHistory]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    if (shouldReduce) {
      onClose();
      return;
    }
    setIsClosing(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col bg-background"
      initial={shouldReduce ? false : { y: '100%' }}
      animate={{ y: isClosing ? '100%' : 0 }}
      transition={
        isClosing
          ? { duration: 0.28, ease: [0.55, 0, 1, 0.5] }
          : { duration: 0.4, ease: EASE_OUT_EXPO }
      }
      onAnimationComplete={() => {
        if (isClosing) onClose();
      }}
    >
      <div className="relative flex flex-1 flex-col overflow-y-auto p-6">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-xl text-alternate hover:text-white"
        >
          ✕
        </button>

        <h2 className="mb-5 pr-8 text-xl font-bold">Apmeklējumu vēsture</h2>

        {groups.length === 0 ? (
          <p className="text-sm text-alternate">Nav apmeklējumu.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {groups.map((group) => (
              <div key={group.key}>
                <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-alternate">
                  {group.label}
                </h3>
                <div className="rounded-xl bg-container">
                  {group.visits.map((visit, i) => (
                    <div
                      key={visit.date}
                      className="flex items-center justify-between px-4 py-3"
                      style={{
                        borderBottomWidth: i < group.visits.length - 1 ? '0.5px' : '0',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <span className="text-sm font-semibold">{formatVisitDate(visit.date)}</span>
                      <span className="text-sm tabular-nums text-alternate">{visit.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VisitHistoryModal;
