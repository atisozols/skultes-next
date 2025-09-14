'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
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
  // Sequenced animation control
  const [overlayVisible, setOverlayVisible] = useState(false); // open blur overlay
  const [showOpenContent, setShowOpenContent] = useState(false);
  const [showClosedContent, setShowClosedContent] = useState(true);

  const OVERLAY_MS = 250;
  const CONTENT_MS = 250;
  const OPEN_CONTENT_DELAY = Math.round(OVERLAY_MS * 0.6); // show text before blur fully finishes
  const CLOSE_OVERLAY_EXTRA_DELAY = 10; // start blur fade slightly after text fade begins

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Handle phone call with direct window.location to ensure it works on all clicks
  const handlePhoneCall = (e) => {
    e.preventDefault();
    window.location.href = `tel:${phone}`;
  };

  // Orchestrate sequence: open => blur first then content; close => content first then blur
  useEffect(() => {
    let t1;
    if (isOpen) {
      // Begin opening: hide closed content immediately, show blur, then show open content
      setShowClosedContent(false);
      setOverlayVisible(true);
      t1 = setTimeout(() => {
        setShowOpenContent(true);
      }, OPEN_CONTENT_DELAY);
    } else {
      // Begin closing: hide open content first, then hide blur, then reveal closed content
      setShowOpenContent(false);
      // Show the closed content immediately so it doesn't wait for blur
      setShowClosedContent(true);
      // Start fading out the overlay almost immediately after text starts fading
      t1 = setTimeout(() => {
        setOverlayVisible(false);
      }, CLOSE_OVERLAY_EXTRA_DELAY);
    }
    return () => {
      if (t1) clearTimeout(t1);
    };
  }, [isOpen]);

  // Unified render: keep the image mounted once and toggle overlays/content
  return (
    <div className="w-full">
      <div className={`relative ${aspectRatioClass} animate-fadeIn overflow-hidden rounded-xl`}>
        {/* Single image instance kept mounted */}
        <Image src={`/coaches/${image}`} alt={name} fill className="object-cover" />

        {/* Conditional overlays with fade (open blur) */}
        <AnimatePresence initial={false}>
          {overlayVisible ? (
            <motion.div
              key="overlay-open"
              className="absolute inset-0"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: OVERLAY_MS / 1000 }}
            />
          ) : (
            <motion.div
              key="overlay-closed"
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-[280px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: OVERLAY_MS / 1000 }}
            >
              <div className="fade-blur-bottom absolute inset-0"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closed content with fade */}
        <AnimatePresence initial={false} mode="wait">
          {showClosedContent && (
            <motion.div
              key="closed-content"
              className="absolute bottom-0 left-0 right-0 z-10 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: CONTENT_MS / 1000 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open content with fade */}
        <AnimatePresence initial={false} mode="wait">
          {showOpenContent && (
            <motion.div
              key="open-content"
              className="relative z-10 flex h-full flex-col items-center justify-between gap-6 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: CONTENT_MS / 1000 }}
            >
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
                    size="lg"
                    className={`border border-accent font-medium uppercase ${['default', 'large'].includes(size) ? 'w-4/5' : 'w-full'}`}
                  >
                    PIETEIKT TRENIŅU <FaArrowRight className="ml-2" />
                  </Button>
                </a>
                <Button onClick={toggleOpen} variant="ghost" className="font-medium uppercase">
                  <BendArrow className="mr-1 -rotate-90 text-xl" /> Atpakaļ
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Coach;
