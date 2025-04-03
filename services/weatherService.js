const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || process.env.WEATHER_API_KEY || process.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Fetches current weather data for a city
 * @param {string} city - City name
 * @returns {Promise<object>} Weather data
 */
export async function fetchWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    throw error;
  }
}

/**
 * Fetches weather forecast for a city
 * @param {string} city - City name
 * @param {number} days - Number of days to forecast (default: 3)
 * @returns {Promise<object>} Weather forecast data
 */
export async function fetchWeatherForecast(city, days = 3) {
  try {
    const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=yes`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch weather forecast');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching weather forecast for ${city}:`, error);
    throw error;
  }
}

/**
 * Simulates a weather alert for testing notifications
 * @param {string} city - City name
 * @returns {object} Alert data
 */
export function simulateWeatherAlert(city) {
  const alertTypes = [
    'Heavy Rain Warning',
    'Thunderstorm Alert',
    'Severe Heat Warning',
    'High Wind Advisory',
    'Flash Flood Warning',
    'Winter Storm Warning'
  ];
  
  const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
  
  return {
    city,
    alert: randomAlert,
    severity: 'moderate',
    time: new Date().toISOString()
  };
}

export default {
  fetchWeather,
  fetchWeatherForecast,
  simulateWeatherAlert
};
