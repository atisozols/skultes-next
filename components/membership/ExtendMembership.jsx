'use client';

import { useState, useRef, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { TbCoinEuro } from 'react-icons/tb';
import { TiStarOutline } from 'react-icons/ti';
import { format, addDays, addMonths, addYears } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';
import MembershipStatus from './MembershipStatus';
import { Button } from '../ui/Button';
import { useAuth } from '@clerk/nextjs';
import { useUser } from '@/hooks/queries/useUser';
import PhotoUploadModal from '../ui/PhotoUploadModal';
import { LuCamera } from 'react-icons/lu';

const MEMBERSHIP_OPTIONS = [
  {
    id: 'day',
    label: '24 stundas',
    price: 10.0,
    description: 'Ideāli, lai izmēģinātu lielo zāli vienu vai divas reizes',
    icon: false,
    time: '1 day',
  },
  {
    id: 'month',
    label: 'Mēnesis',
    price: 59.0,
    description: 'Mēneša abonements neierobežotam apmeklējumam',
    icon: true,
    time: '1 month',
  },
  {
    id: 'year',
    label: 'Gads',
    price: 590.0,
    description: 'Gada abonements par labāko cenu',
    icon: true,
    time: '1 year',
  },
];

const ExtendMembership = ({ containerRef: parentContainerRef }) => {
  const { data: userData } = useUser();
  const { getToken } = useAuth();
  const [selectedOption, setSelectedOption] = useState('month');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    if (userData) {
      if (!userData.isMember) {
        setIsOpen(true);
      }
    }
  }, [userData]);

  const contentRef = useRef(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, parentContainerRef, checkoutError]);

  // Add click outside listener to close the collapse
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        parentContainerRef?.current &&
        !parentContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener when the collapse is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, parentContainerRef]);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleButtonClick = () => {
    if (isOpen) {
      // When open, the button functions as a payment button
      handlePayment();
    } else {
      // When closed, the button opens the collapse
      setIsOpen(true);
    }
  };

  const handlePayment = async () => {
    if (!selectedOption) {
      console.error('Please select a membership option');
      return;
    }

    try {
      setIsLoading(true);
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/membership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ period: selectedOption }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = errorData.error || errorData.msg || '';
        if (response.status === 403 && msg.toLowerCase().includes('photo verification')) {
          setCheckoutError('verification');
          setIsLoading(false);
          return;
        }
        setCheckoutError('generic');
        throw new Error(`Failed to create checkout session: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();

      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyDiscount = (price) => {
    const hasActiveDiscount =
      userData?.discountUntil && new Date(userData.discountUntil) > new Date();
    return hasActiveDiscount ? price - price * 0.4 : price;
  };

  const calculateFutureDate = (timeValue) => {
    const now = new Date();
    const hasBestBefore = Boolean(userData?.bestBefore);
    const userBestBefore = hasBestBefore ? new Date(userData.bestBefore) : null;
    const currentBestBefore =
      userBestBefore && userBestBefore > now ? userBestBefore : now;

    const [amount, unit] = timeValue.split(' ');

    switch (unit) {
      case 'day':
      case 'days':
        return addDays(currentBestBefore, parseInt(amount, 10));
      case 'month':
      case 'months':
        return addMonths(currentBestBefore, parseInt(amount, 10));
      case 'year':
      case 'years':
        return addYears(currentBestBefore, parseInt(amount, 10));
      default:
        return currentBestBefore;
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return format(date, 'dd.MM.yyyy');
  };

  return (
    <>
      <MembershipStatus isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="membership-options"
              style={{ overflow: 'hidden' }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: measuredHeight, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div ref={contentRef} className="px-3.5 py-2">
                <div className="flex flex-col gap-3.5">
                  {MEMBERSHIP_OPTIONS.map((option) => (
                    <Container
                      key={option.id}
                      onClick={() => handleOptionClick(option.id)}
                      className={`cursor-pointer px-3 py-3 transition-all ${
                        selectedOption === option.id
                          ? 'border-[1px] border-accent'
                          : 'border-[1px] border-alternate'
                      }`}
                    >
                      <div className="absolute right-3.5 top-3">
                        <span
                          className={`rounded px-2 py-1 text-xs ${
                            selectedOption === option.id
                              ? 'bg-accent text-container'
                              : 'bg-alternate text-container'
                          }`}
                        >
                          Līdz {formatDate(calculateFutureDate(option.time))}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-white">{option.label}</div>
                      <div className="mb-1 font-light text-white">
                        €{applyDiscount(option.price).toFixed(2)}
                      </div>
                      <div className="flex items-center text-xs">
                        {option.icon ? (
                          <>
                            {option.id === 'month' ? (
                              <TiStarOutline className="mr-1 text-sm text-accent" />
                            ) : (
                              <TbCoinEuro className="mr-1 text-sm text-accent" />
                            )}
                            <span className="text-alternate">{option.description}</span>
                          </>
                        ) : (
                          <span className="text-alternate">{option.description}</span>
                        )}
                      </div>
                    </Container>
                  ))}
                </div>

                {/* Checkout error banners */}
                {checkoutError === 'verification' && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl bg-red-950/60 px-3.5 py-3">
                    <LuCamera className="shrink-0 text-lg text-red-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-200">
                        Nepieciešama foto verifikācija
                      </p>
                      <p className="mt-0.5 text-xs text-red-300/70">
                        Pirms pirkuma jāaugšupielādē foto.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPhotoModal(true)}
                      className="shrink-0 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-200 transition-colors active:bg-red-500/30"
                    >
                      Augšupielādēt
                    </button>
                  </div>
                )}
                {checkoutError === 'generic' && (
                  <p className="mt-3 text-center text-sm text-red-400">Kļūda, mēģiniet vēlreiz!</p>
                )}

                {/* Payment button */}
                <div className="flex w-full items-center justify-center pt-3.5">
                  <Button
                    variant="default"
                    className="w-full font-medium uppercase"
                    onClick={handleButtonClick}
                    disabled={isLoading}
                    loading={isLoading}
                    withArrow
                  >
                    Apmaksāt
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showPhotoModal && (
        <PhotoUploadModal
          onClose={() => {
            setShowPhotoModal(false);
            setCheckoutError(null);
          }}
        />
      )}
    </>
  );
};

export default ExtendMembership;
