'use client';

import { IoFlameSharp } from 'react-icons/io5';
import FormElement from '../ui/FormElement';

const LastVisit = () => {
  return (
    <FormElement className="py-4">
      <div className="">
        <h3 className="flex items-center gap-px font-semibold text-accent">
          <IoFlameSharp className="text-xl" /> <span>Iepriekšējais apmekējums</span>
        </h3>
        <p>Tavs iepriekšējais apmeklējums bija pirms 3 dienām</p>
      </div>
    </FormElement>
  );
};

export default LastVisit;
