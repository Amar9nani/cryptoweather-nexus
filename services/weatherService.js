const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || process.env.WEATHER_API_KEY || process.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

// Default weather data for common cities
const DEFAULT_WEATHER_DATA = {
  'New York': {
    location: {
      name: 'New York',
      region: 'New York',
      country: 'United States of America',
      lat: 40.71,
      lon: -74.01,
      localtime: new Date().toISOString(),
      tz_id: 'America/New_York'
    },
    current: {
      temp_c: 22,
      temp_f: 71.6,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        code: 1003
      },
      wind_mph: 6.9,
      wind_kph: 11.2,
      wind_degree: 270,
      wind_dir: 'W',
      pressure_mb: 1012,
      pressure_in: 29.88,
      precip_mm: 0,
      precip_in: 0,
      humidity: 65,
      cloud: 25,
      feelslike_c: 22.5,
      feelslike_f: 72.5,
      vis_km: 10,
      vis_miles: 6,
      uv: 5,
      gust_mph: 10.5,
      gust_kph: 16.9,
    }
  },
  'London': {
    location: {
      name: 'London',
      region: 'City of London',
      country: 'United Kingdom',
      lat: 51.52,
      lon: -0.11,
      localtime: new Date().toISOString(),
      tz_id: 'Europe/London'
    },
    current: {
      temp_c: 15,
      temp_f: 59,
      condition: {
        text: 'Light rain',
        icon: '//cdn.weatherapi.com/weather/64x64/day/296.png',
        code: 1183
      },
      wind_mph: 8.1,
      wind_kph: 13,
      wind_degree: 220,
      wind_dir: 'SW',
      pressure_mb: 1008,
      pressure_in: 29.77,
      precip_mm: 0.5,
      precip_in: 0.02,
      humidity: 82,
      cloud: 75,
      feelslike_c: 14.2,
      feelslike_f: 57.6,
      vis_km: 9,
      vis_miles: 5.5,
      uv: 3,
      gust_mph: 16.3,
      gust_kph: 26.3,
    }
  },
  'Tokyo': {
    location: {
      name: 'Tokyo',
      region: 'Tokyo',
      country: 'Japan',
      lat: 35.69,
      lon: 139.69,
      localtime: new Date().toISOString(),
      tz_id: 'Asia/Tokyo'
    },
    current: {
      temp_c: 26,
      temp_f: 78.8,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        code: 1000
      },
      wind_mph: 5.6,
      wind_kph: 9,
      wind_degree: 180,
      wind_dir: 'S',
      pressure_mb: 1014,
      pressure_in: 29.94,
      precip_mm: 0,
      precip_in: 0,
      humidity: 60,
      cloud: 10,
      feelslike_c: 27.2,
      feelslike_f: 81,
      vis_km: 10,
      vis_miles: 6,
      uv: 6,
      gust_mph: 7.2,
      gust_kph: 11.5,
    }
  },
  'Sydney': {
    location: {
      name: 'Sydney',
      region: 'New South Wales',
      country: 'Australia',
      lat: -33.87,
      lon: 151.21,
      localtime: new Date().toISOString(),
      tz_id: 'Australia/Sydney'
    },
    current: {
      temp_c: 22,
      temp_f: 71.6,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        code: 1000
      },
      wind_mph: 10.5,
      wind_kph: 16.9,
      wind_degree: 110,
      wind_dir: 'ESE',
      pressure_mb: 1018,
      pressure_in: 30.06,
      precip_mm: 0,
      precip_in: 0,
      humidity: 55,
      cloud: 10,
      feelslike_c: 22,
      feelslike_f: 71.6,
      vis_km: 10,
      vis_miles: 6,
      uv: 6,
      gust_mph: 12.8,
      gust_kph: 20.5,
    }
  },
  'Paris': {
    location: {
      name: 'Paris',
      region: 'Ile-de-France',
      country: 'France',
      lat: 48.87,
      lon: 2.33,
      localtime: new Date().toISOString(),
      tz_id: 'Europe/Paris'
    },
    current: {
      temp_c: 18,
      temp_f: 64.4,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        code: 1003
      },
      wind_mph: 6.5,
      wind_kph: 10.5,
      wind_degree: 210,
      wind_dir: 'SSW',
      pressure_mb: 1010,
      pressure_in: 29.83,
      precip_mm: 0,
      precip_in: 0,
      humidity: 70,
      cloud: 25,
      feelslike_c: 18,
      feelslike_f: 64.4,
      vis_km: 10,
      vis_miles: 6,
      uv: 4,
      gust_mph: 9.2,
      gust_kph: 14.8,
    }
  },
  'Berlin': {
    location: {
      name: 'Berlin',
      region: 'Berlin',
      country: 'Germany',
      lat: 52.52,
      lon: 13.40,
      localtime: new Date().toISOString(),
      tz_id: 'Europe/Berlin'
    },
    current: {
      temp_c: 16,
      temp_f: 60.8,
      condition: {
        text: 'Cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
        code: 1006
      },
      wind_mph: 8.1,
      wind_kph: 13,
      wind_degree: 260,
      wind_dir: 'W',
      pressure_mb: 1011,
      pressure_in: 29.86,
      precip_mm: 0,
      precip_in: 0,
      humidity: 75,
      cloud: 70,
      feelslike_c: 16,
      feelslike_f: 60.8,
      vis_km: 10,
      vis_miles: 6,
      uv: 3,
      gust_mph: 11.2,
      gust_kph: 18,
    }
  },
  'Mumbai': {
    location: {
      name: 'Mumbai',
      region: 'Maharashtra',
      country: 'India',
      lat: 19.08,
      lon: 72.88,
      localtime: new Date().toISOString(),
      tz_id: 'Asia/Kolkata'
    },
    current: {
      temp_c: 32,
      temp_f: 89.6,
      condition: {
        text: 'Mist',
        icon: '//cdn.weatherapi.com/weather/64x64/day/143.png',
        code: 1030
      },
      wind_mph: 9.4,
      wind_kph: 15.1,
      wind_degree: 270,
      wind_dir: 'W',
      pressure_mb: 1008,
      pressure_in: 29.77,
      precip_mm: 0,
      precip_in: 0,
      humidity: 70,
      cloud: 25,
      feelslike_c: 38.4,
      feelslike_f: 101.1,
      vis_km: 5,
      vis_miles: 3,
      uv: 7,
      gust_mph: 11.9,
      gust_kph: 19.1,
    }
  }
}

