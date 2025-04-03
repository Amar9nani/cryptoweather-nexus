import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCryptoList, fetchCryptoInfo, fetchCryptoHistory } from '../../services/cryptoService';

// Async thunk for fetching crypto data for multiple cryptocurrencies
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async (cryptoIds, { rejectWithValue }) => {
    try {
      const cryptoData = await fetchCryptoList(cryptoIds);
      return cryptoData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching detailed crypto data for a specific cryptocurrency
export const fetchCryptoDetails = createAsyncThunk(
  'crypto/fetchCryptoDetails',
  async ({ id, timeframe = '7d' }, { rejectWithValue }) => {
    try {
      // Fetch both general info and historical price data
      const cryptoInfo = await fetchCryptoInfo(id);
      const priceHistory = await fetchCryptoHistory(id, timeframe);
      
      // Combine the data
      const detailedData = {
        ...cryptoInfo,
        priceHistory,
      };
      
      return { id, data: detailedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Handle WebSocket price updates
export const updateCryptoPrices = createAsyncThunk(
  'crypto/updateCryptoPrices',
  async (priceData, { getState }) => {
    const { crypto } = getState();
    const updatedCryptos = crypto.cryptos.map(crypto => {
      if (priceData[crypto.id]) {
        return {
          ...crypto,
          current_price: priceData[crypto.id],
          price_change_percentage_24h: ((priceData[crypto.id] - crypto.current_price) / crypto.current_price) * 100
        };
      }
      return crypto;
    });
    
    return updatedCryptos;
  }
);

const initialState = {
  cryptos: [],
  cryptoDetails: {},
  cryptoLoading: false,
  cryptoDetailsLoading: false,
  cryptoError: null,
  cryptoDetailsError: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    clearCryptoErrors: (state) => {
      state.cryptoError = null;
      state.cryptoDetailsError = null;
    },
    updateCryptoPriceWebSocket: (state, action) => {
      const { id, price, change } = action.payload;
      
      // Update the price in the cryptos array
      state.cryptos = state.cryptos.map(crypto => {
        if (crypto.id === id) {
          return {
            ...crypto,
            current_price: price,
            price_change_percentage_24h: change
          };
        }
        return crypto;
      });
      
      // Also update price in cryptoDetails if it exists
      if (state.cryptoDetails[id]) {
        state.cryptoDetails[id] = {
          ...state.cryptoDetails[id],
          market_data: {
            ...state.cryptoDetails[id].market_data,
            current_price: {
              ...state.cryptoDetails[id].market_data?.current_price,
              usd: price
            },
            price_change_percentage_24h: change
          }
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCryptoData lifecycle
      .addCase(fetchCryptoData.pending, (state) => {
        state.cryptoLoading = true;
        state.cryptoError = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.cryptoLoading = false;
        state.cryptos = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.cryptoLoading = false;
        state.cryptoError = action.payload || 'Failed to fetch cryptocurrency data';
      })
      
      // Handle fetchCryptoDetails lifecycle
      .addCase(fetchCryptoDetails.pending, (state) => {
        state.cryptoDetailsLoading = true;
        state.cryptoDetailsError = null;
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.cryptoDetailsLoading = false;
        state.cryptoDetails = {
          ...state.cryptoDetails,
          [action.payload.id]: action.payload.data,
        };
      })
      .addCase(fetchCryptoDetails.rejected, (state, action) => {
        state.cryptoDetailsLoading = false;
        state.cryptoDetailsError = action.payload || 'Failed to fetch cryptocurrency details';
      })
      
      // Handle updateCryptoPrices
      .addCase(updateCryptoPrices.fulfilled, (state, action) => {
        state.cryptos = action.payload;
      });
  },
});

export const { clearCryptoErrors, updateCryptoPriceWebSocket } = cryptoSlice.actions;

export default cryptoSlice.reducer;
