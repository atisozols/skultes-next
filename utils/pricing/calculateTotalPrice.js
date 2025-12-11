import calculatePricing from './calculatePricing';

const NEW_PRICING_START_DATE = new Date('2026-01-01');

const isBeforeNewPricing = (dateString) => {
  const bookingDate = new Date(dateString);
  return bookingDate < NEW_PRICING_START_DATE;
};

const calculateTotalPricing = (cart) => {
  let total = 0;

  for (const item of cart) {
    const { start_index, end_index, date } = item;

    const itemPrice = calculatePricing(start_index, end_index, isBeforeNewPricing(date));

    if (itemPrice) {
      total += itemPrice;
    } else {
      console.warn(`Could not calculate price for cart item: ${JSON.stringify(item)}`);
    }
  }
  return total;
};

export default calculateTotalPricing;
