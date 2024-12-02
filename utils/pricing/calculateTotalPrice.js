import calculatePricing from './calculatePricing';

const calculateTotalPricing = (cart) => {
  let total = 0;

  for (const item of cart) {
    const { start_index, end_index, date } = item;

    const itemPrice = calculatePricing(start_index, end_index, date);

    if (itemPrice) {
      total += itemPrice;
    } else {
      console.warn(`Could not calculate price for cart item: ${JSON.stringify(item)}`);
    }
  }
  return total;
};

export default calculateTotalPricing;
