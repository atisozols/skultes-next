import { FaCircle } from 'react-icons/fa';

const TimetableLegend = () => {
  return (
    <div className="flex w-full justify-center py-4">
      <div className="flex items-center gap-2">
        <FaCircle className="h-3 text-foreground" />
        <span className="text-xs">Aizņemts</span>
      </div>
    </div>
  );
};

export default TimetableLegend;
