'use client';
import FormElement from '../ui/FormElement';
import { FaCircle, FaPlus } from 'react-icons/fa';
import { useUser } from '@/context/UserContext';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MembershipStatus = () => {
  const { userData } = useUser();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [showAktivs, setShowAktivs] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    if (!userData || !userData.bestBefore) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const bestBefore = new Date(userData.bestBefore);
      const diff = bestBefore - now;

      // Return milliseconds remaining
      return Math.max(0, diff);
    };

    const formatCountdown = (ms) => {
      if (ms <= 0) return 'Beidzies';

      const hours = Math.floor(ms / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);

      // Format as HH:MM:SS
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    // Initial calculation
    const remaining = calculateTimeRemaining();
    setTimeRemaining(remaining);
    setCountdown(formatCountdown(remaining));

    // Update every second for more precise countdown
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
      setCountdown(formatCountdown(remaining));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [userData]);

  if (!userData) {
    return (
      <FormElement className="py-4">
        <div className="flex items-center gap-1 rounded-full bg-zinc-600 px-2 py-1 text-xs">
          <FaCircle className="text-zinc-400" />
          Ielādē...
        </div>
      </FormElement>
    );
  }

  const handleStatusClick = useCallback(() => {
    if (userData.isMember && timeRemaining > 0) {
      if (timeRemaining <= 12 * 60 * 60 * 1000) {
        // For amber status (less than 12 hours) - show 'Aktīvs'
        setShowAktivs(true);
        setTimeout(() => setShowAktivs(false), 5000);
      } else {
        // For emerald status (more than 12 hours) - show countdown
        setShowCountdown(true);
        setTimeout(() => setShowCountdown(false), 5000);
      }
    }
  }, [userData, timeRemaining]);

  // Determine status color and text
  let statusColor = 'text-zinc-400';
  let bgColor = 'bg-zinc-600';
  let statusText = 'Abonements beidzies';
  let isActive = false;

  if (userData.isMember && timeRemaining !== null) {
    if (timeRemaining > 12 * 60 * 60 * 1000) {
      // More than 12 hours - emerald
      statusColor = 'text-green-400';
      bgColor = 'bg-green-900';
      statusText = showCountdown
        ? `Līdz ${new Date(userData.bestBefore).toLocaleDateString('lv-LV', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}`
        : 'Abonements aktīvs';
      isActive = true;
    } else if (timeRemaining > 0) {
      // Less than 12 hours - amber with countdown
      statusColor = 'text-amber-400';
      bgColor = 'bg-amber-600';
      statusText = showAktivs ? `Vēl ${countdown}` : 'Abonements aktīvs';
      isActive = true;
    }
  }

  return (
    <>
      <FormElement className="border-none py-4">
        <motion.div
          className={`flex items-center gap-1 rounded-full ${bgColor} cursor-pointer overflow-hidden px-2 py-1`}
          onClick={handleStatusClick}
          layout
          style={{
            width:
              statusText === 'Abonements aktīvs'
                ? '190px'
                : statusText === 'Abonements beidzies'
                  ? '200px'
                  : statusColor === 'text-amber-400'
                    ? '200px'
                    : '180px', // Fixed widths for the two states
            transition: 'width 0.3s ease-in-out',
          }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 500, damping: 30 }}
        >
          <FaCircle className={statusColor} />
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
        <FaPlus className="text-xl" />
      </FormElement>
    </>
  );
};

export default MembershipStatus;
