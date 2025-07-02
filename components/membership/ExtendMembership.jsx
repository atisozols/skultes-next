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
import { useUser } from '@/hooks/queries';

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
  }, [isOpen, parentContainerRef]);

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
        console.error('Server error response:', errorData);
        console.error('Status code:', response.status);
        alert(`Error: ${errorData.error || response.statusText}. Check console for details.`);
        throw new Error(`Failed to create checkout session: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();

      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert('Kļūda, mēģiniet vēlreiz!');
    } finally {
      setIsLoading(false);
    }
  };

  const applyDiscount = (price) => {
    if (userData.discount) {
      return price - price * (userData.discount / 100);
    }
    return price;
  };

  const calculateFutureDate = (timeValue) => {
    if (!userData?.bestBefore) return null;

    const currentBestBefore = new Date(userData.bestBefore);
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
              transition={{ duration: 0.3 }}
            >
              <div ref={contentRef} className="px-3.5">
                <div className="flex flex-col gap-3.5">
                  {MEMBERSHIP_OPTIONS.map((option) => (
                    <Container
                      key={option.id}
                      onClick={() => handleOptionClick(option.id)}
                      className={`cursor-pointer px-3.5 py-3 transition-all ${
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
                          Līdz{' '}
                          {userData?.bestBefore && formatDate(calculateFutureDate(option.time))}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button that serves as both toggle and payment button */}
        {isOpen && (
          <div className="flex w-full items-center justify-center px-3.5 py-4">
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
        )}
      </div>
    </>
  );
};

export default ExtendMembership;
