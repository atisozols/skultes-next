'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { findClosestSlot } from '../../utils/book/findClosestSlot';
import timeSlots from '../../utils/book/timeSlots';
import availableSlotsForEachDuration from '../../utils/book/availableSlotsForEachDuration';
import getCurrentDateInRiga from '../../utils/book/getCurrentDateInRiga';
import pricing from '@/utils/pricing/pricing';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import TimetableLayout from '../timetable/TimetableLayout';

const DURATION_LABELS = {
  3: '0:45',
  4: '1:00',
  5: '1:15',
  6: '1:30',
  7: '1:45',
  8: '2:00',
};

const formatPrice = (cents) => `€${(cents / 100).toFixed(2)}`;

const ReservationForm = ({ availability }) => {
  const { cart, addToCart } = useCart();
  const [date, setDate] = useState(getCurrentDateInRiga());
  const [duration, setDuration] = useState(3);
  const [time, setTime] = useState('');
  const timeScrollRef = useRef(null);

  const memoizedSlotsForDuration = useMemo(() => {
    return availableSlotsForEachDuration(cart, availability, date);
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

  // Scroll selected time into view
  useEffect(() => {
    if (!timeScrollRef.current || !time) return;
    const selected = timeScrollRef.current.querySelector('[data-selected="true"]');
    if (selected) {
      selected.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [time, duration]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeIndex = parseInt(Object.keys(timeSlots).find((key) => timeSlots[key] === time));
    addToCart({
      date,
      start_index: timeIndex,
      end_index: timeIndex + duration,
    });
  };

  const availableSlots = memoizedSlotsForDuration[duration] || [];
  const currentPrice = pricing.standard[duration];
  const noSlots = memoizedAvailableDurations.length === 0;

  return (
    <form className="flex w-full flex-col pt-3.5" onSubmit={handleSubmit}>
      {/* Timetable */}
      <div className="flex w-full items-center justify-center">
        <TimetableLayout availability={availability} />
      </div>

      {/* Date */}
      <div
        className="flex items-center justify-between px-3.5 py-2.5"
        style={{ borderBottom: '0.5px solid var(--border)' }}
      >
        <span className="text-sm text-alternate">Datums</span>
        <input
          type="date"
          min={getCurrentDateInRiga()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
          className="max-w-[135px] cursor-pointer appearance-none rounded-lg bg-white/5 px-3 py-1.5 text-right text-sm"
        />
      </div>

      {/* Duration — segmented control */}
      <div
        className="flex flex-col gap-2 px-3.5 py-3"
        style={{ borderBottom: '0.5px solid var(--border)' }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-alternate">Ilgums</span>
          {currentPrice && <span className="text-sm font-medium">{formatPrice(currentPrice)}</span>}
        </div>
        <div className="grid grid-cols-6 gap-1">
          {Object.keys(DURATION_LABELS).map((dur) => {
            const d = Number(dur);
            const isAvailable = memoizedAvailableDurations.includes(d);
            const isSelected = duration === d;
            return (
              <button
                key={d}
                type="button"
                disabled={!isAvailable}
                onClick={() => setDuration(d)}
                className={`rounded-lg py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-accent text-background'
                    : isAvailable
                      ? 'bg-white/5 text-foreground active:bg-white/10'
                      : 'bg-white/[0.02] text-white/20'
                }`}
              >
                {DURATION_LABELS[d]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time — horizontal scroll */}
      <div className="flex flex-col gap-2 px-3.5 py-3">
        <span className="text-sm text-alternate">Laiks</span>
        {availableSlots.length > 0 ? (
          <div
            ref={timeScrollRef}
            className="scrollbar-hide -mx-3.5 flex gap-1.5 overflow-x-auto px-3.5"
          >
            {availableSlots.map((slot) => {
              const isSelected = time === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  data-selected={isSelected}
                  onClick={() => setTime(slot)}
                  className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-accent text-background'
                      : 'bg-white/5 text-foreground active:bg-white/10'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="py-1 text-sm text-white/30">Nav pieejamu laiku</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex w-full items-center justify-center px-3.5 pb-3.5 pt-1">
        <Button
          variant="default"
          className="w-full font-medium uppercase"
          onClick={handleSubmit}
          disabled={noSlots || !time}
        >
          Pievienot grozam
        </Button>
      </div>
    </form>
  );
};

export default ReservationForm;
