import timeSlots from './timeSlots';

const transformCartToAvailability = (cart) => {
  const groupedByDate = {};

  if (cart.length < 1) {
    return [];
  }

  cart.forEach((item) => {
    const dateKey = new Date(item.date);
    const range = {
      start: {
        index: item.start_index,
        time: timeSlots[item.start_index],
      },
      end: {
        index: item.end_index,
        time: timeSlots[item.end_index],
      },
    };

    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = {
        date: dateKey,
        ranges: [],
      };
    }
    groupedByDate[dateKey].ranges.push(range);
  });

  return Object.values(groupedByDate);
};

export default transformCartToAvailability;
