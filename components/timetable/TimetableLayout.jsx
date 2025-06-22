'use client';
import { useState, useEffect, useRef } from 'react';
import Timetable from './Timetable';
import TimetableLegend from './TimetableLegend';
import { motion, AnimatePresence } from 'framer-motion';
import { MdArrowForwardIos } from 'react-icons/md';
import { Button } from '../ui/Button';

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
      for (let i = 0; i < 72; i++) {
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
    <div className="flex flex-col px-3.5 py-3.5">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        variant="outline"
        className={`font-medium uppercase ${isOpen ? 'border-alternate text-alternate' : ''}`}
      >
        Zāles noslogojums
      </Button>
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
