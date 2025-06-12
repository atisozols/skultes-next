'use client';

import { useState, useRef, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { TbCoinEuro } from 'react-icons/tb';
import { TiStarOutline } from 'react-icons/ti';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';
import MembershipStatus from './MembershipStatus';
import { Button } from '../ui/Button';
import { useAuth } from '@clerk/nextjs';

const MEMBERSHIP_OPTIONS = [
  {
    id: 'day',
    label: '24 stundas',
    price: '€10.00',
    description: 'Ideāli, lai izmēģinātu lielo zāli',
    icon: false,
  },
  {
    id: 'month',
    label: 'Mēnesis',
    price: '€59.00',
    description: 'Mēneša abonements',
    icon: true,
  },
  {
    id: 'year',
    label: 'Gads',
    price: '€590.00',
    description: 'Gada abonements par labāko cenu',
    icon: true,
  },
];

const ExtendMembership = ({ containerRef: parentContainerRef }) => {
  const { getToken } = useAuth();
  const [selectedOption, setSelectedOption] = useState('month');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
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

      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert('Kļūda, mēģiniet vēlreiz!');
    } finally {
      setIsLoading(false);
    }
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
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            selectedOption === option.id
                              ? 'border-accent bg-accent'
                              : 'border-alternate'
                          }`}
                        >
                          {selectedOption === option.id && (
                            <FaCheck className="text-xs text-container" />
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-white">{option.label}</div>
                      <div className="mb-1 font-light text-white">{option.price}</div>
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
              size="sm"
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
