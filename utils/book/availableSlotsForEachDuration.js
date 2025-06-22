import getCurrentDateInRiga from './getCurrentDateInRiga';
import durations from './durations';
import mergeCartIntoAvailability from './mergeCartIntoAvailability';
import timeSlots from './timeSlots';

const availableSlotsForEachDuration = (cart, availability, date) => {
  const mergedAvailability = mergeCartIntoAvailability(cart, availability);
  const currentAvailability = mergedAvailability.find((item) => item.date.split('T')[0] === date);
  let filteredSlots = { ...timeSlots };

  // Get the maximum slot index available
  const maxSlotIndex = Math.max(...Object.keys(timeSlots).map(Number));

  const today = getCurrentDateInRiga();
  if (date === today) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    Object.keys(filteredSlots).forEach((slotIndex) => {
      const [hours, minutes] = filteredSlots[slotIndex].split(':').map(Number);

      if (
        hours < currentHours ||
        (hours === currentHours && minutes <= currentMinutes)
      ) {
        delete filteredSlots[slotIndex];
      }
    });
  }

  if (currentAvailability) {
    currentAvailability.ranges.forEach((range) => {
      for (let i = range.start.index; i < range.end.index; i++) {
        delete filteredSlots[i];
      }
    });
  }

  const result = {};
  durations.forEach((duration) => {
    // Pre-filter slots that would exceed the maximum index when considering the duration
    const availableSlots = {};
    Object.keys(filteredSlots).forEach((slotIndex) => {
      const slotInt = parseInt(slotIndex);
      // Only include slots that don't exceed the maximum index when the duration is applied
      if (slotInt + duration - 1 < maxSlotIndex) {
        availableSlots[slotIndex] = filteredSlots[slotIndex];
      }
    });

    const validSlots = {};
    Object.keys(availableSlots).forEach((slotIndex) => {
      const slotInt = parseInt(slotIndex);
      let valid = true;
      for (let i = 0; i < duration; i++) {
        if (!filteredSlots[slotInt + i]) {
          valid = false;
          break;
        }
      }
      if (valid) {
        validSlots[slotInt] = availableSlots[slotIndex];
      }
    });
    result[duration] = Object.values(validSlots);
  });

  return result;
};

export default availableSlotsForEachDuration;
