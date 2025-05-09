'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import countryCodes from '@/utils/countryCodes';

const RegistrationForm = () => {
  const router = useRouter();
  const defaultCountryCode =
    countryCodes.find((c) => c.code === 'LV')?.dial_code || countryCodes[0].dial_code;
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    agreement: false,
    countryCode: defaultCountryCode,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      setError('Nepieciešams apstiprināt piekrišanu privātuma politikai un lietošanas noteikumiem');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
        }),
      });
      if (!res.ok) {
        throw new Error('Reģistrācija neizdevās');
      }
      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || 'Kļūda reģistrācijas laikā');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-md gap-4">
      <div className="flex w-full flex-col">
        <label htmlFor="name" className="mb-1 text-left font-medium">
          Vārds
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-container p-2"
        />
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="surname" className="mb-1 text-left font-medium">
          Uzvārds
        </label>
        <input
          id="surname"
          name="surname"
          autoComplete="surname"
          type="text"
          value={formData.surname}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-container p-2"
        />
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="email" className="mb-1 text-left font-medium">
          E-pasts
        </label>
        <input
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-container p-2"
        />
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="phone" className="mb-1 text-left font-medium">
          Telefona numurs
        </label>
        <div className="flex w-full gap-2">
          <select
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="rounded-md bg-container p-2"
          >
            {countryCodes.map((cc) => (
              <option key={cc.code} value={cc.dial_code}>
                {cc.emoji} {cc.dial_code}
              </option>
            ))}
          </select>
          <input
            id="phone"
            name="phone"
            autoComplete="tel"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            className="flex-grow rounded-md bg-container p-2 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex w-full items-center">
        <input
          id="agreement"
          name="agreement"
          type="checkbox"
          checked={formData.agreement}
          onChange={handleChange}
          required
          className="mr-2 h-4 w-4"
        />
        <label htmlFor="agreement" className="text-sm">
          Es piekrītu{' '}
          <Link className="text-accent underline" href="/pp">
            privātuma politikai
          </Link>{' '}
          un{' '}
          <Link className="text-accent underline" href="/tc">
            lietošanas noteikumiem
          </Link>
        </label>
      </div>
      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        Apmaksāt - €9.95
      </Button>
    </form>
  );
};

export default RegistrationForm;
