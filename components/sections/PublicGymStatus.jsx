'use client';

import FormElement from '../ui/FormElement';
import { useUser } from '@/hooks/queries/useUser';
import { FaCircleExclamation, FaCircleInfo, FaCircleCheck } from 'react-icons/fa6';

const PublicGymStatus = () => {
  const { data: { statistics, isMember } = { statistics: { gymOccupancyStatus: 0 } } } =
    useUser() || {};
  const { gymOccupancyStatus } = statistics || {};

  if (!isMember) {
    return null;
  }

  const getOccupancyInfo = () => {
    if (gymOccupancyStatus < 5) {
      return {
        title: 'Zems noslogojums',
        message: 'Zālē šobrīd ir daudz vietas treniņam!',
        icon: <FaCircleCheck className="text-success" />,
      };
    } else if (gymOccupancyStatus < 12) {
      return {
        title: 'Vidējs noslogojums',
        message: 'Zālē ir rosība, bet vietas vēl ir gana',
        icon: <FaCircleInfo className="text-success" />,
      };
    } else if (gymOccupancyStatus < 20) {
      return {
        title: 'Augsts noslogojums',
        message: 'Zāle ir tuvu pilnai kapacitātei',
        icon: <FaCircleExclamation className="text-warning" />,
      };
    } else {
      return {
        title: 'Maksimāls noslogojums',
        message: 'Zāle ir pilna, iesakām apmeklēt vēlāk',
        icon: <FaCircleExclamation className="text-error" />,
      };
    }
  };

  const occupancyInfo = getOccupancyInfo();

  return (
    <FormElement className="py-4">
      <div className="flex w-full items-center gap-4">
        <div className="flex items-center text-3xl">{occupancyInfo.icon}</div>
        <div className="flex flex-col">
          <span className="font-semibold">{occupancyInfo.title}</span>
          <span className="text-sm">{occupancyInfo.message}</span>
        </div>
      </div>
    </FormElement>
  );
};

export default PublicGymStatus;
