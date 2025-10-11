'use client';
import { useState, useEffect } from 'react';
import {
  useCancelAppointmentMutation,
  useUnlockDoorMutation,
} from '@/hooks/queries/useAppointments';
import { LuTrash2, LuCopy, LuCopyCheck, LuCalendarPlus, LuCheck, LuX } from 'react-icons/lu';
import { TbLock, TbLockOpen } from 'react-icons/tb';
import Loader from '@/components/ui/Loader';

const ReservationActions = ({ appointment }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPinOpen, setIsPinOpen] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockSuccess, setUnlockSuccess] = useState(false);
  const [timeUntilUnlock, setTimeUntilUnlock] = useState('');
  const [coupon, setCoupon] = useState(
    appointment.status?.startsWith('cancelled-') ? appointment.status.slice(10) : '',
  );
  const [copied, setCopied] = useState(false);

  const { mutate: cancelAppointment, isPending } = useCancelAppointmentMutation();
  const { mutate: unlockDoor, isPending: isUnlockPending } = useUnlockDoorMutation();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleCancel = () => {
    if (isPending) return;

    cancelAppointment(appointment.id, {
      onSuccess: (response) => {
        if (response?.coupon) {
          setCoupon(response.coupon);
        }
        setIsDeleteOpen(false);
      },
      onError: (error) => {
        console.error('Failed to cancel appointment:', error);
      },
      onSettled: () => {
        // Any cleanup after success or error
      },
    });
  };

  // Helper function to check if appointment is currently unlockable
  const checkIsUnlockable = () => {
    console.log('Running checkIsUnlockable...');
    console.log('Appointment data:', {
      date: appointment.date,
      start: appointment.start,
      end: appointment.end,
    });

    if (!appointment.date || !appointment.start || !appointment.end) {
      console.log('Missing required appointment data, returning false');
      return false;
    }

    const now = new Date();
    console.log('Current time:', now);

    // Get appointment start and end times
    // Parse date from DD.MM.YYYY format
    const [day, month, year] = appointment.date.split('.');

    // Ensure all parts are valid numbers
    if (
      !day ||
      !month ||
      !year ||
      isNaN(parseInt(day)) ||
      isNaN(parseInt(month)) ||
      isNaN(parseInt(year))
    ) {
      console.log('Invalid date format:', appointment.date);
      return false;
    }

    const appointmentDate = new Date(parseInt(year), parseInt(month, 10) - 1, parseInt(day)); // month is 0-indexed in JS Date
    console.log('Appointment date (after parsing DD.MM.YYYY):', appointmentDate);

    const [startHours, startMinutes] = appointment.start.split(':').map((num) => parseInt(num, 10));
    const [endHours, endMinutes] = appointment.end.split(':').map((num) => parseInt(num, 10));
    console.log('Parsed time values:', { startHours, startMinutes, endHours, endMinutes });

    if (isNaN(startHours) || isNaN(startMinutes) || isNaN(endHours) || isNaN(endMinutes)) {
      console.log('Invalid time format, returning false');
      return false;
    }

    // Calculate 5 minutes before start time
    const startTime = new Date(appointmentDate);
    startTime.setHours(startHours, startMinutes, 0);
    const fiveMinBeforeStart = new Date(startTime);
    fiveMinBeforeStart.setMinutes(startTime.getMinutes() - 5);
    console.log('Start time:', startTime);
    console.log('5 min before start:', fiveMinBeforeStart);

    // Calculate end time
    const endTime = new Date(appointmentDate);
    endTime.setHours(endHours, endMinutes, 0);
    console.log('End time:', endTime);

    // Check if current time is between 5 min before start and end
    const isUnlockable = now >= fiveMinBeforeStart && now <= endTime;
    console.log(
      'Is unlockable:',
      isUnlockable,
      '(now >= fiveMinBeforeStart:',
      now >= fiveMinBeforeStart,
      ', now <= endTime:',
      now <= endTime,
      ')',
    );
    return isUnlockable;
  };

  // Calculate time until unlock is available if not already unlockable
  useEffect(() => {
    if (!appointment.unlockable && appointment.date && appointment.start) {
      const calculateTimeUntilUnlock = () => {
        try {
          // Parse date from DD.MM.YYYY format
          const [day, month, year] = appointment.date.split('.');
          // Ensure all parts are valid numbers
          if (
            !day ||
            !month ||
            !year ||
            isNaN(parseInt(day)) ||
            isNaN(parseInt(month)) ||
            isNaN(parseInt(year))
          ) {
            console.log('Invalid date format:', appointment.date);
            setTimeUntilUnlock('--:--');
            return;
          }

          const appointmentDate = new Date(parseInt(year), parseInt(month, 10) - 1, parseInt(day)); // month is 0-indexed in JS Date
          console.log('Timer - parsed appointment date:', appointmentDate);

          const [hours, minutes] = appointment.start.split(':').map((num) => parseInt(num, 10));

          if (isNaN(hours) || isNaN(minutes)) {
            console.log('Invalid time format:', appointment.start);
            setTimeUntilUnlock('--:--');
            return;
          }

          appointmentDate.setHours(hours, minutes - 5, 0); // 5 min before start

          const now = new Date();
          const diffMs = appointmentDate - now;

          if (diffMs <= 0) {
            setTimeUntilUnlock('00:00');
            return;
          }

          const diffMins = Math.floor(diffMs / 60000);
          const diffSecs = Math.floor((diffMs % 60000) / 1000);

          setTimeUntilUnlock(
            `${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`,
          );
        } catch (error) {
          console.error('Error calculating time until unlock:', error);
          setTimeUntilUnlock('--:--');
        }
      };

      calculateTimeUntilUnlock();
      const timer = setInterval(calculateTimeUntilUnlock, 1000);

      return () => clearInterval(timer);
    }
  }, [appointment]);

  const togglePinDisplay = () => {
    // Close delete dialog if open
    if (isDeleteOpen) setIsDeleteOpen(false);
    setIsPinOpen(!isPinOpen);
  };

  const handlePinButtonClick = () => {
    if (isDeleteOpen) setIsDeleteOpen(false);

    // Check if the appointment is currently unlockable based on frontend time
    const isCurrentlyUnlockable = checkIsUnlockable();

    // If the appointment is unlockable, unlock the door
    if (isCurrentlyUnlockable) {
      if (isUnlockPending) return;
      setIsUnlocking(true);

      unlockDoor(appointment.id, {
        onSuccess: () => {
          setUnlockSuccess(true);
          setTimeout(() => {
            setUnlockSuccess(false);
            setIsUnlocking(false);
          }, 3000);
        },
        onError: (error) => {
          console.error('Failed to unlock door:', error);
          setIsUnlocking(false);
        },
      });
    } else {
      // Otherwise, show PIN code overlay
      setIsPinOpen(!isPinOpen);
    }
  };

  const openDeleteConfirmation = () => {
    if (isPinOpen) setIsPinOpen(false);
    setIsDeleteOpen(true);
  };

  const handleOutsideClick = (e) => {
    if (isPinOpen) {
      if (!e.target.closest('.pin-button')) {
        setIsPinOpen(false);
      }
    }
  };

  return coupon ? (
    <button
      className="flex gap-2 rounded-lg p-2 transition-all hover:bg-white hover:bg-opacity-5"
      onClick={handleCopy}
    >
      {copied ? <LuCopyCheck className="h-6 w-6 text-green-400" /> : <LuCopy className="h-6 w-6" />}
      <span className={`font-medium ${copied && 'text-green-400'}`}>{coupon}</span>
    </button>
  ) : (
    <div className="relative overflow-x-hidden" onClick={handleOutsideClick}>
      {/* Row with all three buttons */}
      <div className="flex items-center gap-2">
        {/* Combined PIN code/unlock button - always visible */}
        {appointment.entryCode && (
          <button
            onClick={handlePinButtonClick}
            className={`pin-button rounded-lg p-1.5 transition-all ${unlockSuccess ? 'bg-green-500 bg-opacity-20' : 'action:bg-white action:bg-opacity-5'}`}
          >
            {isUnlocking ? (
              <Loader size={24} />
            ) : unlockSuccess ? (
              <TbLockOpen className="text-3xl text-green-400" />
            ) : (
              <TbLock className="text-3xl" />
            )}
          </button>
        )}

        {/* Calendar and Delete buttons - hidden when overlays are active */}
        <div
          className={`flex items-center gap-2 transition-opacity duration-200 ${isPinOpen || isDeleteOpen ? 'pointer-events-none opacity-10' : 'opacity-100'}`}
        >
          <a
            href={appointment.add_to_calendar}
            className="action:bg-white action:bg-opacity-5 rounded-lg p-2 transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuCalendarPlus className="text-2xl" />
          </a>
          <button
            onClick={openDeleteConfirmation}
            disabled={!appointment.cancellable}
            className={`action:bg-white action:bg-opacity-5 rounded-lg p-2 transition-all ${
              !appointment.cancellable ? 'text-alternate' : 'text-accent'
            }`}
          >
            <LuTrash2 className="text-2xl" />
          </button>
        </div>
      </div>

      {/* PIN code overlay */}
      <div
        className={`absolute inset-y-0 right-0 transform transition-transform duration-200 ${
          isPinOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full items-center bg-container pl-4 pr-3">
          {!checkIsUnlockable() && timeUntilUnlock ? (
            <span className="px-0.5 text-2xl font-light">{timeUntilUnlock}</span>
          ) : (
            <span className="px-0.5 text-3xl font-light">1111#</span>
          )}
        </div>
      </div>

      {/* Delete confirmation overlay */}
      <div
        className={`absolute inset-y-0 right-0 transform transition-transform duration-200 ${
          isDeleteOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: isDeleteOpen ? 10 : 0 }}
      >
        <div className="flex items-center justify-between gap-2 bg-container">
          <button
            disabled={isPending}
            className={`flex items-center justify-center rounded-lg p-2 transition-all ${!isPending && 'hover:bg-white hover:bg-opacity-5'}`}
            onClick={handleCancel}
          >
            {isPending ? <Loader /> : <LuCheck className="text-2xl" />}
          </button>
          <button
            disabled={isPending}
            onClick={() => setIsDeleteOpen(false)}
            className={`rounded-lg p-2 text-accent transition-all ${!isPending && 'hover:bg-white hover:bg-opacity-5'}`}
          >
            <LuX className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationActions;
