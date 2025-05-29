'use client';
import { useState } from 'react';
import { useCancelAppointmentMutation } from '@/hooks/queries/useAppointments';
import { LuTrash2, LuCopy, LuCopyCheck, LuCalendarPlus, LuCheck, LuX } from 'react-icons/lu';
import Loader from '@/components/ui/Loader';

const ReservationActions = ({ appointment }) => {
  const [isOpen, setIsOpen] = useState(false);
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
        setIsOpen(false);
      },
      onError: (error) => {
        console.error('Failed to cancel appointment:', error);
        // You might want to show an error toast/message to the user here
      },
      onSettled: () => {
        // Any cleanup after success or error
      },
    });
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
    <div className="relative overflow-x-hidden">
      <div className="flex items-center gap-2">
        <a
          href={appointment.add_to_calendar}
          className="rounded-lg p-2 transition-all hover:bg-white hover:bg-opacity-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LuCalendarPlus className="text-2xl" />
        </a>
        <button
          onClick={() => setIsOpen(true)}
          disabled={!appointment.cancellable}
          className={`rounded-lg p-2 transition-all hover:bg-white hover:bg-opacity-5 ${
            !appointment.cancellable ? 'text-alternate' : 'text-accent'
          }`}
        >
          <LuTrash2 className="text-2xl" />
        </button>
      </div>

      <div
        className={`absolute inset-0 translate-x-0 transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
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
            onClick={() => setIsOpen(false)}
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
