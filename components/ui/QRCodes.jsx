import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Image from 'next/image';
import { FaDumbbell } from 'react-icons/fa6';
import { TbHanger } from 'react-icons/tb';
import { useEntryQRCodes } from '@/hooks/queries/useEntryQRCodes';
import { useUser } from '@/hooks/queries/useUser';
import Loader from './Loader';

// QR code options - codes will be populated dynamically from the API
const getQROptions = (qrCodes) => [
  {
    label: 'Ģērbtuves',
    icon: <TbHanger className="text-xl" />,
    code: qrCodes?.dressingRoom || '',
  },
  {
    label: 'Lielā zāle',
    icon: <FaDumbbell className="text-xl" />,
    code: qrCodes?.gym || '',
  },
];

const QRCodes = () => {
  const [selected, setSelected] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  
  // Fetch QR codes from the API
  const { data: qrCodes, isLoading, isError, error } = useEntryQRCodes();
  
  // Fetch user data to check if user is a member
  const { data: userData } = useUser();
  
  // Check if user is a member
  const isMember = userData?.customer?.isMember || false;
  
  // Get QR options with actual codes from the API
  const QR_OPTIONS = getQROptions(qrCodes);
  
  // Reset selected tab if user is not a member
  useEffect(() => {
    if (!isMember && selected !== 0) {
      setSelected(0);
    }
  }, [isMember, selected]);

  useEffect(() => {
    setOverlayVisible(false);
    const fadeInTimer = setTimeout(() => setOverlayVisible(true), 50);
    return () => clearTimeout(fadeInTimer);
  }, [selected, qrCodes]);

  // Handle loading state
  if (isLoading) {
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
          <Loader size="text-4xl" />
          <p className="mt-4 text-sm text-gray-500">Ielādē QR kodu...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
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
          <p className="text-red-500">Neizdevās ielādēt QR kodu. Lūdzu, mēģiniet vēlreiz.</p>
          <p className="text-xs text-gray-500">{error?.message}</p>
        </div>
      </div>
    );
  }

  // Render QR code
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
          {QR_OPTIONS[selected] && QR_OPTIONS[selected].code ? (
            <QRCode value={QR_OPTIONS[selected].code} className="max-h-[300px] max-w-[300px]" />
          ) : (
            <p className="p-8 text-sm text-gray-500">QR kods nav pieejams</p>
          )}
        </div>
      </div>

      {/* Option Switcher - Only display if user is a member and has access to gym */}
      {isMember && qrCodes?.gym && (
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
              key={idx}
              className={`relative z-10 flex w-[30px] flex-col items-center justify-center gap-1 py-[9px] text-sm font-semibold transition-colors duration-200 ${selected === idx ? 'text-white' : 'text-foreground/80'}`}
              onClick={() => setSelected(idx)}
              disabled={idx === 1 && !qrCodes?.gym}
            >
              {opt.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QRCodes;
