'use client';

import { useState, useEffect } from 'react';
import { usePhotoVerification } from '@/hooks/queries/usePhotoVerification';
import { useDiscountVerification } from '@/hooks/queries/useDiscountVerification';
import PhotoUploadModal from './PhotoUploadModal';
import DiscountDocumentModal from './DiscountDocumentModal';
import { LuCircleCheck, LuClock, LuCircleX, LuCamera, LuPercent } from 'react-icons/lu';

// ── Photo card ────────────────────────────────────────────────────────────────

const photoConfig = (status) => {
  switch (status) {
    case 'approved':
      return {
        color: 'bg-green-950/70 border-green-800/50',
        icon: <LuCircleCheck className="shrink-0 text-lg text-green-400" />,
        label: 'Konts verificēts',
        tappable: false,
      };
    case 'pending':
      return {
        color: 'bg-yellow-950/70 border-yellow-800/50',
        icon: <LuClock className="shrink-0 text-lg text-yellow-400" />,
        label: 'Notiek pārbaude',
        tappable: false,
      };
    case 'rejected':
      return {
        color: 'bg-red-950/70 border-red-800/50',
        icon: <LuCircleX className="shrink-0 text-lg text-red-400" />,
        label: 'Verifikācija neveiksmīga',
        tappable: true,
      };
    case 'missing':
    default:
      return {
        color: 'bg-red-950/70 border-red-800/50',
        icon: <LuCamera className="shrink-0 text-lg text-red-400" />,
        label: 'Nepieciešama verifikācija',
        tappable: true,
      };
  }
};

const PhotoCard = () => {
  const { data, isLoading } = usePhotoVerification();
  const [showModal, setShowModal] = useState(false);

  const status = data?.data?.status ?? 'missing';
  const rejectionReason = data?.data?.rejectionReason ?? null;
  const config = photoConfig(status);

  return (
    <>
      <button
        onClick={() => config.tappable && setShowModal(true)}
        disabled={!config.tappable || isLoading}
        className={`flex flex-1 items-center gap-2 rounded-2xl border px-3.5 py-3 text-left transition-opacity ${config.color} ${config.tappable ? 'cursor-pointer active:opacity-70' : 'cursor-default'}`}
      >
        {isLoading ? (
          <span className="loading loading-dots loading-xs" />
        ) : (
          <>
            {config.icon}
            <span className="text-xs font-semibold leading-snug">{config.label}</span>
          </>
        )}
      </button>

      {showModal && (
        <PhotoUploadModal onClose={() => setShowModal(false)} rejectionReason={rejectionReason} />
      )}
    </>
  );
};

// ── Discount card ─────────────────────────────────────────────────────────────

const discountConfig = (status, discountActive) => {
  if (status === 'pending') {
    return {
      color: 'bg-yellow-950/70 border-yellow-800/50',
      icon: <LuClock className="shrink-0 text-lg text-yellow-400" />,
      label: 'Notiek pārbaude',
      tappable: false,
    };
  }
  if (status === 'approved' && discountActive) {
    return {
      color: 'bg-green-950/70 border-green-800/50',
      icon: <LuPercent className="shrink-0 text-lg text-green-400" />,
      label: 'Atlaide aktīva',
      tappable: false,
    };
  }
  if (status === 'rejected') {
    return {
      color: 'bg-red-950/70 border-red-800/50',
      icon: <LuCircleX className="shrink-0 text-lg text-red-400" />,
      label: 'Pārbaude neveiksmīga',
      tappable: true,
    };
  }
  return {
    color: 'bg-base-200 border-base-300',
    icon: <LuPercent className="shrink-0 text-lg text-alternate" />,
    label: 'Saņemt atlaidi',
    tappable: true,
  };
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
};

const DiscountCard = () => {
  const { data, isLoading } = useDiscountVerification();
  const [showModal, setShowModal] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const status = data?.data?.status ?? 'missing';
  const discountActive = data?.data?.discountActive ?? false;
  const discountUntil = data?.data?.discountUntil ?? null;
  const rejectionReason = data?.data?.rejectionReason ?? null;
  const config = discountConfig(status, discountActive);

  const hasDate = discountActive && discountUntil;

  useEffect(() => {
    if (!hasDate) return;
    const interval = setInterval(() => setShowDate((v) => !v), 5000);
    return () => clearInterval(interval);
  }, [hasDate]);

  return (
    <>
      <button
        onClick={() => config.tappable && setShowModal(true)}
        disabled={!config.tappable || isLoading}
        className={`flex flex-1 items-center gap-2 rounded-2xl border px-3.5 py-3 text-left transition-opacity ${config.color} ${config.tappable ? 'cursor-pointer active:opacity-70' : 'cursor-default'}`}
      >
        {isLoading ? (
          <span className="loading loading-dots loading-xs" />
        ) : (
          <>
            {config.icon}
            <span className="relative text-xs font-semibold leading-snug">
              {hasDate ? (
                <>
                  <span
                    className={`transition-opacity duration-500 ${showDate ? 'opacity-0' : 'opacity-100'}`}
                  >
                    {config.label}
                  </span>
                  <span
                    className={`absolute inset-0 whitespace-nowrap transition-opacity duration-500 ${showDate ? 'opacity-100' : 'opacity-0'}`}
                  >
                    Līdz {formatDate(discountUntil)}
                  </span>
                </>
              ) : (
                config.label
              )}
            </span>
          </>
        )}
      </button>

      {showModal && (
        <DiscountDocumentModal
          onClose={() => setShowModal(false)}
          rejectionReason={rejectionReason}
        />
      )}
    </>
  );
};

// ── Container ─────────────────────────────────────────────────────────────────

const VerificationCards = () => {
  return (
    <div className="flex w-full gap-3 px-5 py-3.5">
      <PhotoCard />
      <DiscountCard />
    </div>
  );
};

export default VerificationCards;
