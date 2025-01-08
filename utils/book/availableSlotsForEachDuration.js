import getCurrentDateInRiga from './getCurrentDateInRiga';
import durations from './durations';
import mergeCartIntoAvailability from './mergeCartIntoAvailability';

const availableSlotsForEachDuration = (cart, availability, date, timeSlots) => {
  const mergedAvailability = mergeCartIntoAvailability(cart, availability);
  const currentAvailability = mergedAvailability.find((item) => item.date.split('T')[0] === date);
  let filteredSlots = { ...timeSlots };

  const today = getCurrentDateInRiga();
  if (date === today) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    Object.keys(filteredSlots).forEach((slotIndex) => {
      const [hours, minutes] = filteredSlots[slotIndex].split(':').map(Number);

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
  durations.forEach((duration) => {
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
