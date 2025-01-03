'use client';
import { useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';
import CardTitle from '../ui/CardTitle';
import Card from '../ui/Card';
import Timetable from '../ui/timetable/Timetable';
import TimetableLegendSkeleton from '../ui/timetable/TimetableLegendSkeleton';
import TimetableSkeleton from '../ui/timetable/TimetableSkeleton';
import TimetableLegend from '../ui/timetable/TimetableLegend';

const TimetableLayout = ({ availability }) => {
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

  return (
    <Card>
      <CardTitle>VIP zāles noslogojums</CardTitle>
      {timetable.length > 0 ? (
        <>
          <Timetable availability={availability} timetable={timetable} />
          <TimetableLegend />
        </>
      ) : (
        <>
          <TimetableSkeleton />
          <TimetableLegendSkeleton />
        </>
      )}
    </Card>
  );
};

export default TimetableLayout;
