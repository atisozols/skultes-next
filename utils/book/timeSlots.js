const timeSlotConfig = {
  startTime: '06:00', // Start time of the day
  endTime: '24:30', // End time of the day
  interval: 15, // Interval between slots in minutes
};

/**
 * Generate time slots based on configuration
 * @returns {Object} Time slots object with index as key and time as value
 */
function generateTimeSlots() {
  const timeSlots = {};
  let index = 0;

  // Convert start and end times to minutes since midnight
  const [startHour, startMinute] = timeSlotConfig.startTime.split(':').map(Number);
  const [endHour, endMinute] = timeSlotConfig.endTime.split(':').map(Number);

  let currentMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  // Handle midnight crossing
  while (currentMinutes <= endMinutes || (endMinutes === 0 && currentMinutes < 24 * 60)) {
    // Format time as HH:mm
    const hours = Math.floor(currentMinutes / 60) % 24;
    const minutes = currentMinutes % 60;
    timeSlots[index] =
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    currentMinutes += timeSlotConfig.interval;
    index++;
  }

  return timeSlots;
}

// Generate and export the time slots
export default generateTimeSlots();
