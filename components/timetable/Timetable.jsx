import { useState } from 'react';
import dateText from '@/utils/book/dateText';

const Timetable = ({ availability, timetable }) => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, time: '', rowIndex: null });

  const computeTime = (rowIndex) => {
    const totalMinutes = 6 * 60 + 30 + rowIndex * 15;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex w-full items-center justify-center pt-4">
      <div className="flex w-full items-center justify-center">
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
              <div
                className="flex w-full"
                key={rowIndex}
                onMouseMove={(e) =>
                  setTooltip({
                    visible: true,
                    x: e.clientX,
                    y: e.clientY,
                    time: computeTime(rowIndex),
                    rowIndex: rowIndex,
                  })
                }
                onMouseLeave={() => setTooltip((prev) => ({ ...prev, visible: false }))}
              >
                {row.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`h-1 w-full lg:h-1.5 ${cellIndex === 6 ? '' : cell !== 0 ? 'border-r border-r-foreground' : 'border-r border-r-alternate'} ${cell === 0 ? 'bg-transparent' : 'bg-foreground'} ${(rowIndex + 2) % 4 === 0 ? `border-t ${tooltip.visible && tooltip.rowIndex === rowIndex ? 'border-t-white' : cell !== 0 ? 'border-t-foreground' : 'border-t-alternate'}` : ''} ${rowIndex === 6 || rowIndex === 22 || rowIndex === 38 || rowIndex === 54 ? `h-2 border-t-2 lg:h-2.5 ${tooltip.visible && tooltip.rowIndex === rowIndex ? 'border-t-white' : cell !== 0 ? 'border-t-foreground' : 'border-t-alternate'}` : ''}`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {tooltip.visible && (
        <div
          style={{
            position: 'fixed',
            top: tooltip.y - 10,
            left: tooltip.x - 50,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '8px',
            pointerEvents: 'none',
            fontSize: '12px',
            zIndex: 1000,
          }}
        >
          {tooltip.time}
        </div>
      )}
    </div>
  );
};

export default Timetable;
