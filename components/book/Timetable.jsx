import moment from 'moment-timezone';

// This is a Server Component in Next.js
const Timetable = ({ availability }) => {
  // Function to check if a specific cell should be unavailable
  const isUnavailable = (column, row) => {
    const ranges = availability[column].ranges;
    return ranges.some((range) => row >= range.start.index && row < range.end.index);
  };

  // Function to generate the timetable (without state)
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

  const timetable = generateTimetable(); // Generate the timetable directly in the server component

  // Function to format the date in Riga/Latvia timezone using moment-timezone
  const dateText = (date) => {
    return moment.tz(date, 'Europe/Riga').format('DD.MM');
  };

  return (
    <div className="w-full bg-white dark:bg-background rounded-3xl p-7 flex justify-center items-center">
      <div className="flex w-full justify-center items-center">
        {/* Left Side (Time Labels) */}
        <div className="hidden sm:flex flex-col text-right gap-10 pb-4 lg:pb-2 mr-2 text-foreground h-full">
          <span className="lg:pb-8">8:00</span>
          <span className="lg:pb-8">12:00</span>
          <span className="lg:pb-8">16:00</span>
          <span className="lg:pb-8">20:00</span>
        </div>

        {/* Right Side (Dates and Timetable) */}
        <div className="flex flex-col w-full">
          {/* Dates Row */}
          <div className="flex justify-around mb-2">
            {availability.slice(0, 7).map((object, objectIndex) => (
              <span
                key={objectIndex}
                className="text-foreground text-xs sm:text-sm sm:w-12 text-center"
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
                    className={`w-full h-1 lg:h-1.5 ${
                      cellIndex === 6 ? '' : 'border-r border-r-white dark:border-r-background'
                    } ${
                      cell === 0 ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-background dark:bg-zinc-900'
                    } ${
                      (rowIndex + 2) % 4 === 0 ? 'border-t border-white dark:border-background' : ''
                    } ${
                      rowIndex === 6 || rowIndex === 22 || rowIndex === 38 || rowIndex === 54
                        ? 'border-t-4'
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
