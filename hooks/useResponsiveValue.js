'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to calculate a responsive value based on screen width
 * @param {Object} options - Configuration options
 * @param {number} options.minValue - Minimum value (for mobile)
 * @param {number} options.maxValue - Maximum value (for large desktop)
 * @param {number} options.minWidth - Screen width where minValue applies (mobile)
 * @param {number} options.maxWidth - Screen width where maxValue applies (desktop)
 * @returns {number} - Calculated value based on current screen width
 */
export default function useResponsiveValue({
  minValue = 1,
  maxValue = 3,
  minWidth = 320,
  maxWidth = 1280,
}) {
  const [value, setValue] = useState(minValue);

  useEffect(() => {
    // Initial calculation
    const calculateValue = () => {
      const width = window.innerWidth;
      
      // If smaller than minWidth, return minValue
      if (width <= minWidth) return minValue;
      
      // If larger than maxWidth, return maxValue
      if (width >= maxWidth) return maxValue;
      
      // Calculate proportional value between min and max
      const ratio = (width - minWidth) / (maxWidth - minWidth);
      const calculatedValue = minValue + ratio * (maxValue - minValue);
      
      return calculatedValue;
    };

    // Set initial value
    setValue(calculateValue());

    // Add resize listener
    const handleResize = () => {
      setValue(calculateValue());
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [minValue, maxValue, minWidth, maxWidth]);

  return value;
}
