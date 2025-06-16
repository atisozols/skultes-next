'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { IoMdMail, IoMdCall } from 'react-icons/io';
import { MdOutlineChat, MdOutlineTrackChanges } from 'react-icons/md';
import { LuEuro } from 'react-icons/lu';
import { Button } from '../ui/Button';
import { HiPhoneArrowUpRight } from 'react-icons/hi2';
import BendArrow from '../ui/icons/BendArrow';

const Coach = ({ name, title, image, quote, specialties, phone }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      {!isOpen ? (
        <div className="relative overflow-hidden rounded-xl bg-black">
          <div className="relative aspect-[3/4] w-full">
            <Image src={`/coaches/${image}`} alt={name} fill className="object-cover opacity-90" />
            {/* Blurry overlay with mask to fade it out */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[280px]">
              <div className="fade-blur-bottom absolute inset-0"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
              <h3 className="mb-1 text-2xl font-semibold text-white">{name}</h3>
              <p className="mb-4 text-alternate">{title}</p>

              <div className="flex items-center justify-between gap-2">
                <Button variant="outline" href={`tel:${phone}`} className="font-medium uppercase">
                  <HiPhoneArrowUpRight className="mr-1 text-xl" />
                  Zvanīt
                </Button>
                <Button variant="default" onClick={toggleOpen} className="font-medium uppercase">
                  Vairāk info
                  <BendArrow className="ml-1 text-2xl" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Open State
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl p-6">
          {/* Background image that will be blurred */}
          <Image
            src={`/coaches/${image}`}
            alt={name}
            fill
            className="-z-20 object-cover opacity-50"
          />
          {/* Blurred overlay */}
          <div className="absolute inset-0 -z-10 bg-black/70 backdrop-blur-xl"></div>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2 text-white/60">
                <MdOutlineChat />
                <span>PAR MANI</span>
              </div>
              <p className="text-white">&quot;{quote}&quot;</p>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-white/60">
                <MdOutlineTrackChanges />
                <span>SPECIALIZĀCIJA</span>
              </div>
              <ul className="space-y-2 pl-3">
                {specialties.map((specialty, index) => (
                  <li key={index} className="flex items-center gap-2 text-white">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white"></span>
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4">
              <button className="flex w-full items-center justify-center rounded-md bg-accent py-3 font-medium text-white">
                PIETEIKT TRENIŅU <FaArrowRight className="ml-2" />
              </button>

              <button
                onClick={toggleOpen}
                className="flex w-full items-center justify-center py-2 text-white/60"
              >
                <FaArrowLeft className="mr-2" /> ATPAKAĻ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coach;
