'use client';
import FormElement from '../ui/FormElement';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa6';
import { useUser } from '@/hooks/queries/useUser';
import { Button } from '../ui/Button';

const MembershipStatus = ({ isOpen, setIsOpen }) => {
  const { data: userData, isLoading } = useUser();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [showAktivs, setShowAktivs] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // Derive an immediate remaining time from bestBefore to avoid a brief false "ended" state
  const derivedInitialRemaining = userData?.bestBefore
    ? Math.max(0, new Date(userData.bestBefore) - new Date())
    : null;
  const effectiveRemaining = timeRemaining ?? derivedInitialRemaining;
  const isMemberNow = (effectiveRemaining != null && effectiveRemaining > 0) || userData?.isMember;

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
      <FormElement className="border-none py-4">
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

  // Determine status color and text
  let statusColor = 'text-zinc-400';
  let bgColor = 'bg-zinc-600';
  let statusText = 'Abonements beidzies';
  let isActive = false;

  if (isMemberNow && effectiveRemaining !== null) {
    if (effectiveRemaining > 12 * 60 * 60 * 1000) {
      // More than 12 hours - emerald
      statusColor = 'text-success';
      bgColor = 'bg-success';
      statusText = showCountdown
        ? `Līdz ${new Date(userData.bestBefore).toLocaleDateString('lv-LV', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}`
        : 'Abonements aktīvs';
      isActive = true;
    } else if (effectiveRemaining > 0) {
      // Less than 12 hours - amber with countdown
      statusColor = 'text-warning';
      bgColor = 'bg-warning';
      statusText = showAktivs ? `${countdown}` : 'Abonements aktīvs';
      isActive = true;
    }
  }

  return (
    <>
      <FormElement className="border-none py-4">
        <motion.div
          className={`flex items-center gap-1 rounded-full text-background ${bgColor} cursor-pointer overflow-hidden px-2 py-1`}
          onClick={handleStatusClick}
          layout
          style={{
            height: '36px',
            width:
              statusText === 'Abonements aktīvs'
                ? '170px'
                : statusText === 'Abonements beidzies'
                  ? '178px'
                  : statusColor === 'text-warning'
                    ? '90px'
                    : '150px',
            transition: 'width 0.3s ease-in-out',
          }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 500, damping: 30 }}
        >
          <div className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={statusText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-full text-center"
              >
                {statusText}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
          className={`h-[36px] overflow-hidden rounded-full border-[0.5px] border-alternate px-2 py-1 font-medium uppercase ${isOpen ? 'text-alternate' : 'text-foreground'}`}
        >
          <span className="text-sm">{isOpen ? 'Aizvērt' : 'Papildināt'}</span>
          <motion.div animate={{ rotate: isOpen ? -135 : 0 }} transition={{ duration: 0.25 }}>
            <FaPlus className="text-sm" />
          </motion.div>
        </Button>
      </FormElement>
    </>
  );
};

export default MembershipStatus;
