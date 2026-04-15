'use client';

import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { usePhotoVerification } from '@/hooks/queries/usePhotoVerification';
import { useDiscountVerification } from '@/hooks/queries/useDiscountVerification';
import PhotoUploadModal from './PhotoUploadModal';
import DiscountDocumentModal from './DiscountDocumentModal';
import Loader from './Loader';
import { LuCircleCheck, LuClock, LuCircleX, LuCamera, LuPercent } from 'react-icons/lu';

const WRAPPER_BASE = 'relative flex-1';
const MAIN_CARD_BASE =
  'dark-surface-lock relative z-10 flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all';
const SECONDARY_CARD_BASE =
  'dark-surface-lock pointer-events-none absolute left-0 right-0 bottom-2 z-0 rounded-b-xl border px-2 pb-1.5 pt-5';

function formatDateLabel(dateValue) {
  if (!dateValue) return null;

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return format(parsedDate, 'MM.dd.yyyy');
}

function getPhotoGraceDeadline(gracePeriodStartedAt) {
  if (!gracePeriodStartedAt) return null;
  return addDays(new Date(gracePeriodStartedAt), 7);
}

function StatusStackCard({
  colorClass,
  icon,
  label,
  secondary,
  tappable,
  disabled,
  loading,
  loaderClass = 'text-white',
  onClick,
}) {
  return (
    <div className={`${WRAPPER_BASE} ${secondary ? 'pb-9' : ''}`}>
      {secondary ? (
        <div className={`${SECONDARY_CARD_BASE} ${secondary.colorClass}`}>
          <p className="text-white/88 flex justify-between text-center text-xs font-semibold">
            {secondary.label} <span className="tabular-nums text-white">{secondary.value}</span>
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`${MAIN_CARD_BASE} ${colorClass} ${
          tappable ? 'cursor-pointer active:opacity-70' : 'cursor-default'
        }`}
      >
        {loading ? (
          <Loader size="text-lg" className={loaderClass} />
        ) : (
          <>
            {icon}
            <span className="text-xs font-semibold leading-snug text-white">{label}</span>
          </>
        )}
      </button>
    </div>
  );
}

const photoConfig = (status) => {
  switch (status) {
    case 'approved':
      return {
        colorClass: 'bg-green-950 border-green-800',
        icon: <LuCircleCheck className="shrink-0 text-2xl text-green-400 sm:text-3xl" />,
        label: 'Konts verificēts',
        tappable: false,
        loaderClass: 'text-green-300',
      };
    case 'pending':
      return {
        colorClass: 'bg-yellow-950 border-yellow-800',
        icon: <LuClock className="shrink-0 text-2xl text-yellow-400 sm:text-3xl" />,
        label: 'Notiek pārbaude',
        tappable: false,
        loaderClass: 'text-yellow-300',
      };
    case 'rejected':
      return {
        colorClass: 'bg-red-950 border-red-800',
        icon: <LuCircleX className="shrink-0 text-2xl text-red-400 sm:text-3xl" />,
        label: 'Verifikācija neveiksmīga',
        tappable: true,
        loaderClass: 'text-red-300',
      };
    case 'missing':
    default:
      return {
        colorClass: 'bg-red-950 border-red-800',
        icon: <LuCamera className="shrink-0 text-2xl text-red-400 sm:text-3xl" />,
        label: 'Verificē sevi',
        tappable: true,
        loaderClass: 'text-red-300',
      };
  }
};

const PhotoCard = () => {
  const { data, isLoading } = usePhotoVerification();
  const [showModal, setShowModal] = useState(false);

  const status = data?.data?.status ?? 'missing';
  const rejectionReason = data?.data?.rejectionReason ?? null;
  const graceDeadline = getPhotoGraceDeadline(data?.data?.gracePeriodStartedAt);
  const graceDeadlineLabel = formatDateLabel(graceDeadline);
  const config = photoConfig(status);

  const secondaryCard =
    status === 'missing' && graceDeadlineLabel
      ? {
          label: 'Līdz',
          value: graceDeadlineLabel,
          colorClass: 'bg-red-900 border-red-800',
        }
      : null;

  return (
    <>
      <StatusStackCard
        colorClass={config.colorClass}
        icon={config.icon}
        label={config.label}
        secondary={secondaryCard}
        tappable={config.tappable}
        disabled={!config.tappable || isLoading}
        loading={isLoading}
        loaderClass={config.loaderClass}
        onClick={() => config.tappable && setShowModal(true)}
      />

      {showModal ? (
        <PhotoUploadModal onClose={() => setShowModal(false)} rejectionReason={rejectionReason} />
      ) : null}
    </>
  );
};

const discountConfig = (status, discountActive) => {
  if (discountActive) {
    return {
      colorClass: 'bg-green-950 border-green-800',
      icon: <LuPercent className="shrink-0 text-2xl text-green-400 sm:text-3xl" />,
      label: 'Atlaide aktīva',
      tappable: false,
      loaderClass: 'text-green-300',
    };
  }

  if (status === 'pending') {
    return {
      colorClass: 'bg-yellow-950 border-yellow-800',
      icon: <LuClock className="shrink-0 text-2xl text-yellow-400 sm:text-3xl" />,
      label: 'Notiek pārbaude',
      tappable: false,
      loaderClass: 'text-yellow-300',
    };
  }

  if (status === 'rejected') {
    return {
      colorClass: 'bg-red-950 border-red-800',
      icon: <LuCircleX className="shrink-0 text-2xl text-red-400 sm:text-3xl" />,
      label: 'Pārbaude neveiksmīga',
      tappable: true,
      loaderClass: 'text-red-300',
    };
  }

  return {
    colorClass: 'bg-zinc-900 border-zinc-800',
    icon: <LuPercent className="shrink-0 text-2xl text-zinc-300 sm:text-3xl" />,
    label: 'Saņemt atlaidi',
    tappable: true,
    loaderClass: 'text-zinc-300',
  };
};

const DiscountCard = () => {
  const { data, isLoading } = useDiscountVerification();
  const [showModal, setShowModal] = useState(false);

  const status = data?.data?.status ?? 'missing';
  const discountActive = data?.data?.discountActive ?? false;
  const discountUntil = data?.data?.discountUntil ?? null;
  const rejectionReason = data?.data?.rejectionReason ?? null;
  const config = discountConfig(status, discountActive);

  const secondaryCard =
    discountActive && discountUntil
      ? {
          label: 'Līdz',
          value: formatDateLabel(discountUntil),
          colorClass: 'bg-green-900 border-green-800',
        }
      : null;

  return (
    <>
      <StatusStackCard
        colorClass={config.colorClass}
        icon={config.icon}
        label={config.label}
        secondary={secondaryCard}
        tappable={config.tappable}
        disabled={!config.tappable || isLoading}
        loading={isLoading}
        loaderClass={config.loaderClass}
        onClick={() => config.tappable && setShowModal(true)}
      />

      {showModal ? (
        <DiscountDocumentModal
          onClose={() => setShowModal(false)}
          rejectionReason={rejectionReason}
        />
      ) : null}
    </>
  );
};

const VerificationCards = () => {
  return (
    <div className="dark-theme-lock flex w-full items-start gap-3 px-5 py-3.5">
      <PhotoCard />
      <DiscountCard />
    </div>
  );
};

export default VerificationCards;
