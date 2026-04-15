'use client';
import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Image from 'next/image';
import { FaDumbbell } from 'react-icons/fa6';
import { TbHanger } from 'react-icons/tb';
import { useEntryQRCodes } from '@/hooks/queries/useEntryQRCodes';
import { useUser } from '@/hooks/queries/useUser';
import Loader from './Loader';
import { Button } from './Button';
import { motion, useReducedMotion } from 'framer-motion';

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
  },
};

const qrCardVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const QRCodes = ({ isOpen }) => {
  const [selected, setSelected] = useState(0);
  const shouldReduce = useReducedMotion();

  const { data: qrCodes, isLoading, isError, error } = useEntryQRCodes();
  const { data: userData } = useUser();
  const QR_OPTIONS = getQROptions(qrCodes);

  useEffect(() => {
    if (!userData?.isMember && selected !== 0) {
      setSelected(0);
    }
  }, [userData, selected]);

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 bottom-[78px] z-10 flex flex-col items-center justify-center gap-12 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      >
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
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        className="fixed inset-0 bottom-[78px] z-10 flex flex-col items-center justify-center gap-12 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      >
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
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 bottom-[78px] z-10 flex flex-col items-center justify-center gap-6 bg-background">
      <motion.div
        className="flex flex-col items-center gap-6"
        variants={shouldReduce ? undefined : containerVariants}
        initial={shouldReduce ? false : 'hidden'}
        animate={isOpen ? 'visible' : 'hidden'}
      >
        {/* Logo */}
        <motion.div variants={shouldReduce ? undefined : itemVariants}>
          <Image
            src="/logo_red.png"
            alt="Ozols Sports Club Logo"
            width={300}
            height={82}
            className="max-w-[180px]"
            priority
          />
        </motion.div>

        {/* QR card */}
        <motion.div
          className="qr-force-light rounded-2xl bg-white p-4 shadow-xl"
          style={{ backgroundColor: '#ffffff', color: '#000000', colorScheme: 'light', width: '288px', height: '288px' }}
          variants={shouldReduce ? undefined : qrCardVariants}
        >
          {QR_OPTIONS[selected]?.code ? (
            <QRCode
              value={QR_OPTIONS[selected].code}
              className="h-full max-h-[256px] w-full max-w-[256px]"
              bgColor="#ffffff"
              fgColor="#000000"
            />
          ) : (
            <p className="p-8 text-sm text-gray-500">QR kods nav pieejams</p>
          )}
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          className="relative flex select-none items-center justify-center gap-3"
          variants={shouldReduce ? undefined : itemVariants}
        >
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QRCodes;
