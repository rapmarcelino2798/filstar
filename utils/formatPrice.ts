/**
 * Formats a number into a comma-separated price string.
 * Hardcoding 'en-US' guarantees identical server and client outputs in Next.js.
 */
export const formatPrice = (
  amount: number | string, 
): string => {
  const numericValue = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numericValue) || numericValue === null) {
    return '₱0.00';
  }

  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};
