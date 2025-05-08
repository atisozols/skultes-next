'use client';

import { useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import { FaCheck } from 'react-icons/fa';
import { TbCoinEuro } from 'react-icons/tb';
import { TiStarOutline } from 'react-icons/ti';

const MEMBERSHIP_OPTIONS = [
  {
    id: 'week',
    label: '7 dienas',
    price: '€25.00',
    description: 'Brīvība treniņiem visas nedēļas garumā',
    icon: false,
  },
  {
    id: 'month',
    label: '30 dienas',
    price: '€59.00',
    description: 'Mēnesis pilns treniņiem – vispopulārākais',
    icon: true,
  },
  {
    id: 'year',
    label: '365 dienas',
    price: '€590.00',
    description: 'Gads bez ierobežojumiem, par labāko cenu',
    icon: true,
  },
];

const ExtendMembership = () => {
  const [selectedOption, setSelectedOption] = useState('month');
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  const handlePayment = async () => {
    if (!selectedOption) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/membership`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
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

  return (
    <Section className={'mt-3'}>
      <div className="relative">
        <div className="absolute -top-3.5 left-0 right-0 z-10 flex justify-center">
          <div className="bg-background px-4 text-xl font-light text-accent">PRO PLĀNS</div>
        </div>
        <div className="rounded-2xl border-[0.5px] border-accent bg-background p-4">
          <div className="flex flex-col gap-4">
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
                      selectedOption === option.id ? 'border-accent bg-accent' : 'border-alternate'
                    }`}
                  >
                    {selectedOption === option.id && <FaCheck className="text-xs text-container" />}
                  </div>
                </div>
                <div className="font-medium text-white">{option.label}</div>
                <div className="mb-2 text-lg font-light text-white">{option.price}</div>
                <div className="flex items-center text-xs">
                  {option.icon ? (
                    <>
                      {option.id === 'month' ? (
                        <TiStarOutline className="mr-1 text-sm text-accent" />
                      ) : (
                        <TbCoinEuro className="mr-1 text-sm text-accent" />
                      )}
                      <span className="text-accent">{option.description}</span>
                    </>
                  ) : (
                    <span className="text-alternate">{option.description}</span>
                  )}
                </div>
              </Container>
            ))}
          </div>
        </div>
      </div>
      <button
        className="w-full cursor-pointer rounded-xl bg-accent py-3 font-light text-background transition-all"
        onClick={handlePayment}
        disabled={!selectedOption || isLoading}
      >
        {isLoading
          ? 'Apstrādā...'
          : `Turpināt uz apmaksu - ${MEMBERSHIP_OPTIONS.find((opt) => opt.id === selectedOption)?.price || ''}`}
      </button>
    </Section>
  );
};

export default ExtendMembership;
