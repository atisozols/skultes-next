import calculatePricing from './calculatePricing';

const calculateTotalPricing = (cart, half = false) => {
  let total = 0;

  for (const item of cart) {
    const { start_index, end_index } = item;

    const itemPrice = calculatePricing(start_index, end_index, half);

    if (itemPrice) {
      total += itemPrice;
    } else {
      console.warn(`Could not calculate price for cart item: ${JSON.stringify(item)}`);
    }
  }
  return total;
};

export default calculateTotalPricing;
