'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiMiniSquares2X2, HiMiniQrCode, HiPlus } from 'react-icons/hi2';
import { Md1kPlus } from 'react-icons/md';
import QRCode from 'react-qr-code';

const Nav = () => {
  // Prevent hydration errors by ensuring the component is mounted on the client
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [selectedSection, setSelectedSection] = useState('grid');
  const [code, setCode] = useState('');
  const [overlayVisible, setOverlayVisible] = useState(false);

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  useEffect(() => {
    if (selectedSection === 'qr') {
      const newCode = generateRandomCode();
      setCode(newCode);
      setOverlayVisible(false);

      const fadeInTimer = setTimeout(() => {
        setOverlayVisible(true);
      }, 50);

      return () => {
        clearTimeout(fadeInTimer);
      };
    }
  }, [selectedSection]);

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
      {code && (
        <div
          key={code} // force re-mount for a fresh fade-in each time
          className={`fixed inset-0 flex flex-col items-center justify-center gap-5 bg-black transition-opacity duration-100 ${
            overlayVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src="/logo_red.png"
            alt="Logo"
            width={750}
            height={204}
            className="absolute left-1/2 top-20 max-w-[200px] -translate-x-1/2 transform"
          />
          <div className="mx-auto flex w-full max-w-[210px] flex-row items-center justify-between gap-5">
            <button className="flex max-w-[105px] flex-row items-center justify-center gap-2 rounded-xl py-1 text-sm font-light">
              <span className="text-sm">Atis Ozols</span>
            </button>{' '}
            <button className="rounded-xl bg-accent px-4 py-px text-sm font-black text-background">
              Pro
            </button>
          </div>
          <div className="z-10 rounded-2xl bg-white p-3 text-background">
            <QRCode className="max-h-[200px] max-w-[200px]" value={code} />
          </div>
        </div>
      )}
      <nav className="fixed bottom-0 left-1/2 w-full max-w-[600px] -translate-x-1/2 transform rounded-2xl bg-background p-4 shadow-lg sm:bottom-4 sm:max-w-[350px] md:bottom-10">
        <ul className="flex justify-around">
          <li
            onClick={() => {
              if (selectedSection === 'qr') {
                // Update nav button immediately and start fade-out
                setSelectedSection('grid');
                setOverlayVisible(false);
                setTimeout(() => {
                  setCode('');
                }, 100);
              } else {
                setSelectedSection('grid');
              }
            }}
          >
            <HiMiniSquares2X2
              className={`text-4xl transition-colors duration-300 ${
                selectedSection === 'grid' ? 'text-accent' : ''
              }`}
            />
          </li>
          <li onClick={() => setSelectedSection('qr')}>
            <HiMiniQrCode
              className={`text-4xl transition-colors duration-300 ${
                selectedSection === 'qr' ? 'text-accent' : ''
              }`}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
