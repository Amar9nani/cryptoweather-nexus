import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather, fetchWeatherForecast } from '../../services/weatherService';

// Async thunk for fetching weather data for multiple cities
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (cities, { rejectWithValue }) => {
    try {
      const promises = cities.map(city => fetchWeather(city));
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching detailed weather data for a specific city
export const fetchWeatherDetails = createAsyncThunk(
  'weather/fetchWeatherDetails',
  async (city, { rejectWithValue }) => {
    try {
      const weatherData = await fetchWeatherForecast(city);
      return { city, data: weatherData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  weather: [],
  weatherDetails: {},
  weatherLoading: false,
  weatherDetailsLoading: false,
  weatherError: null,
  weatherDetailsError: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeatherErrors: (state) => {
      state.weatherError = null;
      state.weatherDetailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchWeatherData lifecycle
      .addCase(fetchWeatherData.pending, (state) => {
        state.weatherLoading = true;
        state.weatherError = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weatherLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.weatherLoading = false;
        state.weatherError = action.payload || 'Failed to fetch weather data';
      })
      
      // Handle fetchWeatherDetails lifecycle
      .addCase(fetchWeatherDetails.pending, (state) => {
        state.weatherDetailsLoading = true;
        state.weatherDetailsError = null;
      })
      .addCase(fetchWeatherDetails.fulfilled, (state, action) => {
        state.weatherDetailsLoading = false;
        state.weatherDetails = {
          ...state.weatherDetails,
          [action.payload.city]: action.payload.data,
        };
      })
      .addCase(fetchWeatherDetails.rejected, (state, action) => {
        state.weatherDetailsLoading = false;
        state.weatherDetailsError = action.payload || 'Failed to fetch weather details';
      });
  },
});

export const { clearWeatherErrors } = weatherSlice.actions;

export default weatherSlice.reducer;
