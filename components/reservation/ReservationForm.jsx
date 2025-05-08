'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { findClosestSlot } from '../../utils/book/findClosestSlot';
import timeSlots from '../../utils/book/timeSlots';
import availableSlotsForEachDuration from '../../utils/book/availableSlotsForEachDuration';
import getCurrentDateInRiga from '../../utils/book/getCurrentDateInRiga';
import { useCart } from '../../context/CartContext';
import FormElement from '../ui/FormElement';

const ReservationForm = ({ availability }) => {
  const { cart, addToCart } = useCart();
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

    const timeIndex = parseInt(Object.keys(timeSlots).find((key) => timeSlots[key] === time));
    const appointment = {
      date,
      start_index: timeIndex,
      end_index: timeIndex + duration,
    };

    addToCart(appointment);
  };

  return (
    <form className="grid w-full grid-cols-1 justify-items-center" onSubmit={handleSubmit}>
      <FormElement>
        <label htmlFor="date">Datums</label>
        <input
          type="date"
          name="date"
          style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            position: 'relative',
          }}
          min={getCurrentDateInRiga()}
          className="w-full max-w-[135px] cursor-pointer appearance-none rounded-lg bg-transparent p-2 text-right active:bg-white active:bg-opacity-5"
          value={date}
          onChange={handleDateChange}
        />
      </FormElement>

      <FormElement>
        <label htmlFor="time">Laiks</label>
        {memoizedAvailableDurations.includes(duration) &&
        memoizedSlotsForDuration[duration]?.length > 0 ? (
          <select
            name="time"
            className="w-full max-w-[135px] cursor-pointer appearance-none rounded-lg bg-transparent p-2 text-right active:bg-white active:bg-opacity-5"
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
            className="w-full max-w-[135px] cursor-not-allowed appearance-none rounded-lg bg-transparent p-2 text-right active:bg-white active:bg-opacity-5"
            value="x"
            disabled
          >
            <option value="x">-</option>
          </select>
        )}
      </FormElement>

      <FormElement>
        <label htmlFor="duration">Ilgums</label>
        {memoizedAvailableDurations.length > 0 ? (
          <select
            name="duration"
            className="w-full max-w-[135px] cursor-pointer appearance-none rounded-lg bg-transparent p-2 text-right active:bg-white active:bg-opacity-5"
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
            className="w-full max-w-[135px] cursor-not-allowed appearance-none rounded-lg bg-transparent p-2 text-right active:bg-white active:bg-opacity-5"
            value="x"
            disabled
          >
            <option value="x">-</option>
          </select>
        )}
      </FormElement>

      {/* Submit Button */}
      <button type="submit" className="w-full p-2 text-base">
        <div className="w-full rounded-lg p-2 text-sm underline active:bg-white active:bg-opacity-5">
          Pievienot grozam
        </div>
      </button>
    </form>
  );
};

export default ReservationForm;
