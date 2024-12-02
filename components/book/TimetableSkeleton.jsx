import React from 'react';
import { FaCircle } from 'react-icons/fa';

const TimetableSkeleton = () => {
  return (
    <div className="w-full rounded-3xl bg-white p-7 shadow-md lg:w-1/2 dark:bg-background">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full items-center justify-center">
          {/* Left Side (Time Labels) */}
          <div className="mr-2 hidden h-full flex-col gap-10 pb-4 text-right text-foreground sm:flex lg:gap-20 lg:pb-2">
            <div className="h-5 w-10 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
            <div className="h-5 w-10 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
            <div className="h-5 w-10 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
            <div className="h-5 w-10 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
          </div>
          {/* Right Side (Dates and Timetable) */}
          <div className="flex w-full flex-col">
            {/* Dates Row */}
            <div className="mb-2 flex justify-around">
              {Array(7)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-5 w-12 animate-pulse rounded bg-zinc-200 sm:w-14 dark:bg-zinc-800"
                  ></div>
                ))}
            </div>
            {/* Timetable */}
            <div className="w-full">
              {Array(70)
                .fill(null)
                .map((_, rowIndex) => (
                  <div className="flex w-full" key={rowIndex}>
                    {Array(7)
                      .fill(null)
                      .map((_, cellIndex) => (
                        <div
                          key={cellIndex}
                          className={`h-1 w-full lg:h-1.5 ${
                            cellIndex === 6
                              ? ''
                              : 'border-r border-r-white dark:border-r-background'
                          } animate-pulse bg-zinc-200 dark:bg-zinc-800`}
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
          <div className="h-5 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
        </div>
        <div className="flex items-center gap-2">
          <FaCircle className="h-4 w-4 text-background dark:text-foreground" />
          <div className="h-5 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
        </div>
      </div>
    </div>
  );
};

export default TimetableSkeleton;
