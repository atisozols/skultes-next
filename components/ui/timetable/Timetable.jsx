import dateText from '@/utils/book/dateText';

const Timetable = ({ availability, timetable }) => {
  return (
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
                      (rowIndex + 2) % 4 === 0 ? 'border-t border-white dark:border-background' : ''
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
  );
};

export default Timetable;
