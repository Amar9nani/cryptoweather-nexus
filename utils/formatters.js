/**
 * Utility functions for formatting data
 */

/**
 * Format temperature with degree symbol
 * @param {number} temp - Temperature in Celsius
 * @returns {string} Formatted temperature
 */
export function formatTemperature(temp) {
  if (temp === undefined || temp === null) return 'N/A';
  return `${Math.round(temp)}°C`;
}

/**
 * Format currency value
 * @param {number} value - Currency value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted currency
 */
export function formatCurrency(value, decimals = 2) {
  if (value === undefined || value === null) return 'N/A';
  
  // Round very small values appropriately
  if (value < 0.01 && value > 0) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 6
    });
  }
  
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Format percentage value
 * @param {number} value - Percentage value
 * @returns {string} Formatted percentage
 */
export function formatPercentage(value) {
  if (value === undefined || value === null) return 'N/A';
  
  const formattedValue = parseFloat(value).toFixed(2);
  return `${formattedValue > 0 ? '+' : ''}${formattedValue}%`;
}

/**
 * Format market cap value
 * @param {number} value - Market cap value
 * @returns {string} Formatted market cap
 */
export function formatMarketCap(value) {
  if (value === undefined || value === null) return 'N/A';
  
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else {
    return `$${value.toLocaleString()}`;
  }
}

/**
 * Format date
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Format time
 * @param {string} timeString - Time string
 * @returns {string} Formatted time
 */
export function formatTime(timeString) {
  if (!timeString) return 'N/A';
  
  try {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
}

/**
 * Format currency value with appropriate precision based on magnitude
 * @param {number} value - Currency value
 * @returns {string} Formatted currency with dynamic precision
 */
export function formatCurrencyDynamic(value) {
  if (value === undefined || value === null) return 'N/A';
  
  if (value < 0.01) {
    return formatCurrency(value, 6);
  } else if (value < 1) {
    return formatCurrency(value, 4);
  } else if (value < 1000) {
    return formatCurrency(value, 2);
  } else {
    return formatCurrency(value, 0);
  }
}

export default {
  formatTemperature,
  formatCurrency,
  formatPercentage,
  formatMarketCap,
  formatDate,
  formatTime,
  formatCurrencyDynamic
};
