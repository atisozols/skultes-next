import pricing from './pricing';

const calculatePricing = (start, end, half = false) => {
  if (half) {
    if (pricing.half[end - start]) {
      return pricing.half[end - start];
    }
    return null;
  }

  if (pricing.standard[end - start]) {
    return pricing.standard[end - start];
  }
  return null;
};

export default calculatePricing;
