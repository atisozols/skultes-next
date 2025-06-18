'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { Button } from '../ui/Button';
import { HiPhoneArrowUpRight } from 'react-icons/hi2';
import BendArrow from '../ui/icons/BendArrow';

const Coach = ({ name, title, image, quote, specialties, phone, size = 'default' }) => {
  // Size classes based on the prop
  const sizeClasses = {
    xs: 'aspect-[4/7] text-xs',
    sm: 'aspect-[5/6] text-sm',
    default: 'aspect-[3/4] text-base',
    large: 'aspect-[2/3] md:aspect-[3/4] text-lg',
  };

  const aspectRatioClass = sizeClasses[size] || sizeClasses.default;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Handle phone call with direct window.location to ensure it works on all clicks
  const handlePhoneCall = (e) => {
    e.preventDefault();
    window.location.href = `tel:${phone}`;
  };

  // Closed state with bottom blur fade
  if (!isOpen) {
    return (
      <div className="animate-fadeIn w-full">
        <div className="relative overflow-hidden rounded-xl bg-black">
          <div className={`relative ${aspectRatioClass} w-full`}>
            <Image src={`/coaches/${image}`} alt={name} fill className="object-cover opacity-90" />
            {/* Blurry overlay with mask to fade it out */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[280px]">
              <div className="fade-blur-bottom absolute inset-0"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
              <h3 className="mb-1 text-2xl font-bold text-white">{name}</h3>
              <p className="mb-4 text-alternate">{title}</p>

              <div
                className={`flex ${['xs', 'sm'].includes(size) ? 'flex-col' : 'items-center justify-between'} gap-2`}
              >
                <a href={`tel:${phone}`} className="w-full">
                  <Button
                    variant="outline"
                    className={`font-medium uppercase ${['xs', 'sm'].includes(size) ? 'w-full' : ''}`}
                  >
                    <HiPhoneArrowUpRight className="mr-1 text-xl" />
                    Sazināties
                  </Button>
                </a>
                <Button
                  variant="default"
                  onClick={toggleOpen}
                  className={`font-medium uppercase ${['xs', 'sm'].includes(size) ? 'w-full' : ''}`}
                >
                  Vairāk
                  <BendArrow className="ml-1 text-xl" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={`relative ${aspectRatioClass} animate-fadeIn overflow-hidden rounded-xl`}
        style={{
          backgroundImage: `url(/coaches/${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Strong blur overlay using ::before pseudo-element */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-between gap-6 p-4">
          <div className="flex w-full flex-col items-start gap-6">
            <div>
              <div className="mb-2 flex items-center gap-2 text-white/60">
                <IoChatbubbleEllipsesOutline />
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
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-2">
            <a href={`tel:${phone}`} className="flex w-full items-center justify-center">
              <Button
                className={`font-medium uppercase ${['default', 'large'].includes(size) ? 'w-4/5' : 'w-full'}`}
              >
                PIETEIKT TRENIŅU <FaArrowRight className="ml-2" />
              </Button>
            </a>
            <Button onClick={toggleOpen} variant="ghost" className="font-medium uppercase">
              <BendArrow className="mr-1 -rotate-90 text-xl" /> Atpakaļ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coach;
