'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { fetchWeatherDetails } from '../../../redux/features/weatherSlice';
import WeatherChart from '../../../components/WeatherChart';
import FavoriteButton from '../../../components/FavoriteButton';
import { formatTemperature, formatDate } from '../../../utils/formatters';

export default function CityDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { weatherDetails } = useSelector((state) => state.weather);
  const { favorites } = useSelector((state) => state.favorites);
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        await dispatch(fetchWeatherDetails(id));
        setError(null);
      } catch (err) {
        setError('Failed to load weather details. Please try again later.');
        console.error('Error fetching weather details:', err);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      loadData();
    }
  }, [dispatch, id]);
  
  // Handle the case when the city doesn't exist
  if (!loading && !weatherDetails[id]) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">City Not Found</h1>
        <p className="text-light-500 mb-8">The city you are looking for does not exist or we couldn't fetch its data.</p>
        <button 
          onClick={() => router.push('/')}
          className="btn-primary"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }
  
  const cityData = weatherDetails[id];
  const isFavorite = favorites.cities.includes(id);
  
  return (
    <div className="max-w-4xl mx-auto">
      {loading ? (
        <div className="space-y-4">
          <div className="h-12 bg-dark-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-64 bg-dark-200 rounded w-full animate-pulse"></div>
          <div className="h-48 bg-dark-200 rounded w-full animate-pulse"></div>
        </div>
      ) : error ? (
        <div className="bg-error bg-opacity-20 text-white p-4 rounded-lg mb-4">
          {error}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{cityData.location.name}</h1>
              <p className="text-light-500">{cityData.location.country}</p>
            </div>
            <FavoriteButton 
              itemId={id}
              isFavorite={isFavorite}
              type="city"
            />
          </div>
          
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-5xl font-bold mb-2">
                  {formatTemperature(cityData.current.temp_c)}
                </p>
                <p className="text-light-500">
                  Feels like {formatTemperature(cityData.current.feelslike_c)}
                </p>
                <p className="text-light-400 mt-1">{cityData.current.condition.text}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <p className="text-light-500">Humidity</p>
                  <p className="font-semibold">{cityData.current.humidity}%</p>
                </div>
                <div>
                  <p className="text-light-500">Wind</p>
                  <p className="font-semibold">{cityData.current.wind_kph} km/h</p>
                </div>
                <div>
                  <p className="text-light-500">Pressure</p>
                  <p className="font-semibold">{cityData.current.pressure_mb} mb</p>
                </div>
                <div>
                  <p className="text-light-500">Visibility</p>
                  <p className="font-semibold">{cityData.current.vis_km} km</p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Forecast</h2>
          <div className="card mb-6">
            <WeatherChart forecast={cityData.forecast?.forecastday || []} />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">3-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {cityData.forecast?.forecastday.map((day) => (
              <div key={day.date} className="card">
                <p className="font-semibold mb-2">{formatDate(day.date)}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">{formatTemperature(day.day.avgtemp_c)}</span>
                  <span>{day.day.condition.text}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-light-500">Min</p>
                    <p>{formatTemperature(day.day.mintemp_c)}</p>
                  </div>
                  <div>
                    <p className="text-light-500">Max</p>
                    <p>{formatTemperature(day.day.maxtemp_c)}</p>
                  </div>
                  <div>
                    <p className="text-light-500">Humidity</p>
                    <p>{day.day.avghumidity}%</p>
                  </div>
                  <div>
                    <p className="text-light-500">Rain</p>
                    <p>{day.day.daily_chance_of_rain}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => router.push('/')}
              className="btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
}
