'use client';
import { useState } from 'react';
import { useCancelAppointmentMutation } from '@/hooks/queries/useAppointments';
import { LuTrash2, LuCopy, LuCopyCheck, LuCalendarPlus, LuCheck, LuX } from 'react-icons/lu';
import { TbLockPassword } from 'react-icons/tb';
import Loader from '@/components/ui/Loader';

const ReservationActions = ({ appointment }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPinOpen, setIsPinOpen] = useState(false);
  const [coupon, setCoupon] = useState(
    appointment.status?.startsWith('cancelled-') ? appointment.status.slice(10) : '',
  );
  const [copied, setCopied] = useState(false);

  const { mutate: cancelAppointment, isPending } = useCancelAppointmentMutation();

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

  const togglePinDisplay = () => {
    // Close delete dialog if open
    if (isDeleteOpen) setIsDeleteOpen(false);
    setIsPinOpen(!isPinOpen);
  };

  const openDeleteConfirmation = () => {
    // Close pin display if open
    if (isPinOpen) setIsPinOpen(false);
    setIsDeleteOpen(true);
  };

  // Handle outside click for PIN display
  const handleOutsideClick = (e) => {
    if (isPinOpen) {
      // Only process if we're clicking outside the PIN button
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
        {/* PIN code button - always visible */}
        {appointment.entryCode && (
          <button
            onClick={togglePinDisplay}
            className="pin-button action:bg-white action:bg-opacity-5 rounded-lg p-1.5 transition-all"
          >
            <TbLockPassword className="text-3xl" />
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
          <span className="px-0.5 text-3xl font-light">{appointment.entryCode}</span>
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
