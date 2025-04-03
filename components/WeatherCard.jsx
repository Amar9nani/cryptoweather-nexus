'use client';

import Link from 'next/link';
import { useState } from 'react';
import FavoriteButton from './FavoriteButton';
import { useSelector } from 'react-redux';
import { formatTemperature } from '../utils/formatters';

export default function WeatherCard({ city }) {
  const [isHovered, setIsHovered] = useState(false);
  const { favorites } = useSelector((state) => state.favorites);

  if (!city || !city.location) {
    return (
      <div className="card h-64 flex items-center justify-center">
        <p className="text-light-500">Weather data unavailable</p>
      </div>
    );
  }

  const cityName = city.location.name;
  const isFavorite = favorites.cities.includes(cityName);

  // Get weather icon based on condition code
  const getWeatherBackground = (code) => {
    if (!code) return 'bg-dark-300';
    
    // Sunny
    if (code === 1000) {
      return 'bg-gradient-to-br from-weather-sunny to-orange-700';
    }
    // Partly cloudy
    else if (code >= 1003 && code <= 1030) {
      return 'bg-gradient-to-br from-dark-300 to-weather-cloudy';
    }
    // Rainy
    else if (code >= 1063 && code <= 1201) {
      return 'bg-gradient-to-br from-dark-400 to-weather-rainy';
    }
    // Snow
    else if (code >= 1204 && code <= 1237) {
      return 'bg-gradient-to-br from-dark-300 to-weather-snowy';
    }
    // Storm
    else if (code >= 1273) {
      return 'bg-gradient-to-br from-dark-500 to-weather-stormy';
    }
    
    return 'bg-dark-300';
  };

  return (
    <Link href={`/city/${cityName}`}>
      <div 
        className={`card h-64 relative overflow-hidden transition-all duration-300 ${
          isHovered ? 'transform scale-[1.02]' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background color based on weather condition */}
        <div className={`absolute inset-0 ${getWeatherBackground(city.current?.condition?.code)} opacity-30`}></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{cityName}</h3>
              <p className="text-light-400">{city.location.country}</p>
            </div>
            <FavoriteButton 
              itemId={cityName}
              isFavorite={isFavorite}
              type="city"
            />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-4xl font-bold mb-2">
              {formatTemperature(city.current?.temp_c)}
            </p>
            <p className="text-lg">{city.current?.condition?.text}</p>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-light-500">Feels Like</p>
              <p className="font-medium">{formatTemperature(city.current?.feelslike_c)}</p>
            </div>
            <div>
              <p className="text-light-500">Humidity</p>
              <p className="font-medium">{city.current?.humidity}%</p>
            </div>
            <div>
              <p className="text-light-500">Wind</p>
              <p className="font-medium">{city.current?.wind_kph} km/h</p>
            </div>
            <div>
              <p className="text-light-500">Pressure</p>
              <p className="font-medium">{city.current?.pressure_mb} mb</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
