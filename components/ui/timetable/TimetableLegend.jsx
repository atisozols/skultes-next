import { FaCircle } from 'react-icons/fa';

const TimetableLegend = () => {
  return (
    <div className="flex w-full justify-end gap-5">
      <div className="flex items-center gap-2">
        <FaCircle className="h-4 w-4 text-zinc-100 dark:text-zinc-800" />
        <span>Brīvs</span>
      </div>
      <div className="flex items-center gap-2">
        <FaCircle className="h-4 w-4 text-background dark:text-foreground" />
        <span>Aizņemts</span>
      </div>
    </div>
  );
};

export default TimetableLegend;
