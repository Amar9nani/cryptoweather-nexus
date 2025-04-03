import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './features/weatherSlice';
import cryptoReducer from './features/cryptoSlice';
import newsReducer from './features/newsSlice';
import favoritesReducer from './features/favoritesSlice';
import notificationReducer from './features/notificationSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    favorites: favoritesReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
