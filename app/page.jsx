'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchWeatherData } from '../redux/features/weatherSlice';
import { fetchCryptoData } from '../redux/features/cryptoSlice';
import { fetchNewsData } from '../redux/features/newsSlice';
import WeatherCard from '../components/WeatherCard';
import CryptoCard from '../components/CryptoCard';
import NewsCard from '../components/NewsCard';
import Notification from '../components/Notification';
import useWebSocket from '../hooks/useWebSocket';

export default function Home() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  
  // Select state from Redux store
  const { weather, weatherLoading, weatherError } = useSelector((state) => state.weather);
  const { cryptos, cryptoLoading, cryptoError } = useSelector((state) => state.crypto);
  const { news, newsLoading, newsError } = useSelector((state) => state.news);
  const { favorites } = useSelector((state) => state.favorites);
  const { notifications } = useSelector((state) => state.notifications);

  // Initialize WebSocket connection for real-time updates
  useWebSocket();

  // Fetch data on component mount
  useEffect(() => {
    const cities = ['London', 'New York', 'Tokyo', 'Sydney', 'Berlin', 'Paris'];
    const cryptoIds = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'cardano', 'polkadot'];
    
    dispatch(fetchWeatherData(cities));
    dispatch(fetchCryptoData(cryptoIds));
    dispatch(fetchNewsData());

    // Set up periodic refresh (every 60 seconds)
    const intervalId = setInterval(() => {
      refreshData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  // Function to manually refresh data
  const refreshData = async () => {
    setRefreshing(true);
    try {
      const cities = ['London', 'New York', 'Tokyo', 'Sydney', 'Berlin', 'Paris'];
      const cryptoIds = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'cardano', 'polkadot'];
      
      await Promise.all([
        dispatch(fetchWeatherData(cities)),
        dispatch(fetchCryptoData(cryptoIds)),
        dispatch(fetchNewsData())
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Filter for favorite cities and cryptos
  const favoriteCities = weather.filter(city => 
    favorites.cities.includes(city.location?.name)
  );
  
  const favoriteCryptos = cryptos.filter(crypto => 
    favorites.cryptos.includes(crypto.id)
  );

  return (
    <div className="space-y-8">
      {/* Notification area */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Notification 
            key={notification.id} 
            notification={notification} 
          />
        ))}
      </div>

      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
          CryptoWeather Nexus
        </h1>
        <button 
          onClick={refreshData}
          disabled={refreshing}
          className="btn-primary flex items-center"
        >
          {refreshing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refreshing...
            </>
          ) : (
            'Refresh Data'
          )}
        </button>
      </div>

      {/* Favorites Section (if any) */}
      {(favoriteCities.length > 0 || favoriteCryptos.length > 0) && (
        <section className="mb-8">
          <h2 className="section-title">Your Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteCities.map((city) => (
              <WeatherCard key={`fav-${city.location?.name}`} city={city} />
            ))}
            {favoriteCryptos.map((crypto) => (
              <CryptoCard key={`fav-${crypto.id}`} crypto={crypto} />
            ))}
          </div>
        </section>
      )}

      {/* Weather Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Weather Updates</h2>
          <Link href="/city" className="text-accent hover:text-blue-400">
            View All
          </Link>
        </div>
        {weatherError ? (
          <div className="bg-error bg-opacity-20 text-white p-4 rounded-lg">
            Failed to load weather data. {weatherError}
          </div>
        ) : weatherLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
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
            {weather.slice(0, 3).map((city) => (
              <WeatherCard key={city.location?.name} city={city} />
            ))}
          </div>
        )}
      </section>

      {/* Cryptocurrency Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Cryptocurrency Prices</h2>
          <Link href="/crypto" className="text-accent hover:text-blue-400">
            View All
          </Link>
        </div>
        {cryptoError ? (
          <div className="bg-error bg-opacity-20 text-white p-4 rounded-lg">
            Failed to load cryptocurrency data. {cryptoError}
          </div>
        ) : cryptoLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
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
            {cryptos.slice(0, 3).map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))}
          </div>
        )}
      </section>

      {/* News Section */}
      <section>
        <h2 className="section-title">Latest Crypto News</h2>
        {newsError ? (
          <div className="bg-error bg-opacity-20 text-white p-4 rounded-lg">
            Failed to load news data. {newsError}
          </div>
        ) : newsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="card animate-pulse h-24 flex">
                <div className="h-full w-1/4 bg-dark-200 rounded mr-4"></div>
                <div className="flex-1">
                  <div className="h-6 bg-dark-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-dark-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-dark-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {news.slice(0, 5).map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
