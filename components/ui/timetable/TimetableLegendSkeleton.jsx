import { FaCircle } from 'react-icons/fa';

const TimetableLegendSkeleton = () => {
  return (
    <div className="flex w-full justify-end gap-5">
      <div className="flex items-center gap-2">
        <FaCircle className="h-4 w-4 text-zinc-200 dark:text-zinc-800" />
        <div className="h-5 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
      </div>
      <div className="flex items-center gap-2">
        <FaCircle className="h-4 w-4 text-background dark:text-foreground" />
        <div className="h-5 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
      </div>
    </div>
  );
};

export default TimetableLegendSkeleton;
