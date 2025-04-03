const API_KEY = process.env.NEXT_PUBLIC_CRYPTO_API_KEY || process.env.CRYPTO_API_KEY || process.env.VITE_CRYPTO_API_KEY;
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Fetches list of cryptocurrencies
 * @param {string[]} cryptoIds - Array of cryptocurrency IDs
 * @returns {Promise<Array>} List of cryptocurrencies
 */
export async function fetchCryptoList(cryptoIds) {
  try {
    const idsParam = cryptoIds.join(',');
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h,7d`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cryptocurrency data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching cryptocurrency list:', error);
    throw error;
  }
}

/**
 * Fetches detailed information for a specific cryptocurrency
 * @param {string} id - Cryptocurrency ID
 * @returns {Promise<object>} Detailed cryptocurrency data
 */
export async function fetchCryptoInfo(id) {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch details for ${id}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching crypto info for ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches historical price data for a cryptocurrency
 * @param {string} id - Cryptocurrency ID
 * @param {string} timeframe - Time period (1d, 7d, 30d, 90d, 1y)
 * @returns {Promise<Array>} Historical price data
 */
export async function fetchCryptoHistory(id, timeframe) {
  try {
    // Convert timeframe to days
    let days;
    switch (timeframe) {
      case '24h':
        days = 1;
        break;
      case '7d':
        days = 7;
        break;
      case '30d':
        days = 30;
        break;
      case '90d':
        days = 90;
        break;
      case '1y':
        days = 365;
        break;
      default:
        days = 7;
    }
    
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch history for ${id}`);
    }
    
    const data = await response.json();
    return data.prices.map(price => ({
      timestamp: price[0],
      price: price[1]
    }));
  } catch (error) {
    console.error(`Error fetching crypto history for ${id}:`, error);
    throw error;
  }
}

export default {
  fetchCryptoList,
  fetchCryptoInfo,
  fetchCryptoHistory
};
