import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews } from '../../services/newsService';

// Async thunk for fetching news data
export const fetchNewsData = createAsyncThunk(
  'news/fetchNewsData',
  async (_, { rejectWithValue }) => {
    try {
      const newsData = await fetchNews();
      return newsData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  news: [],
  newsLoading: false,
  newsError: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearNewsErrors: (state) => {
      state.newsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchNewsData lifecycle
      .addCase(fetchNewsData.pending, (state) => {
        state.newsLoading = true;
        state.newsError = null;
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.newsLoading = false;
        state.news = action.payload;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.newsLoading = false;
        state.newsError = action.payload || 'Failed to fetch news data';
      });
  },
});

export const { clearNewsErrors } = newsSlice.actions;

export default newsSlice.reducer;
