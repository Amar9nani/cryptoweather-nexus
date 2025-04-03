'use client';

import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, clearAllFavorites } from '../redux/features/favoritesSlice';

/**
 * Custom hook for managing favorites
 * @returns {Object} Favorites utilities
 */
export default function useFavorites() {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  
  /**
   * Toggle city favorite status
   * @param {string} cityName - City name
   */
  const toggleCityFavorite = (cityName) => {
    dispatch(toggleFavorite({ id: cityName, type: 'city' }));
  };
  
  /**
   * Toggle crypto favorite status
   * @param {string} cryptoId - Cryptocurrency ID
   */
  const toggleCryptoFavorite = (cryptoId) => {
    dispatch(toggleFavorite({ id: cryptoId, type: 'crypto' }));
  };
  
  /**
   * Check if a city is favorited
   * @param {string} cityName - City name
   * @returns {boolean} Is city favorited
   */
  const isCityFavorite = (cityName) => {
    return favorites.cities.includes(cityName);
  };
  
  /**
   * Check if a crypto is favorited
   * @param {string} cryptoId - Cryptocurrency ID
   * @returns {boolean} Is crypto favorited
   */
  const isCryptoFavorite = (cryptoId) => {
    return favorites.cryptos.includes(cryptoId);
  };
  
  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    dispatch(clearAllFavorites());
  };
  
  return {
    favorites,
    toggleCityFavorite,
    toggleCryptoFavorite,
    isCityFavorite,
    isCryptoFavorite,
    clearFavorites
  };
}
