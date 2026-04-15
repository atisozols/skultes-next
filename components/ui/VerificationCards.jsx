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

  return format(parsedDate, 'dd.MM.yyyy');
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
          <p className="text-white/88 flex justify-between text-center text-xs font-normal tracking-[0.08em]">
            {secondary.label}{' '}
            <span className="font-semibold tabular-nums text-white">{secondary.value}</span>
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
        colorClass: 'bg-[var(--success-surface)] border-[var(--success-border)]',
        icon: <LuCircleCheck className="shrink-0 text-2xl text-success sm:text-3xl" />,
        label: 'Konts verificēts',
        tappable: false,
        loaderClass: 'text-success',
      };
    case 'pending':
      return {
        colorClass: 'bg-[var(--warning-surface)] border-[var(--warning-border)]',
        icon: <LuClock className="shrink-0 text-2xl text-warning sm:text-3xl" />,
        label: 'Notiek pārbaude',
        tappable: false,
        loaderClass: 'text-warning',
      };
    case 'rejected':
      return {
        colorClass: 'bg-[var(--error-surface)] border-[var(--error-border)]',
        icon: <LuCircleX className="shrink-0 text-2xl text-error sm:text-3xl" />,
        label: 'Verifikācija neveiksmīga',
        tappable: true,
        loaderClass: 'text-error',
      };
    case 'missing':
    default:
      return {
        colorClass: 'bg-[var(--error-surface)] border-[var(--error-border)]',
        icon: <LuCamera className="shrink-0 text-2xl text-error sm:text-3xl" />,
        label: 'Verificē sevi',
        tappable: true,
        loaderClass: 'text-error',
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
          colorClass: 'bg-[var(--error-elevated)] border-[var(--error-border)]',
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
      colorClass: 'bg-[var(--success-surface)] border-[var(--success-border)]',
      icon: <LuPercent className="shrink-0 text-2xl text-success sm:text-3xl" />,
      label: 'Atlaide aktīva',
      tappable: false,
      loaderClass: 'text-success',
    };
  }

  if (status === 'pending') {
    return {
      colorClass: 'bg-[var(--warning-surface)] border-[var(--warning-border)]',
      icon: <LuClock className="shrink-0 text-2xl text-warning sm:text-3xl" />,
      label: 'Notiek pārbaude',
      tappable: false,
      loaderClass: 'text-warning',
    };
  }

  if (status === 'rejected') {
    return {
      colorClass: 'bg-[var(--error-surface)] border-[var(--error-border)]',
      icon: <LuCircleX className="shrink-0 text-2xl text-error sm:text-3xl" />,
      label: 'Pārbaude neveiksmīga',
      tappable: true,
      loaderClass: 'text-error',
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
          colorClass: 'bg-[var(--success-elevated)] border-[var(--success-border)]',
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
