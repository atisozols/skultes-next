'use client';

import { useState, useEffect, useRef } from 'react';
import Section from '@/components/ui/Section';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { MdArrowForwardIos } from 'react-icons/md';
import Container from '../ui/Container';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const toggleOpen = () => {
    const wasOpen = isOpen;
    setIsOpen(!wasOpen);

    // Only scroll when opening
    if (!wasOpen) {
      // Use a longer delay to allow animation to get further along
      setTimeout(() => {
        if (buttonRef.current) {
          // Get the button's position
          const buttonRect = buttonRef.current.getBoundingClientRect();

          // Calculate a position that will show the full expanded content
          // Scroll to position the button near the top of the viewport
          window.scrollTo({
            top: window.scrollY + buttonRect.top - 100, // Offset by 100px to leave room at the top
            behavior: 'smooth',
          });
        }
      }, 300); // Longer delay to ensure animation has progressed enough
    }
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <Section title="Sazinies ar mums" id="contact">
      <Container>
        <div className="flex flex-col px-2 py-2">
          <button
            ref={buttonRef}
            onClick={toggleOpen}
            className="flex w-full cursor-pointer appearance-none items-center justify-between rounded-lg bg-transparent p-2 text-right transition-all active:bg-white active:bg-opacity-5"
          >
            <span>Kontakti</span>
            <MdArrowForwardIos className={`transition-all duration-300 ${isOpen && 'rotate-90'}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="contact-content"
                style={{ overflow: 'hidden' }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: measuredHeight, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div ref={contentRef} className="flex flex-col space-y-8 p-4">
                  <div className="space-y-6">
                    <div>
                      <h2 className="mb-2 text-xs font-medium uppercase text-alternate">
                        Trenējies pie mums
                      </h2>
                      <div className="flex flex-col text-xl font-light text-foreground">
                        <span>Brīvības laukums 4, Tukums</span>
                        <span className="text-xs">ieeja no Harmonijas ielas pagalma pusē</span>
                      </div>
                    </div>
                    <div>
                      <h2 className="mb-2 text-xs font-medium uppercase text-alternate">
                        Sazinies ar mums
                      </h2>
                      <a
                        href="mailto:atis@ozols.club"
                        className="flex items-center gap-2 text-xl font-light text-foreground"
                      >
                        atis@ozols.club
                      </a>
                    </div>
                    <div className="flex flex-col items-start justify-center text-alternate">
                      <h2 className="mb-3 text-xs font-medium uppercase text-alternate">
                        Seko mums
                      </h2>
                      <div className="flex items-center justify-center gap-6 text-xl text-foreground">
                        <Link href={'https://www.instagram.com/ozols_club'}>
                          <FaInstagram />
                        </Link>
                        <Link href={'https://www.facebook.com/ozols.club'}>
                          <FaFacebook />
                        </Link>
                        <Link href={'https://www.tiktok.com/@ozols_club'}>
                          <FaTiktok />
                        </Link>
                      </div>
                    </div>
                    <div>
                      <h2 className="mb-2 text-xs font-medium uppercase text-alternate">P - SV</h2>
                      <div className="flex flex-col text-xl font-light text-foreground">
                        <span>5:00 - 23:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;
