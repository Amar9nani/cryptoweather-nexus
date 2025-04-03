import { createSlice } from '@reduxjs/toolkit';

// Load favorites from localStorage if available
const loadFavoritesFromStorage = () => {
  if (typeof window !== 'undefined') {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        return JSON.parse(savedFavorites);
      } catch (e) {
        console.error('Error parsing favorites from localStorage', e);
      }
    }
  }
  
  return {
    cities: [],
    cryptos: []
  };
};

// Initial state with default favorites or from localStorage
const initialState = {
  favorites: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const { id, type } = action.payload;
      
      if (type === 'city') {
        const index = state.favorites.cities.indexOf(id);
        if (index === -1) {
          // Add to favorites
          state.favorites.cities.push(id);
        } else {
          // Remove from favorites
          state.favorites.cities.splice(index, 1);
        }
      } else if (type === 'crypto') {
        const index = state.favorites.cryptos.indexOf(id);
        if (index === -1) {
          // Add to favorites
          state.favorites.cryptos.push(id);
        } else {
          // Remove from favorites
          state.favorites.cryptos.splice(index, 1);
        }
      }
      
      // Save to localStorage if available
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    
    clearAllFavorites: (state) => {
      state.favorites = {
        cities: [],
        cryptos: []
      };
      
      // Clear from localStorage if available
      if (typeof window !== 'undefined') {
        localStorage.removeItem('favorites');
      }
    },
  },
});

export const { toggleFavorite, clearAllFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
