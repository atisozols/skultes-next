import transformCartToAvailability from './transformCartToAvailability';

const mergeCartIntoAvailability = (cart, availability) => {
  const cartArray = transformCartToAvailability(cart);
  const combined = [...cartArray, ...availability];

  const groupedByDate = combined.reduce((acc, item) => {
    const dateKey = item.date;

    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        ranges: [],
      };
    }

    acc[dateKey].ranges = [...acc[dateKey].ranges, ...item.ranges];
    return acc;
  }, {});

  return Object.values(groupedByDate);
};

export default mergeCartIntoAvailability;
