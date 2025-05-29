import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Image from 'next/image';
import { FaDumbbell } from 'react-icons/fa6';
import { TbHanger } from 'react-icons/tb';

const QR_OPTIONS = [
  {
    label: 'Ģērbtuves',
    icon: <TbHanger className="text-xl" />,
    code: 'GERBTUVES-QR-002', // You can change to dynamic if needed
  },
  {
    label: 'Lielā zāle',
    icon: <FaDumbbell className="text-xl" />,
    code: 'LIELEZALE-QR-001', // You can change to dynamic if needed
  },
];

const QRCodes = () => {
  const [selected, setSelected] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    setOverlayVisible(false);
    const fadeInTimer = setTimeout(() => setOverlayVisible(true), 50);
    return () => clearTimeout(fadeInTimer);
  }, [selected]);

  return (
    <div className="fixed inset-0 bottom-[78px] z-10 flex flex-col items-center justify-center gap-12 bg-background transition-opacity duration-150">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logo_red.png"
          alt="Skultes Logo"
          width={300}
          height={82}
          className="mb-12 max-w-[200px]"
          priority
        />
        <div
          className={`rounded-2xl bg-white p-4 shadow-xl transition-opacity duration-150 ${overlayVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <QRCode value={QR_OPTIONS[selected].code} className="max-h-[300px] max-w-[300px]" />
        </div>
      </div>
      {/* Option Switcher */}
      <div className="relative flex w-[200px] select-none items-center justify-between rounded-full bg-container px-8 py-1">
        {/* Animated highlight */}
        <div
          className="absolute left-2.5 top-2 h-[30px] w-[80px] rounded-full bg-accent transition-transform duration-300"
          style={{
            transform: `translateX(${selected === 0 ? '0' : '100'}px)`,
          }}
        />
        {QR_OPTIONS.map((opt, idx) => (
          <button
            key={opt.label}
            className={`relative z-10 flex w-[30px] flex-col items-center justify-center gap-1 py-[9px] text-sm font-semibold transition-colors duration-200 ${selected === idx ? 'text-white' : 'text-foreground/80'}`}
            onClick={() => setSelected(idx)}
          >
            {opt.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QRCodes;
