import { useState, useRef, useEffect } from 'react';
import dateText from '@/utils/book/dateText';
import { motion, AnimatePresence } from 'framer-motion';

const Timetable = ({ availability, timetable }) => {
  const [showTimeIndicators, setShowTimeIndicators] = useState(false);
  const timetableRef = useRef(null);
  const [timeMarkers, setTimeMarkers] = useState([]);
  const [timetableRect, setTimetableRect] = useState(null);

  // Calculate positions of time markers when component mounts or timetable changes
  useEffect(() => {
    if (!timetableRef.current) return;

    const rect = timetableRef.current.getBoundingClientRect();
    setTimetableRect(rect);

    const markers = [];
    const rowHeight = rect.height / timetable.length;

    // Find all major time markers (8:00, 12:00, 16:00, 20:00, 24:00)
    for (let i = 0; i < timetable.length; i++) {
      if (isMajorTimeMarker(i)) {
        const time = computeTime(i);
        // Position at the top of the row, with a small offset to align with the border
        const top = i * rowHeight - 11;
        markers.push({ time, top });
      }
    }

    setTimeMarkers(markers);
  }, [timetable]);

  const handleTimetableClick = () => {
    setShowTimeIndicators((prev) => !prev);
  };

  const computeTime = (rowIndex) => {
    const totalMinutes = 5 * 60 + rowIndex * 15;
    const hours = Math.floor(totalMinutes / 60) % 24; // Ensure we handle 24h overflow
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Check if current row is a major time marker (8:00, 12:00, 16:00, 20:00)
  const isMajorTimeMarker = (rowIndex) => {
    const totalMinutes = 5 * 60 + rowIndex * 15;
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;
    return [8, 12, 16, 20].includes(hours) && minutes === 0;
  };

  // Format time for display (24h format)
  const formatDisplayTime = (time) => {
    return time.startsWith('0') ? time.substring(1) : time;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-3 pb-3">
      <div className="flex w-full items-center justify-center">
        {/* Right Side (Dates and Timetable) */}
        <div className="relative flex w-full flex-col">
          {/* Dates Row */}
          <div className="mb-2 flex justify-around">
            {availability.slice(0, 7).map((object, objectIndex) => (
              <span
                key={objectIndex}
                className="text-center text-xs text-alternate sm:w-12 sm:text-sm"
              >
                {dateText(object.date)}
              </span>
            ))}
          </div>
          {/* Timetable */}
          <div className="relative w-full" ref={timetableRef}>
            {/* Time Indicators Overlay */}
            <AnimatePresence>
              {showTimeIndicators && timetableRect && (
                <motion.div
                  key="time-overlay"
                  className="absolute inset-0 z-10"
                  onClick={handleTimetableClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {timeMarkers.map((marker, index) => (
                    <div
                      key={index}
                      className="absolute left-0 right-0 flex items-center justify-center text-sm font-medium text-background"
                      style={{ top: `${marker.top}px` }}
                    >
                      <span className="whitespace-nowrap rounded-full bg-accent px-2 py-1 text-xs text-background">
                        {formatDisplayTime(marker.time)}
                      </span>
                      <div className="h-[2px] w-full bg-accent"></div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {timetable.map((row, rowIndex) => (
              <div className={`flex w-full`} key={rowIndex} onClick={handleTimetableClick}>
                {row.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`h-1 w-full lg:h-1.5 ${
                      cellIndex === 6
                        ? ''
                        : cell !== 0
                          ? 'border-r border-r-foreground'
                          : 'border-r border-r-alternate'
                    } ${cell === 0 ? 'bg-transparent' : 'bg-foreground'} ${
                      rowIndex % 4 === 0
                        ? `border-t ${cell !== 0 ? 'border-t-foreground' : 'border-t-alternate'}`
                        : ''
                    } ${isMajorTimeMarker(rowIndex) ? 'border-t-[2px] border-t-alternate' : ''}`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
