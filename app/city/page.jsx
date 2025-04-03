'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import WeatherCard from '../../components/WeatherCard';
import { fetchWeatherData } from '../../redux/features/weatherSlice';

export default function WeatherPage() {
  const dispatch = useDispatch();
  const { weather, weatherLoading, weatherError } = useSelector(state => state.weather);
  const { favorites } = useSelector(state => state.favorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Cities to display by default
  const defaultCities = ['London', 'New York', 'Tokyo', 'Sydney', 'Berlin', 'Paris'];
  
  // Fetch weather data for default cities on component mount
  useEffect(() => {
    dispatch(fetchWeatherData(defaultCities));
  }, [dispatch]);
  
  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      await dispatch(fetchWeatherData([searchTerm]));
      setSearchTerm('');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Filter weather data by favorites
  const favoriteCities = weather.filter(city => 
    favorites.cities.includes(city.location?.name)
  );
  
  return (
    <div className="pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Weather Dashboard</h1>
        
        <form onSubmit={handleSearch} className="w-full md:w-auto flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a city..."
            className="input w-full md:w-64"
          />
          <button 
            type="submit" 
            className="btn-primary ml-2"
            disabled={isSearching || !searchTerm.trim()}
          >
            {isSearching ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Search'
            )}
          </button>
        </form>
      </div>
      
      {/* Favorites Section (if any) */}
      {favoriteCities.length > 0 && (
        <section className="mb-8">
          <h2 className="section-title">Your Favorite Cities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteCities.map((city) => (
              <WeatherCard key={`fav-${city.location?.name}`} city={city} />
            ))}
          </div>
        </section>
      )}
      
      {/* All Cities Section */}
      <section>
        <h2 className="section-title">All Cities</h2>
        
        {weatherError ? (
          <div className="bg-error bg-opacity-20 text-white p-4 rounded-lg mb-4">
            Failed to load weather data. {weatherError}
          </div>
        ) : null}
        
        {weatherLoading && weather.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card animate-pulse h-64">
                <div className="h-6 bg-dark-200 rounded w-1/2 mb-4"></div>
                <div className="h-12 bg-dark-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-dark-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-dark-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weather.map((city) => (
              <WeatherCard key={city.location?.name} city={city} />
            ))}
          </div>
        )}
        
        {!weatherLoading && weather.length === 0 && (
          <div className="text-center py-10">
            <p className="text-light-400 mb-4">No weather data available. Try searching for a city.</p>
          </div>
        )}
      </section>
      
      <div className="flex justify-center mt-8">
        <Link href="/">
          <button className="btn-secondary">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