// Default forecast data
const DEFAULT_FORECAST_DATA = {
  'New York': {
    location: DEFAULT_WEATHER_DATA['New York'].location,
    current: DEFAULT_WEATHER_DATA['New York'].current,
    forecast: {
      forecastday: [
        {
          date: new Date().toISOString().split('T')[0],
          date_epoch: Math.floor(Date.now() / 1000),
          day: {
            maxtemp_c: 24,
            maxtemp_f: 75.2,
            mintemp_c: 18,
            mintemp_f: 64.4,
            avgtemp_c: 21,
            avgtemp_f: 69.8,
            maxwind_mph: 8.5,
            maxwind_kph: 13.7,
            totalprecip_mm: 0,
            totalprecip_in: 0,
            totalsnow_cm: 0,
            avgvis_km: 10,
            avgvis_miles: 6,
            avghumidity: 65,
            daily_will_it_rain: 0,
            daily_chance_of_rain: 0,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: 'Partly cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              code: 1003
            },
            uv: 5
          },
          astro: {
            sunrise: '06:45 AM',
            sunset: '07:30 PM',
            moonrise: '05:30 PM',
            moonset: '04:15 AM',
            moon_phase: 'Waxing Gibbous',
            moon_illumination: '75'
          },
          hour: [] // Simplified for brevity
        },
        {
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          date_epoch: Math.floor((Date.now() + 86400000) / 1000),
          day: {
            maxtemp_c: 25,
            maxtemp_f: 77,
            mintemp_c: 19,
            mintemp_f: 66.2,
            avgtemp_c: 22,
            avgtemp_f: 71.6,
            maxwind_mph: 7.2,
            maxwind_kph: 11.5,
            totalprecip_mm: 2.5,
            totalprecip_in: 0.1,
            totalsnow_cm: 0,
            avgvis_km: 9,
            avgvis_miles: 5.5,
            avghumidity: 70,
            daily_will_it_rain: 1,
            daily_chance_of_rain: 70,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: 'Patchy rain possible',
              icon: '//cdn.weatherapi.com/weather/64x64/day/176.png',
              code: 1063
            },
            uv: 4
          },
          astro: {
            sunrise: '06:46 AM',
            sunset: '07:29 PM',
            moonrise: '06:15 PM',
            moonset: '05:00 AM',
            moon_phase: 'Waxing Gibbous',
            moon_illumination: '80'
          },
          hour: [] // Simplified for brevity
        },
        {
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          date_epoch: Math.floor((Date.now() + 172800000) / 1000),
          day: {
            maxtemp_c: 22,
            maxtemp_f: 71.6,
            mintemp_c: 17,
            mintemp_f: 62.6,
            avgtemp_c: 19.5,
            avgtemp_f: 67.1,
            maxwind_mph: 9.4,
            maxwind_kph: 15.1,
            totalprecip_mm: 0.5,
            totalprecip_in: 0.02,
            totalsnow_cm: 0,
            avgvis_km: 10,
            avgvis_miles: 6,
            avghumidity: 65,
            daily_will_it_rain: 0,
            daily_chance_of_rain: 20,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            uv: 5
          },
          astro: {
            sunrise: '06:47 AM',
            sunset: '07:28 PM',
            moonrise: '07:00 PM',
            moonset: '05:45 AM',
            moon_phase: 'Full Moon',
            moon_illumination: '85'
          },
          hour: [] // Simplified for brevity
        }
      ]
    }
  },
  'London': {
    location: DEFAULT_WEATHER_DATA['London'].location,
    current: DEFAULT_WEATHER_DATA['London'].current,
    forecast: {
      forecastday: [
        {
          date: new Date().toISOString().split('T')[0],
          date_epoch: Math.floor(Date.now() / 1000),
          day: {
            maxtemp_c: 16,
            maxtemp_f: 60.8,
            mintemp_c: 12,
            mintemp_f: 53.6,
            avgtemp_c: 14,
            avgtemp_f: 57.2,
            maxwind_mph: 10,
            maxwind_kph: 16.1,
            totalprecip_mm: 1.5,
            totalprecip_in: 0.06,
            totalsnow_cm: 0,
            avgvis_km: 9,
            avgvis_miles: 5.5,
            avghumidity: 80,
            daily_will_it_rain: 1,
            daily_chance_of_rain: 80,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: 'Light rain',
              icon: '//cdn.weatherapi.com/weather/64x64/day/296.png',
              code: 1183
            },
            uv: 3
          },
          astro: {
            sunrise: '06:30 AM',
            sunset: '07:45 PM',
            moonrise: '05:00 PM',
            moonset: '03:30 AM',
            moon_phase: 'Waxing Gibbous',
            moon_illumination: '75'
          },
          hour: [] // Simplified for brevity
        },
        {
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          date_epoch: Math.floor((Date.now() + 86400000) / 1000),
          day: {
            maxtemp_c: 17,
            maxtemp_f: 62.6,
            mintemp_c: 13,
            mintemp_f: 55.4,
            avgtemp_c: 15,
            avgtemp_f: 59,
            maxwind_mph: 8,
            maxwind_kph: 12.9,
            totalprecip_mm: 0.5,
            totalprecip_in: 0.02,
            totalsnow_cm: 0,
            avgvis_km: 10,
            avgvis_miles: 6,
            avghumidity: 75,
            daily_will_it_rain: 0,
            daily_chance_of_rain: 20,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: 'Partly cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              code: 1003
            },
            uv: 4
          },
          astro: {
            sunrise: '06:31 AM',
            sunset: '07:43 PM',
            moonrise: '05:45 PM',
            moonset: '04:15 AM',
            moon_phase: 'Waxing Gibbous',
            moon_illumination: '80'
          },
          hour: [] // Simplified for brevity
        },
        {
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          date_epoch: Math.floor((Date.now() + 172800000) / 1000),
          day: {
            maxtemp_c: 18,
            maxtemp_f: 64.4,
            mintemp_c: 14,
            mintemp_f: 57.2,
            avgtemp_c: 16,
            avgtemp_f: 60.8,
            maxwind_mph: 7,
            maxwind_kph: 11.3,
            totalprecip_mm: 0,
            totalprecip_in: 0,
            totalsnow_cm: 0,
            avgvis_km: 10,
            avgvis_miles: 6,
            avghumidity: 70,
            daily_will_it_rain: 0,
            daily_chance_of_rain: 0,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            uv: 5
          },
          astro: {
            sunrise: '06:32 AM',
            sunset: '07:42 PM',
            moonrise: '06:30 PM',
            moonset: '05:00 AM',
            moon_phase: 'Full Moon',
            moon_illumination: '85'
          },
          hour: [] // Simplified for brevity
        }
      ]
    }
  },
  'Tokyo': {
    // Similar structure for Tokyo
    location: DEFAULT_WEATHER_DATA['Tokyo'].location,
    current: DEFAULT_WEATHER_DATA['Tokyo'].current,
    forecast: {
      forecastday: [
        {
          date: new Date().toISOString().split('T')[0],
          date_epoch: Math.floor(Date.now() / 1000),
          day: {
            maxtemp_c: 28,
            maxtemp_f: 82.4,
            mintemp_c: 23,
            mintemp_f: 73.4,
            avgtemp_c: 25.5,
            avgtemp_f: 77.9,
            maxwind_mph: 6,
            maxwind_kph: 9.7,
            totalprecip_mm: 0,
            totalprecip_in: 0,
            totalsnow_cm: 0,
            avgvis_km: 10,
            avgvis_miles: 6,
            avghumidity: 60,
            daily_will_it_rain: 0,
            daily_chance_of_rain: 0,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            uv: 6
          },
          astro: {
            sunrise: '05:15 AM',
            sunset: '06:30 PM',
            moonrise: '04:00 PM',
            moonset: '02:30 AM',
            moon_phase: 'Waxing Gibbous',
            moon_illumination: '75'
          },
          hour: [] // Simplified for brevity
        },
        {
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          date_epoch: Math.floor((Date.now() + 86400000) / 1000),
          day: {
            maxtemp_c: 29,
            maxtemp_f: 84.2,
            mintemp_c: 24,
            mintemp_f: 75.2,
            avgtemp_c: 26.5,
            avgtemp_f: 79.7,
            maxwind_mph: 7,
            maxwind_kph: 11.3,
            totalprecip_mm: 2,
            totalprecip_in: 0.08,
            totalsnow_cm: 0,
            avgvis_km: 9,
            avgvis_miles: 5.5,
            avghumidity: 65,
            daily_will_it_rain: 1,
            daily_chance_of_rain: 60,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: 'Moderate rain',
              icon: '//cdn.weatherapi.com/weather/64x64/day/302.png',
              code: 1189
            },
            uv: 5
          },
          astro: {
            sunrise: '05:16 AM',
            sunset: '06:29 PM',
            moonrise: '04:45 PM',
            moonset: '03:15 AM',
            moon_phase: 'Waxing Gibbous',
            moon_illumination: '80'
          },
          hour: [] // Simplified for brevity
        },
        {
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          date_epoch: Math.floor((Date.now() + 172800000) / 1000),
          day: {
            maxtemp_c: 27,
            maxtemp_f: 80.6,
            mintemp_c: 23,
            mintemp_f: 73.4,
            avgtemp_c: 25,
            avgtemp_f: 77,
            maxwind_mph: 8,
            maxwind_kph: 12.9,
            totalprecip_mm: 0.5,
            totalprecip_in: 0.02,
            totalsnow_cm: 0,
            avgvis_km: 10,
            avgvis_miles: 6,
            avghumidity: 60,
            daily_will_it_rain: 0,
            daily_chance_of_rain: 20,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: 'Partly cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              code: 1003
            },
            uv: 6
          },
          astro: {
            sunrise: '05:17 AM',
            sunset: '06:28 PM',
            moonrise: '05:30 PM',
            moonset: '04:00 AM',
            moon_phase: 'Full Moon',
            moon_illumination: '85'
          },
          hour: [] // Simplified for brevity
        }
      ]
    }
  }
};

