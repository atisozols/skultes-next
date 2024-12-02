'use client';
import React, { useState, useEffect } from 'react';
import { findClosestSlot } from '../../utils/book/findClosestSlot';
import timeSlots from '../../utils/book/timeSlots';
import availableSlotsForEachDuration from '../../utils/book/availableSlotsForEachDuration';
import getCurrentDateInRiga from '../../utils/book/getCurrentDateInRiga';
import durations from '../../utils/book/durations';
import { useCart } from '../cart/CartContext';

const ReservationForm = ({ availability }) => {
  const { cart, addToCart } = useCart();
  const [name, setName] = useState('Atis Ozols');
  const [phone, setPhone] = useState('27804609');
  const [date, setDate] = useState(getCurrentDateInRiga());
  const [duration, setDuration] = useState(3);
  const [time, setTime] = useState(
    availableSlotsForEachDuration(cart, availability, date, timeSlots)[duration][0],
  );
  const [availableTimeSlots, setAvailableTimeSlots] = useState(
    availableSlotsForEachDuration(cart, availability, date, timeSlots),
  );
  const [availableDurations, setAvailableDurations] = useState(durations);
  const [isDurationDisabled, setIsDurationDisabled] = useState(false);
  const [lastSelectedTime, setLastSelectedTime] = useState('');

  useEffect(() => {
    const slotsForDuration = availableSlotsForEachDuration(cart, availability, date, timeSlots);
    setAvailableTimeSlots(slotsForDuration);

    const durations = Object.keys(slotsForDuration).filter(
      (duration) => slotsForDuration[duration].length > 0,
    );
    setAvailableDurations(durations.map(Number));
  }, [date, duration, availability, cart]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value);
    setDuration(newDuration);

    setLastSelectedTime(time);

    const slotsForDuration = availableSlotsForEachDuration(cart, availability, date, timeSlots);
    if (slotsForDuration[newDuration] && slotsForDuration[newDuration].length > 0) {
      const closestSlot = findClosestSlot(slotsForDuration[newDuration], time);
      setTime(closestSlot);
    } else {
      setTime('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !time || !duration) {
      console.log('Please fill in all fields!');
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
    <div className="flex w-full flex-col items-center gap-8 rounded-3xl bg-white p-5 py-10 shadow-lg lg:w-1/2 dark:bg-background">
      <form
        className="grid w-full grid-cols-1 justify-items-center gap-6 text-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-bold tracking-tight text-background sm:text-2xl dark:text-white">
          Rezervēt laiku
        </h3>

        {/* <div className="flex w-full max-w-sm flex-col justify-between sm:max-w-md">
          <label htmlFor="name">Vārds, uzvārds</label>
          <input
            type="text"
            name="name"
            className="rounded-md bg-zinc-200 p-1 px-3 shadow-md dark:bg-zinc-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex w-full max-w-sm flex-col justify-between sm:max-w-md">
          <label htmlFor="phone">Telefona numurs</label>
          <input
            type="tel"
            name="phone"
            className="rounded-md bg-zinc-200 p-1 px-3 shadow-md dark:bg-zinc-800"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div> */}

        {/* Date Field */}
        <div className="flex w-full max-w-sm flex-col justify-between sm:max-w-md">
          <label htmlFor="date">Datums</label>
          <input
            type="date"
            name="date"
            min={getCurrentDateInRiga()} // Restrict to today and future dates
            className="w-full rounded-md bg-zinc-200 p-1 px-3 shadow-md dark:bg-zinc-800"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        {/* Time and Duration */}
        <div className="flex w-full max-w-sm items-center justify-between gap-3 sm:max-w-md">
          <div className="flex w-1/2 flex-col justify-between">
            <label htmlFor="time">Laiks</label>
            <select
              name="time"
              className="rounded-md bg-zinc-200 p-1 px-3 shadow-md dark:bg-zinc-800"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={isDurationDisabled}
            >
              {availableTimeSlots[duration] && availableTimeSlots[duration].length > 0 ? (
                availableTimeSlots[duration].map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Visi laiki ir aizņemti
                </option>
              )}
            </select>
          </div>

          {/* Duration Field */}
          <div className="flex w-1/2 flex-col justify-between">
            <label htmlFor="duration">Ilgums</label>
            <select
              name="duration"
              className="rounded-md bg-zinc-200 p-1 px-3 shadow-md dark:bg-zinc-800"
              value={duration}
              onChange={handleDurationChange}
              disabled={isDurationDisabled}
            >
              {availableDurations.length > 0 ? (
                availableDurations.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur * 15} min
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Aizņemts
                </option>
              )}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-5 w-full max-w-sm rounded-md bg-background p-2 px-3 text-white shadow-lg hover:underline hover:underline-offset-4 sm:max-w-md dark:bg-foreground dark:text-background"
        >
          Pievienot grozam
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
