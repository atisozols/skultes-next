'use client';
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { FaCircle } from 'react-icons/fa';
import TimetableSkeleton from './TimetableSkeleton';

const Timetable = ({ availability }) => {
  const [timetable, setTimetable] = useState([]);

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

  // Function to format the date in Riga/Latvia timezone using moment-timezone
  const dateText = (date) => {
    return moment.tz(date, 'Europe/Riga').format('DD.MM');
  };

  return timetable.length > 0 ? (
    <div className="w-full rounded-3xl bg-white p-7 shadow-md lg:w-1/2 dark:bg-background">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full items-center justify-center">
          {/* Left Side (Time Labels) */}
          <div className="mr-2 hidden h-full flex-col gap-10 pb-4 text-right text-foreground sm:flex lg:pb-2">
            <span className="lg:pb-8">8:00</span>
            <span className="lg:pb-8">12:00</span>
            <span className="lg:pb-8">16:00</span>
            <span className="lg:pb-8">20:00</span>
          </div>
          {/* Right Side (Dates and Timetable) */}
          <div className="flex w-full flex-col">
            {/* Dates Row */}
            <div className="mb-2 flex justify-around">
              {availability.slice(0, 7).map((object, objectIndex) => (
                <span
                  key={objectIndex}
                  className="text-center text-xs text-foreground sm:w-12 sm:text-sm"
                >
                  {dateText(object.date)}
                </span>
              ))}
            </div>
            {/* Timetable */}
            <div className="w-full">
              {timetable.map((row, rowIndex) => (
                <div className="flex w-full" key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className={`h-1 w-full lg:h-1.5 ${
                        cellIndex === 6 ? '' : 'border-r border-r-white dark:border-r-background'
                      } ${
                        cell === 0
                          ? 'bg-zinc-200 dark:bg-zinc-800'
                          : 'bg-background dark:bg-foreground'
                      } ${
                        (rowIndex + 2) % 4 === 0
                          ? 'border-t border-white dark:border-background'
                          : ''
                      } ${
                        rowIndex === 6 || rowIndex === 22 || rowIndex === 38 || rowIndex === 54
                          ? 'h-2 border-t-4 lg:h-2.5'
                          : ''
                      }`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-end gap-5">
        <div className="flex items-center gap-2">
          <FaCircle className="h-4 w-4 text-zinc-200 dark:text-zinc-800" />
          <span>Brīvs</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCircle className="h-4 w-4 text-background dark:text-foreground" />
          <span>Aizņemts</span>
        </div>
      </div>
    </div>
  ) : (
    <TimetableSkeleton />
  );
};

export default Timetable;