/**
 * Fetches current weather data for a city
 * @param {string} city - City name
 * @returns {Promise<object>} Weather data
 */
export async function fetchWeather(city) {
  try {
    // Input validation
    if (!city || typeof city !== 'string') {
      console.log('Invalid city parameter, using default weather data');
      return { ...DEFAULT_WEATHER_DATA['New York'] };
    }
    
    // Check if API key is available
    if (!API_KEY) {
      console.log('No API key available, using default weather data');
      const defaultCity = DEFAULT_WEATHER_DATA[city] || DEFAULT_WEATHER_DATA['New York'];
      return { ...defaultCity };
    }
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.log(`Weather API error for ${city}, using default data`);
      
      // Check if we have default data for this city, otherwise use New York data
      const defaultCity = DEFAULT_WEATHER_DATA[city] || DEFAULT_WEATHER_DATA['New York'];
      return { ...defaultCity };
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    
    // Return default data on error
    const defaultCity = DEFAULT_WEATHER_DATA[city] || DEFAULT_WEATHER_DATA['New York'];
    return { ...defaultCity };
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
    // Input validation
    if (!city || typeof city !== 'string') {
      console.log('Invalid city parameter, using default forecast data');
      return { ...DEFAULT_FORECAST_DATA['New York'] };
    }
    
    // Validate days parameter
    if (isNaN(days) || days < 1 || days > 7) {
      days = 3; // Reset to default if invalid
    }
    
    // Check if API key is available
    if (!API_KEY) {
      console.log('No API key available, using default forecast data');
      const defaultCity = DEFAULT_FORECAST_DATA[city] || DEFAULT_FORECAST_DATA['New York'];
      return { ...defaultCity };
    }
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=no&alerts=yes`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.log(`Weather API forecast error for ${city}, using default data`);
      
      // Check if we have default data for this city, otherwise use New York data
      const defaultCity = DEFAULT_FORECAST_DATA[city] || DEFAULT_FORECAST_DATA['New York'];
      return { ...defaultCity };
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching weather forecast for ${city}:`, error);
    
    // Return default data on error
    const defaultCity = DEFAULT_FORECAST_DATA[city] || DEFAULT_FORECAST_DATA['New York'];
    return { ...defaultCity };
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
