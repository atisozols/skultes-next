import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class strings and resolves Tailwind CSS conflicts
 * @param {...string} inputs - Class strings to merge
 * @returns {string} - Merged and de-conflicted class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
