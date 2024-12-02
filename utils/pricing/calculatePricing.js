import pricing from './pricing';

const calculatePricing = (start, end, date, variable = false) => {
  if (variable) {
    const day = new Date(date).getDay();
    const isWeekend = day === 0 || day === 6;

    if (isWeekend) {
      if (pricing.morning[end - start]) {
        return pricing.morning[end - start];
      }
      return null;
    }

    if (!(start > 30 && start < 58)) {
      if (pricing.morning[end - start]) {
        return pricing.morning[end - start];
      }
      return null;
    }
  }

  if (pricing.standard[end - start]) {
    return pricing.standard[end - start];
  }
  return null;
};

export default calculatePricing;
