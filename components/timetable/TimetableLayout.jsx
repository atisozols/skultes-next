'use client';
import { useState, useEffect, useRef } from 'react';
import Timetable from './Timetable';
import TimetableLegend from './TimetableLegend';
import { motion, AnimatePresence } from 'framer-motion';
import { MdArrowForwardIos } from 'react-icons/md';

const TimetableLayout = ({ availability }) => {
  const [timetable, setTimetable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    const isUnavailable = (column, row) => {
      const ranges = availability[column].ranges;
      return ranges.some((range) => row >= range.start.index && row < range.end.index);
    };

    const generateTimetable = () => {
      const rows = [];
      for (let i = 0; i < 70; i++) {
        const row = [];
        for (let j = 0; j < 7; j++) {
          const value = isUnavailable(j, i) ? 1 : 0;
          row.push(value);
        }
        rows.push(row);
      }
      return rows;
    };

    if (availability && availability.length > 0) {
      const newTimetable = generateTimetable();
      setTimetable(newTimetable);
    }
  }, [availability]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, timetable]);

  return (
    <div
      style={{ borderBottomWidth: '0.5px' }}
      className="flex flex-col border-b border-b-alternate p-2"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer appearance-none items-center justify-between rounded-lg bg-transparent p-2 text-right transition-all active:bg-white active:bg-opacity-5"
      >
        <span>Apskatīt VIP zāles noslogojumu</span>
        <MdArrowForwardIos className={`transition-all duration-300 ${isOpen && 'rotate-90'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="timetable"
            style={{ overflow: 'hidden' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: measuredHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div ref={contentRef}>
              {timetable.length > 0 && (
                <>
                  <Timetable availability={availability} timetable={timetable} />
                  <TimetableLegend />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimetableLayout;
