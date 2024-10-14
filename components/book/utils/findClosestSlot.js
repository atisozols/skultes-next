import timeSlots from './timeSlots';

export const findClosestSlot = (slots, currentSlot) => {
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
