'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { findClosestSlot } from '../../utils/book/findClosestSlot';
import timeSlots from '../../utils/book/timeSlots';
import availableSlotsForEachDuration from '../../utils/book/availableSlotsForEachDuration';
import getCurrentDateInRiga from '../../utils/book/getCurrentDateInRiga';
import { useCart } from '../cart/CartContext';
import CardTitle from '../ui/CardTitle';
import Card from '../ui/Card';

const ReservationForm = ({ availability }) => {
  const { cart, addToCart } = useCart();
  const [name, setName] = useState('Atis Ozols');
  const [phone, setPhone] = useState('27804609');
  const [date, setDate] = useState(getCurrentDateInRiga());
  const [duration, setDuration] = useState(3);
  const [time, setTime] = useState('');

  const memoizedSlotsForDuration = useMemo(() => {
    return availableSlotsForEachDuration(cart, availability, date, timeSlots);
  }, [cart, availability, date]);

  const memoizedAvailableDurations = useMemo(() => {
    return Object.keys(memoizedSlotsForDuration)
      .filter((dur) => memoizedSlotsForDuration[dur].length > 0)
      .map(Number);
  }, [memoizedSlotsForDuration]);

  useEffect(() => {
    if (memoizedAvailableDurations.length === 0) {
      setTime('');
      return;
    }

    if (!memoizedAvailableDurations.includes(duration)) {
      const newDuration = memoizedAvailableDurations[0];
      setDuration(newDuration);
      setTime(memoizedSlotsForDuration[newDuration][0]);
      return;
    }

    if (memoizedSlotsForDuration[duration] && !memoizedSlotsForDuration[duration].includes(time)) {
      const availableTimes = memoizedSlotsForDuration[duration];
      if (availableTimes.length > 0) {
        const newTime = time ? findClosestSlot(availableTimes, time) : availableTimes[0];
        setTime(newTime);
      } else {
        setTime('');
      }
    }
  }, [memoizedAvailableDurations, memoizedSlotsForDuration, duration, time]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value);
    setDuration(newDuration);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !time || !duration) {
      return;
    }

    const timeIndex = parseInt(Object.keys(timeSlots).find((key) => timeSlots[key] === time));
    const appointment = {
      name,
      phone,
      date,
      start_index: timeIndex,
      end_index: timeIndex + duration,
    };

    addToCart(appointment);
  };

  return (
    <Card>
      <form
        className="grid w-full grid-cols-1 justify-items-center gap-5 text-lg"
        onSubmit={handleSubmit}
      >
        <CardTitle>Rezervēt laiku</CardTitle>

        {/* <div className="flex w-full max-w-sm flex-col justify-between sm:max-w-md">
          <label htmlFor="name">Vārds, uzvārds</label>
          <input
            type="text"
            name="name"
            className="rounded-md bg-zinc-100 p-1 px-3  dark:bg-zinc-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex w-full max-w-sm flex-col justify-between sm:max-w-md">
          <label htmlFor="phone">Telefona numurs</label>
          <input
            type="tel"
            name="phone"
            className="rounded-md bg-zinc-100 p-1 px-3  dark:bg-zinc-800"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div> */}

        <div className="flex w-full max-w-md flex-col justify-between sm:max-w-lg">
          <label htmlFor="date">Datums</label>
          <input
            type="date"
            name="date"
            min={getCurrentDateInRiga()}
            className="w-full rounded-md bg-zinc-100 p-1 px-3 dark:bg-zinc-800"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        <div className="flex w-full max-w-md items-center justify-between gap-3 sm:max-w-lg">
          <div className="flex w-1/2 flex-col justify-between">
            <label htmlFor="time">Laiks</label>
            {memoizedAvailableDurations.includes(duration) &&
            memoizedSlotsForDuration[duration]?.length > 0 ? (
              <select
                name="time"
                className="rounded-md bg-zinc-100 p-1 px-3 dark:bg-zinc-800"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {memoizedSlotsForDuration[duration].map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="time"
                className="rounded-md bg-zinc-100 p-1 px-3 dark:bg-zinc-800"
                value="x"
                disabled
              >
                <option value="x">Visi laiki ir aizņemti</option>
              </select>
            )}
          </div>

          {/* Duration Field */}
          <div className="flex w-1/2 flex-col justify-between">
            <label htmlFor="duration">Ilgums</label>
            {memoizedAvailableDurations.length > 0 ? (
              <select
                name="duration"
                className="rounded-md bg-zinc-100 p-1 px-3 dark:bg-zinc-800"
                value={duration}
                onChange={handleDurationChange}
              >
                {memoizedAvailableDurations.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur * 15} min
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="duration"
                className="rounded-md bg-zinc-100 p-1 px-3 dark:bg-zinc-800"
                value="x"
                disabled
              >
                <option value="x">Aizņemts</option>
              </select>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full max-w-sm rounded-md bg-zinc-100 p-2 px-3 text-base shadow-lg transition-all hover:opacity-90 sm:max-w-md dark:bg-zinc-800 dark:text-white"
        >
          Pievienot grozam
        </button>
      </form>
    </Card>
  );
};

export default ReservationForm;
