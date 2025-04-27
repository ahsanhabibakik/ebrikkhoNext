/**
 * Format a number as Bangladeshi Taka (৳) with English numbers
 * @param {number} price - The price to format
 * @returns {string} The formatted price in BDT with English numbers
 */
export const formatPrice = (price) => {
  if (typeof price !== "number" || isNaN(price)) return "৳0.00";
  return `৳${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
