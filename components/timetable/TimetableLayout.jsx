'use client';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Timetable from './Timetable';
import { motion } from 'framer-motion';
import PlusToggleButton from '../ui/PlusToggleButton';

const TimetableLayout = ({ availability }) => {
  const [timetable, setTimetable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(40);
  const [contentHeight, setContentHeight] = useState(0);
  const labelRef = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const rowRef = useRef(null);
  const [rowWidth, setRowWidth] = useState(0);

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

  useLayoutEffect(() => {
    if (headerRef.current) setHeaderHeight(Math.max(40, headerRef.current.offsetHeight));
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight);
  }, [timetable, isOpen]);

  useLayoutEffect(() => {
    if (labelRef.current) setLabelWidth(labelRef.current.scrollWidth);
  }, []);

  useEffect(() => {
    if (!rowRef.current) return;
    const measure = () => setRowWidth(rowRef.current.clientWidth);
    measure();
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setRowWidth(entry.contentRect.width);
      }
    });
    ro.observe(rowRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex w-full flex-col px-4 py-0">
      <div ref={rowRef} className="relative w-full border-none">
        <motion.div
          initial={false}
          animate={
            labelWidth
              ? { maxWidth: isOpen ? 0 : labelWidth, opacity: isOpen ? 0 : 1 }
              : { opacity: isOpen ? 0 : 1 }
          }
          style={{ maxWidth: labelWidth || 'none', height: headerHeight || 40 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-0 top-0 flex items-center overflow-hidden pr-2"
        >
          <span ref={labelRef} className="whitespace-nowrap text-foreground">
            Noslogojums
          </span>
        </motion.div>
        <motion.div
          className={`relative z-10 ml-auto flex flex-col overflow-hidden rounded-lg bg-white bg-opacity-5`}
          initial={{ width: 135, height: 40 }}
          animate={{
            width: isOpen ? rowWidth : 135,
            height: isOpen ? (headerHeight || 40) + contentHeight : 40,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 135 }}
        >
          <PlusToggleButton
            ref={headerRef}
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            closedText="Atvērt"
            variant="outline"
            size="sm"
            className={`h-[40px] w-fit shrink-0 self-end overflow-hidden rounded-full border-none px-2 py-1 font-medium uppercase ${isOpen ? 'text-alternate' : 'text-foreground'}`}
          />
          <motion.div
            ref={contentRef}
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {timetable.length > 0 && (
              <>
                <Timetable availability={availability} timetable={timetable} />
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
      {/* Content is now inside the expanding container above */}
    </div>
  );
};

export default TimetableLayout;
