'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiMiniSquares2X2, HiMiniQrCode, HiPlus } from 'react-icons/hi2';
import { Md1kPlus } from 'react-icons/md';
import QRCodes from './QRCodes';

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
      {selectedSection === 'qr' && <QRCodes />}
      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[600px] -translate-x-1/2 transform rounded-2xl bg-background p-3 shadow-lg sm:bottom-4 sm:max-w-[350px] md:bottom-10">
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
