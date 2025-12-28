/**
 * Shared date utilities for both build-time (Vite plugins) and runtime
 */

/**
 * Calculates years of experience from a start date
 * @param {string} startDate - Date string in DD-MM-YYYY format
 * @returns {number} Number of years (rounded to 1 decimal)
 */
export function calculateYearsOfExperience(startDate) {
  const [day, month, year] = startDate.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  const current = new Date();

  const totalMonths =
    (current.getFullYear() - start.getFullYear()) * 12 +
    current.getMonth() -
    start.getMonth() -
    (current.getDate() < start.getDate() ? 1 : 0);

  const roundedYears = Math.round((totalMonths / 12) * 10) / 10;
  return roundedYears;
}
