'use client';
import FormElement from '../ui/FormElement';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/queries/useUser';
import PlusToggleButton from '../ui/PlusToggleButton';

const MembershipStatus = ({ isOpen, setIsOpen }) => {
  const { data: userData, isLoading } = useUser();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [showAktivs, setShowAktivs] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [textOpacity, setTextOpacity] = useState(1);

  // Derive an immediate remaining time from bestBefore to avoid a brief false "ended" state
  const derivedInitialRemaining = userData?.bestBefore
    ? Math.max(0, new Date(userData.bestBefore) - new Date())
    : null;
  const effectiveRemaining = timeRemaining ?? derivedInitialRemaining;
  const isMemberNow = (effectiveRemaining != null && effectiveRemaining > 0) || userData?.isMember;

  // Determine status color and text (computed before hooks that depend on statusText)
  let bgColor = 'bg-zinc-600';
  let statusText = 'Abonements beidzies';

  if (isMemberNow && effectiveRemaining !== null) {
    if (effectiveRemaining > 12 * 60 * 60 * 1000) {
      bgColor = 'bg-success';
      statusText = showCountdown
        ? `Līdz ${userData?.bestBefore ? new Date(userData.bestBefore).toLocaleDateString('lv-LV', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }) : ''}`
        : 'Abonements aktīvs';
    } else if (effectiveRemaining > 0) {
      bgColor = 'bg-warning';
      statusText = showAktivs ? `${countdown}` : 'Abonements aktīvs';
    }
  }

  // Orchestrate text transition: fade out -> resize (layout) -> fade in
  useEffect(() => {
    if (displayedText === '') {
      setDisplayedText(statusText);
      return;
    }
    if (displayedText === statusText) return;
    setTextOpacity(0);
    const fadeOutMs = 280;
    const resizeMs = 320;
    const t1 = setTimeout(() => {
      setDisplayedText(statusText);
      const t2 = setTimeout(() => {
        setTextOpacity(1);
      }, resizeMs);
      // store for cleanup
      t1.inner = t2;
    }, fadeOutMs);
    return () => {
      clearTimeout(t1);
      if (t1.inner) clearTimeout(t1.inner);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusText]);

  useEffect(() => {
    if (!userData?.bestBefore) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const bestBefore = new Date(userData.bestBefore);
      return Math.max(0, bestBefore - now);
    };

    const updateCountdown = () => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      // Format countdown
      if (remaining <= 0) {
        setCountdown('Beidzies');
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setCountdown(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [userData?.bestBefore]);

  // Handle timeouts for showing status messages
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (showAktivs || showCountdown) {
      const id = setTimeout(() => {
        setShowAktivs(false);
        setShowCountdown(false);
      }, 5000);
      setTimeoutId(id);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAktivs, showCountdown]);

  if (isLoading || !userData) {
    return (
      <FormElement className="border-none py-2">
        <div className="flex h-[36px] items-center gap-1 rounded-full bg-zinc-600 px-6 py-1 text-background">
          Ielādē
        </div>
      </FormElement>
    );
  }

  const handleStatusClick = () => {
    if (!isMemberNow || !effectiveRemaining || showAktivs || showCountdown) return;

    if (effectiveRemaining <= 12 * 60 * 60 * 1000) {
      setShowAktivs(true);
    } else {
      setShowCountdown(true);
    }
  };

  return (
    <>
      <FormElement className="border-none">
        <motion.div
          className={`flex items-center gap-1 rounded-full text-background ${bgColor} cursor-pointer overflow-hidden whitespace-nowrap px-4 py-1`}
          onClick={handleStatusClick}
          layout
          style={{ height: '36px' }}
          transition={{
            layout: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
            backgroundColor: { duration: 0.4, ease: 'easeInOut' },
          }}
        >
          <motion.span
            animate={{ opacity: textOpacity }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="block whitespace-nowrap text-center"
          >
            {displayedText || statusText}
          </motion.span>
        </motion.div>
        <PlusToggleButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          className={`h-[36px] overflow-hidden rounded-full border-none px-2 py-1 font-medium uppercase ${isOpen ? 'text-alternate' : 'text-foreground'}`}
        />
      </FormElement>
    </>
  );
};

export default MembershipStatus;
