'use client';
import { useEffect, useState } from 'react';

import { LuTrash2, LuCopy, LuCopyCheck, LuCalendarPlus, LuCheck, LuX } from 'react-icons/lu';

const ReservationActions = ({ appointment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState(
    appointment.status?.startsWith('cancelled-') ? appointment.status.slice(10) : '',
  );
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const deleteReservation = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/appointments/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: appointment.id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Failed to delete reservation:', errorData);
      } else {
        const data = await res.json();
        if (data.coupon) {
          setCoupon(data.coupon);
        }
      }
    } catch (error) {
      console.error('Network error when deleting reservation:', error);
    } finally {
      setLoading(false);
    }
  };

  return coupon ? (
    <button
      className="flex gap-2 rounded-lg p-2 transition-all hover:bg-white hover:bg-opacity-5"
      onClick={handleCopy}
    >
      {copied ? (
        <LuCopyCheck className="h-6 w-6 text-emerald-500" />
      ) : (
        <LuCopy className="h-6 w-6" />
      )}
      <span className={`font-medium ${copied && 'text-emerald-500'}`}>{coupon}</span>
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
            disabled={loading}
            className={`flex items-center justify-center rounded-lg p-2 transition-all ${!loading && 'hover:bg-white hover:bg-opacity-5'}`}
            onClick={deleteReservation}
          >
            {loading ? (
              <span className="loading loading-xs ml-1"></span>
            ) : (
              <LuCheck className="text-2xl" />
            )}
          </button>
          <button
            disabled={loading}
            onClick={() => setIsOpen(false)}
            className={`rounded-lg p-2 text-accent transition-all ${!loading && 'hover:bg-white hover:bg-opacity-5'}`}
          >
            <LuX className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationActions;
