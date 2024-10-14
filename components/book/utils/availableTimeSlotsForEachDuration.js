import getCurrentDateInRiga from './getCurrentDateInRiga';

const availableSlotsForEachDuration = (availability, date, timeSlots) => {
  const currentAvailability = availability.find((item) => item.date.slice(0, 10) === date);
  let filteredSlots = { ...timeSlots };

  const today = getCurrentDateInRiga(); // Get today's date in Riga time
  if (date === today) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    // Iterate over the timeSlots and remove those that are before the current time
    Object.keys(filteredSlots).forEach((slotIndex) => {
      const [hours, minutes] = filteredSlots[slotIndex].split(':').map(Number);

      // Compare slot time with current time
      if (hours < currentHours || (hours === currentHours && minutes <= currentMinutes)) {
        delete filteredSlots[slotIndex];
      }
    });
  }

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

export default availableSlotsForEachDuration;
