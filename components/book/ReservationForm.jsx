'use client';
import React, { useState, useEffect } from 'react';

// Time slot generation function
const generateTimeSlots = () => {
  const slots = {};
  let currentTime = new Date();
  currentTime.setHours(6, 30, 0, 0); // Start at 06:30

  for (let i = 0; i <= 70; i++) {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    slots[i] = `${hours}:${minutes}`;
    currentTime.setMinutes(currentTime.getMinutes() + 15);
  }
  return slots;
};

// Get the current date in Riga time in YYYY-MM-DD format
const getCurrentDateInRiga = () => {
  const rigaTime = new Date().toLocaleString('en-CA', {
    timeZone: 'Europe/Riga',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return rigaTime.split(',')[0];
};

const ReservationForm = ({ availability }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(getCurrentDateInRiga());
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(3);
  const [availableTimeSlots, setAvailableTimeSlots] = useState({});
  const [availableDurations, setAvailableDurations] = useState([]);
  const [defaultTime, setDefaultTime] = useState('');
  const [isDurationDisabled, setIsDurationDisabled] = useState(false);
  const [lastSelectedTime, setLastSelectedTime] = useState('');

  const timeSlots = generateTimeSlots();

  const availableSlotsForEachDuration = (availability, date, timeSlots) => {
    const currentAvailability = availability.find((item) => item.date.slice(0, 10) === date);
    let filteredSlots = { ...timeSlots };

    if (currentAvailability) {
      currentAvailability.ranges.forEach((range) => {
        for (let i = range.start.index; i < range.end.index; i++) {
          delete filteredSlots[i]; // Remove unavailable slots
        }
      });
    }

    const result = {};
    [3, 4, 5, 6].forEach((duration) => {
      const validSlots = {};
      Object.keys(filteredSlots).forEach((slotIndex) => {
        const slotInt = parseInt(slotIndex);
        let valid = true;
        for (let i = 0; i < duration; i++) {
          if (!filteredSlots[slotInt + i]) {
            valid = false;
            break;
          }
        }
        if (valid) {
          validSlots[slotInt] = filteredSlots[slotInt];
        }
      });
      result[duration] = Object.values(validSlots);
    });

    return result;
  };

  const findClosestSlot = (slots, currentSlot) => {
    const sortedSlots = Object.values(slots).flat().sort();
    let closestSlot = '';
    let minDifference = Infinity;

    sortedSlots.forEach((slot) => {
      const slotIndex = parseInt(Object.keys(timeSlots).find((key) => timeSlots[key] === slot));
      const currentSlotIndex = parseInt(
        Object.keys(timeSlots).find((key) => timeSlots[key] === currentSlot),
      );

      if (slotIndex !== undefined && currentSlotIndex !== undefined) {
        const difference = Math.abs(slotIndex - currentSlotIndex);
        if (difference < minDifference) {
          minDifference = difference;
          closestSlot = slot;
        }
      }
    });

    return closestSlot || sortedSlots[0] || '';
  };

  useEffect(() => {
    const slotsForDuration = availableSlotsForEachDuration(availability, date, timeSlots);
    setAvailableTimeSlots(slotsForDuration);

    // Determine available durations based on slots
    const durations = Object.keys(slotsForDuration).filter(
      (duration) => slotsForDuration[duration].length > 0,
    );
    setAvailableDurations(durations.map(Number)); // Convert to numbers

    // Find the default time slot for the selected duration
    if (slotsForDuration[duration] && slotsForDuration[duration].length > 0) {
      const closestSlot = findClosestSlot(slotsForDuration[duration], lastSelectedTime);
      setDefaultTime(closestSlot);
      setTime(closestSlot);
      setIsDurationDisabled(false);
    } else {
      setDefaultTime('');
      setTime('');
      setIsDurationDisabled(true);
    }
  }, [date, duration, availability]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value);
    setDuration(newDuration);

    // Store the current selected time slot before changing duration
    setLastSelectedTime(time);

    // Automatically update time slots for the new duration
    const slotsForDuration = availableSlotsForEachDuration(availability, date, timeSlots);
    if (slotsForDuration[newDuration] && slotsForDuration[newDuration].length > 0) {
      const closestSlot = findClosestSlot(slotsForDuration[newDuration], lastSelectedTime);
      setDefaultTime(closestSlot);
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

    const appointment = {
      name,
      phone,
      date,
      time,
      duration,
    };

    console.log('Appointment:', appointment);
    // Here we will add the appointment to the cart later
  };

  return (
    <div className="w-full rounded-lg bg-white dark:bg-background p-5 py-10 flex flex-col items-center gap-8">
      <form
        className="grid grid-cols-1 justify-items-center w-full gap-6 text-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl">Rezervēt laiku</h3>

        {/* Name Field */}
        <div className="flex flex-col justify-between w-full max-w-sm md:max-w-md">
          <label htmlFor="name">Vārds, uzvārds</label>
          <input
            type="text"
            name="name"
            className="p-1 px-3 shadow-md rounded-md dark:bg-zinc-700 bg-zinc-200 dark:bg-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Phone Field */}
        <div className="flex flex-col justify-between w-full max-w-sm md:max-w-md">
          <label htmlFor="phone">Telefona numurs</label>
          <input
            type="tel"
            name="phone"
            className="p-1 px-3 shadow-md rounded-md dark:bg-zinc-700 bg-zinc-200 dark:bg-transparent"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Date Field */}
        <div className="flex flex-col justify-between w-full max-w-sm md:max-w-md">
          <label htmlFor="date">Datums</label>
          <input
            type="date"
            name="date"
            min={getCurrentDateInRiga()} // Restrict to today and future dates
            className="p-1 px-3 shadow-md rounded-md dark:bg-zinc-700 bg-zinc-200 dark:bg-transparent"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        {/* Time and Duration */}
        <div className="w-full max-w-sm md:max-w-md flex justify-between items-center gap-3">
          <div className="w-1/2 flex flex-col justify-between">
            <label htmlFor="time">Laiks</label>
            <select
              name="time"
              className="p-1 px-3 shadow-md rounded-md dark:bg-zinc-700 bg-zinc-200 dark:bg-transparent"
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
          <div className="w-1/2 flex flex-col justify-between">
            <label htmlFor="duration">Ilgums</label>
            <select
              name="duration"
              className="p-1 px-3 shadow-md rounded-md dark:bg-zinc-700 bg-zinc-200 dark:bg-transparent"
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
          className="shadow-lg max-w-sm md:max-w-md p-2 px-3 mt-5 w-full rounded-md bg-background dark:bg-foreground text-white dark:text-background hover:underline hover:underline-offset-4"
        >
          Pieteikt rezervāciju
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
