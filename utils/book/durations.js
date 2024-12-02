import pricing from '@/utils/pricing/pricing';
const durations = Object.keys(pricing.standard).map(Number);
export default durations;
