const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.NEWS_API_KEY || process.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Fetches crypto-related news articles
 * @param {number} count - Number of articles to fetch (default: 10)
 * @returns {Promise<Array>} List of news articles
 */
export async function fetchNews(count = 10) {
  try {
    // Keywords for crypto news
    const keywords = 'crypto OR cryptocurrency OR bitcoin OR ethereum OR blockchain';
    
    const response = await fetch(
      `${BASE_URL}/everything?q=${keywords}&language=en&sortBy=publishedAt&pageSize=${count}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch news data');
    }
    
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export default {
  fetchNews
};
