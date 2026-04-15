'use client';
import { useState, useEffect } from 'react';
import { HiMiniSquares2X2, HiMiniQrCode } from 'react-icons/hi2';
import QRCodes from './QRCodes';
import { motion } from 'framer-motion';

const Nav = () => {
  // Prevent hydration errors by ensuring the component is mounted on the client
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [selectedSection, setSelectedSection] = useState('grid');

  // Disable scrolling when QR section is visible
  useEffect(() => {
    if (selectedSection === 'qr') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedSection]);

  if (!hasMounted) return null;

  return (
    <>
      {/* QR view — always mounted, slides in/out via Framer Motion */}
      <motion.div
        className="fixed inset-0 z-40"
        initial={false}
        animate={{ y: selectedSection === 'qr' ? 0 : '100%' }}
        transition={
          selectedSection === 'qr'
            ? { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
            : { duration: 0.28, ease: [0.55, 0, 1, 0.5] }
        }
        style={{ willChange: 'transform' }}
      >
        <QRCodes isOpen={selectedSection === 'qr'} />
      </motion.div>
      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 bg-background px-6 pb-8 pt-3">
        <ul className="flex justify-around">
          <li
            className="flex flex-col items-center gap-2"
            onClick={() => {
              setSelectedSection('grid');
            }}
          >
            <HiMiniSquares2X2
              className={`text-3xl transition-colors duration-300 ${
                selectedSection === 'grid' ? 'text-accent' : ''
              }`}
            />
            <span
              className={`text-xs transition-colors duration-300 ${
                selectedSection === 'grid' ? 'text-accent' : ''
              }`}
            >
              Pārskats
            </span>
          </li>
          <li onClick={() => setSelectedSection('qr')} className="flex flex-col items-center gap-2">
            <HiMiniQrCode
              className={`text-3xl transition-colors duration-300 ${
                selectedSection === 'qr' ? 'text-accent' : ''
              }`}
            />
            <span
              className={`text-xs transition-colors duration-300 ${
                selectedSection === 'qr' ? 'text-accent' : ''
              }`}
            >
              Ieejas kartes
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
