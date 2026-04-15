'use client';

import { useState, useRef, useEffect } from 'react';
import { useDocumentUploadMutation } from '@/hooks/queries/useDiscountVerification';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from './Button';

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_OUT_QUART = [0.25, 1, 0.5, 1];

const STEP_INDEX = { info: 1, upload: 2, uploading: 2, done: 3, error: 3 };
const TOTAL_STEPS = 3;

const StepProgress = ({ step }) => {
  const current = STEP_INDEX[step] ?? 1;
  return (
    <div className="mb-6 flex gap-1.5">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`h-0.5 flex-1 rounded-full transition-all duration-400 ${i < current ? 'bg-accent' : 'bg-white/10'}`}
        />
      ))}
    </div>
  );
};

const DiscountDocumentModal = ({ onClose, rejectionReason }) => {
  const [step, setStep] = useState('info');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const fileInputRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const uploadMutation = useDocumentUploadMutation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    if (shouldReduce) { onClose(); return; }
    setIsClosing(true);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const errors = [];
    const valid = [];

    files.forEach((file) => {
      if (file.size > MAX_BYTES) {
        errors.push(`${file.name} ir pārāk liels (maks. 5 MB).`);
      } else if (!ACCEPTED_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith('.heic')) {
        errors.push(`${file.name} — neatbalstīts faila formāts.`);
      } else {
        valid.push(file);
      }
    });

    setFileErrors(errors);
    setSelectedFiles(valid);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setStep('uploading');
    setErrorMsg('');
    try {
      await uploadMutation.mutateAsync(
        selectedFiles.map((file) => ({ file, originalName: file.name }))
      );
      setStep('done');
    } catch (err) {
      setErrorMsg(err.message || 'Augšupielāde neizdevās. Lūdzu mēģini vēlreiz.');
      setStep('error');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col bg-background"
      initial={shouldReduce ? false : { y: '100%' }}
      animate={{ y: isClosing ? '100%' : 0 }}
      transition={
        isClosing
          ? { duration: 0.28, ease: [0.55, 0, 1, 0.5] }
          : { duration: 0.4, ease: EASE_OUT_EXPO }
      }
      onAnimationComplete={() => { if (isClosing) onClose(); }}
    >
      <div className="relative flex flex-1 flex-col overflow-y-auto p-6">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-xl text-alternate hover:text-white"
        >
          ✕
        </button>

        <h2 className="mb-5 pr-8 text-xl font-bold">Saņemt atlaidi</h2>

        <StepProgress step={step} />

        {rejectionReason && step === 'info' && (
          <div className="mb-4 rounded-xl bg-red-900/30 p-3 text-sm text-red-300">
            <span className="font-medium">Iemesls: </span>{rejectionReason}
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={shouldReduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT_QUART }}
          >
            {step === 'info' && (
              <div className="flex flex-col gap-5">
                {/* 40% hero */}
                <div className="rounded-2xl bg-accent/10 px-5 pb-5 pt-6 text-center">
                  <p className="text-7xl font-black leading-none text-accent">40%</p>
                  <p className="mt-2 text-sm text-alternate">atlaide Lielās zāles abonementam</p>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  <p className="font-medium">Kas var saņemt:</p>
                  <ul className="flex flex-col gap-1.5 text-alternate">
                    <li className="flex gap-2"><span className="text-accent">—</span>Skolēni un studenti līdz 25 gadu vecumam</li>
                    <li className="flex gap-2"><span className="text-accent">—</span>Pensionāri (vīrieši no 65 g., sievietes no 63 g.)</li>
                  </ul>

                  <p className="mt-1 font-medium">Nepieciešamie dokumenti:</p>
                  <ul className="flex flex-col gap-1.5 text-alternate">
                    <li className="flex gap-2"><span className="text-accent">—</span>Studentiem / skolēniem: apliecība, ISIC karte vai izziņa</li>
                    <li className="flex gap-2"><span className="text-accent">—</span>Pensionāriem: apliecība vai personu apliecinošs dokuments</li>
                  </ul>

                  <p className="mt-1 text-alternate">
                    Pārbaude aizņem līdz <span className="text-white">2 darba dienām</span>.
                  </p>
                </div>

                <p className="text-xs text-alternate">
                  Augšupielādējot, tu piekrīti mūsu{' '}
                  <a href="/pp" className="underline">privātuma politikai</a>.
                </p>
                <Button variant="default" className="w-full font-medium uppercase" onClick={() => setStep('upload')}>
                  Turpināt
                </Button>
              </div>
            )}

            {step === 'upload' && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-alternate">
                  Augšupielādē dokumenta foto vai PDF. Var pievienot vairākus failus.
                </p>
                <Button variant="outline" className="w-full font-medium uppercase" onClick={() => fileInputRef.current?.click()}>
                  {selectedFiles.length > 0 ? 'Mainīt failus' : 'Izvēlēties failus'}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />

                {selectedFiles.length > 0 && (
                  <ul className="flex flex-col gap-1">
                    {selectedFiles.map((f, i) => (
                      <li key={i} className="flex items-center justify-between rounded-lg bg-base-200 px-3 py-2 text-sm">
                        <span className="truncate">{f.name}</span>
                        <span className="ml-2 shrink-0 text-alternate">
                          {(f.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {fileErrors.length > 0 && (
                  <ul className="flex flex-col gap-1">
                    {fileErrors.map((e, i) => (
                      <li key={i} className="text-sm text-red-400">{e}</li>
                    ))}
                  </ul>
                )}

                <Button variant="default" className="w-full font-medium uppercase" onClick={handleUpload} disabled={selectedFiles.length === 0}>
                  Iesniegt
                </Button>
              </div>
            )}

            {step === 'uploading' && (
              <div className="flex flex-col items-center gap-4 py-8">
                <span className="loading loading-spinner loading-lg text-accent" />
                <p className="text-sm text-alternate">Augšupielādē...</p>
              </div>
            )}

            {step === 'done' && (
              <div className="flex flex-col items-center gap-4 py-8">
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-3xl text-accent"
                  initial={shouldReduce ? false : { scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: EASE_OUT_EXPO }}
                >
                  ✓
                </motion.div>
                <p className="text-center font-medium">Dokumenti nosūtīti pārbaudei!</p>
                <p className="text-center text-sm text-alternate">
                  Pārbaude aizņem līdz 2 darba dienām.
                </p>
                <Button variant="default" className="w-full font-medium uppercase" onClick={handleClose}>
                  Aizvērt
                </Button>
              </div>
            )}

            {step === 'error' && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-red-400">{errorMsg}</p>
                <Button variant="outline" className="w-full font-medium uppercase" onClick={() => setStep('upload')}>
                  Mēģināt vēlreiz
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DiscountDocumentModal;
