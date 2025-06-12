import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Image from 'next/image';
import { FaDumbbell } from 'react-icons/fa6';
import { TbHanger } from 'react-icons/tb';
import { useEntryQRCodes } from '@/hooks/queries/useEntryQRCodes';
import { useUser } from '@/hooks/queries/useUser';
import Loader from './Loader';
import { Button } from './Button';

// QR code options - codes will be populated dynamically from the API
const getQROptions = (qrCodes) => [
  {
    label: 'Ģērbtuves',
    icon: <TbHanger className="text-lg" />,
    code: qrCodes?.dressingRoom || '',
  },
  {
    label: 'Lielā zāle',
    icon: <FaDumbbell className="text-lg" />,
    code: qrCodes?.gym || '',
  },
];

const QRCodes = () => {
  const [selected, setSelected] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Fetch QR codes from the API
  const { data: qrCodes, isLoading, isError, error } = useEntryQRCodes();

  // Fetch user data to check if user is a member
  const { data: userData } = useUser();

  // Get QR options with actual codes from the API
  const QR_OPTIONS = getQROptions(qrCodes);

  // Reset selected tab if user is not a member
  useEffect(() => {
    if (!userData?.isMember && selected !== 0) {
      setSelected(0);
    }
  }, [userData, selected]);

  useEffect(() => {
    setShowOptions(userData?.isMember && qrCodes?.gym);
  }, [userData, qrCodes]);

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
            alt="Ozols Sports Club Logo"
            width={300}
            height={82}
            className="mb-12 max-w-[200px]"
            priority
          />
          <div
            className="rounded-2xl bg-white p-4 shadow-xl"
            style={{ width: '288px', height: '288px' }}
          >
            <div className="flex h-full w-full items-center justify-center">
              <Loader size="text-6xl text-background" />
            </div>
          </div>
          <div className="h-[50px]"></div>
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
            alt="Ozols Sports Club Logo"
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
    <div className="fixed inset-0 bottom-[78px] z-10 flex flex-col items-center justify-center gap-6 bg-background transition-opacity duration-150">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logo_red.png"
          alt="Ozols Sports Club Logo"
          width={300}
          height={82}
          className="mb-12 max-w-[200px]"
          priority
        />
        <div
          className={`rounded-2xl bg-white p-4 shadow-xl transition-opacity duration-150 ${overlayVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {QR_OPTIONS[selected] && QR_OPTIONS[selected].code ? (
            <QRCode
              value={QR_OPTIONS[selected].code}
              className="h-full max-h-[288px] w-full max-w-[288px]"
            />
          ) : (
            <p className="p-8 text-sm text-gray-500">QR kods nav pieejams</p>
          )}
        </div>
      </div>

      {/* Option Switcher - Only display if user is a member and has access to gym */}

      <div className="relative flex select-none items-center justify-center gap-6 rounded-full">
        {QR_OPTIONS.map(
          (opt, idx) =>
            opt.code && (
              <Button
                size="sm"
                variant={selected === idx ? 'default' : 'outline'}
                key={idx}
                onClick={() => setSelected(idx)}
                disabled={idx === 1 && !qrCodes?.gym}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </Button>
            ),
        )}
      </div>
    </div>
  );
};

export default QRCodes;
