'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import imageCompression from 'browser-image-compression';
import { usePhotoUploadMutation } from '@/hooks/queries/usePhotoVerification';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LuCamera } from 'react-icons/lu';
import { Button } from './Button';

const MAX_BYTES = 5 * 1024 * 1024;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_OUT_QUART = [0.25, 1, 0.5, 1];

const STEP_INDEX = { input: 1, crop: 2, preview: 3, uploading: 3, done: 4, error: 4 };
const TOTAL_STEPS = 4;

const StepProgress = ({ step }) => {
  const current = STEP_INDEX[step] ?? 1;
  return (
    <div className="mb-6 flex gap-1.5">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`duration-400 h-0.5 flex-1 rounded-full transition-all ${i < current ? 'bg-accent' : 'bg-white/10'}`}
        />
      ))}
    </div>
  );
};

async function getCroppedBlob(imageSrc, croppedAreaPixels) {
  const image = await createImageBitmap(await fetch(imageSrc).then((r) => r.blob()));
  const canvas = document.createElement('canvas');
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  );
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
}

const PhotoUploadModal = ({ onClose, rejectionReason }) => {
  const [step, setStep] = useState('input');
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const fileInputRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const uploadMutation = usePhotoUploadMutation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    if (shouldReduce) {
      onClose();
      return;
    }
    setIsClosing(true);
  };

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    let processedFile = file;

    if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
      try {
        const heic2any = (await import('heic2any')).default;
        const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
        processedFile = new File([converted], file.name.replace(/\.heic$/i, '.jpg'), {
          type: 'image/jpeg',
        });
      } catch {
        setErrorMsg('Neizdevās apstrādāt HEIC failu. Lūdzu izvēlies JPG vai PNG.');
        return;
      }
    }

    const url = URL.createObjectURL(processedFile);
    setImageSrc(url);
    setStep('crop');
  };

  const handleCropConfirm = async () => {
    try {
      const blob = await getCroppedBlob(imageSrc, croppedAreaPixels);

      let finalBlob = blob;
      if (blob.size > MAX_BYTES) {
        const compressed = await imageCompression(
          new File([blob], 'photo.jpg', { type: 'image/jpeg' }),
          { maxSizeMB: 5, useWebWorker: true },
        );
        finalBlob = compressed;
      }

      if (finalBlob.size > MAX_BYTES) {
        setErrorMsg('Fails ir pārāk liels. Lūdzu izvēlies citu fotogrāfiju.');
        setStep('input');
        return;
      }

      setCroppedBlob(finalBlob);
      setPreviewUrl(URL.createObjectURL(finalBlob));
      setStep('preview');
    } catch {
      setErrorMsg('Neizdevās apstrādāt attēlu. Lūdzu mēģini vēlreiz.');
      setStep('input');
    }
  };

  const handleUpload = async () => {
    setStep('uploading');
    setErrorMsg('');
    try {
      await uploadMutation.mutateAsync(croppedBlob);
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
      onAnimationComplete={() => {
        if (isClosing) onClose();
      }}
    >
      <div className="relative flex flex-1 flex-col overflow-y-auto p-6">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-xl text-alternate hover:text-white"
        >
          ✕
        </button>

        <h2 className="mb-5 pr-8 text-xl font-bold">Foto verifikācija</h2>

        <StepProgress step={step} />

        {rejectionReason && step === 'input' && (
          <div className="mb-4 rounded-xl bg-red-900/30 p-3 text-sm text-red-300">
            <span className="font-medium">Iemesls: </span>
            {rejectionReason}
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
            {step === 'input' && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 text-sm">
                  <p className="font-medium">Foto prasības:</p>
                  <ul className="flex flex-col gap-1.5 text-alternate">
                    <li className="flex gap-2"><span className="text-accent">—</span>Skaidri redzama seja, skatiens taisni uz kameru</li>
                    <li className="flex gap-2"><span className="text-accent">—</span>Vienmērīgs apgaismojums, bez asām ēnām</li>
                    <li className="flex gap-2"><span className="text-accent">—</span>Gaišs vai neitrāls fons</li>
                    <li className="flex gap-2"><span className="text-accent">—</span>Bez cepures, saulesbrillēm vai maskas</li>
                    <li className="flex gap-2"><span className="text-accent">—</span>Tikai viena persona fotogrāfijā</li>
                  </ul>
                </div>

                {/* Upload zone */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-36 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 transition-colors hover:border-accent/40 hover:bg-accent/5 active:opacity-70"
                >
                  <LuCamera className="text-4xl text-alternate" />
                  <div className="text-center">
                    <p className="text-sm font-medium">Fotografēt vai izvēlēties</p>
                    <p className="mt-0.5 text-xs text-alternate">JPG, PNG, HEIC</p>
                  </div>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="user"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <p className="text-sm text-alternate">
                  Pārbaude aizņem līdz{' '}
                  <span className="text-white">2 darba dienām</span>.
                </p>
                <p className="text-xs text-alternate">
                  Augšupielādējot, tu piekrīti mūsu{' '}
                  <a href="/pp" className="underline">
                    privātuma politikai
                  </a>
                  .
                </p>
                {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
              </div>
            )}

            {step === 'crop' && imageSrc && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-alternate">Pozicionē tā, lai seja iekļaujas siluetā.</p>
                <div className="relative h-72 w-full overflow-hidden rounded-xl bg-black">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                  {/* Silhouette guide overlay */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="aspect-square h-full">
                      <svg
                        viewBox="0 0 100 100"
                        className="h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M 0 105 C 10 95 20 88 30 86 Q 38 84 42 72 C 26 68 26 22 50 20 C 74 22 74 68 58 72 Q 62 84 70 86 C 80 88 90 95 100 105"
                          fill="none"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.45"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[var(--accent)]"
                />
                <Button variant="default" className="w-full font-medium uppercase" onClick={handleCropConfirm}>
                  Apstiprināt izgriezumu
                </Button>
              </div>
            )}

            {step === 'preview' && previewUrl && (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={previewUrl}
                  alt="Priekšskatījums"
                  className="h-48 w-48 rounded-xl object-cover"
                />
                <p className="text-sm text-alternate">Izskatās labi? Apstiprini augšupielādi.</p>
                <div className="flex w-full gap-3">
                  <Button variant="outline" className="flex-1 font-medium uppercase" onClick={() => setStep('input')}>
                    Mainīt
                  </Button>
                  <Button variant="default" className="flex-1 font-medium uppercase" onClick={handleUpload}>
                    Augšupielādēt
                  </Button>
                </div>
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
                  className="bg-accent/15 flex h-16 w-16 items-center justify-center rounded-full text-3xl text-accent"
                  initial={shouldReduce ? false : { scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: EASE_OUT_EXPO }}
                >
                  ✓
                </motion.div>
                <p className="text-center font-medium">Foto nosūtīts pārbaudei!</p>
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
                <Button variant="outline" className="w-full font-medium uppercase" onClick={() => setStep('input')}>
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

export default PhotoUploadModal;
