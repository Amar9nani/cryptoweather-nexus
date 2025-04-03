const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.NEWS_API_KEY || process.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// Default crypto news with posters
const DEFAULT_CRYPTO_NEWS = [
  {
    source: { id: null, name: "CoinDesk" },
    author: "Sam Reynolds",
    title: "Bitcoin and Ethereum Rally as US Fed Signals Interest Rate Cuts Coming Soon",
    description: "Bitcoin and Ethereum have surged to new highs following Federal Reserve Chair Jerome Powell's announcement that the central bank is preparing to cut interest rates in the coming months.",
    url: "https://www.coindesk.com/markets/2023/04/03/bitcoin-and-ethereum-rally-as-us-fed-signals-interest-rate-cuts-coming-soon/",
    urlToImage: "https://www.coindesk.com/resizer/vQ_OmJJ94EiAQqA8oqzaB4cVZXg=/1200x628/center/middle/cloudfront-us-east-1.images.arcpublishing.com/coindesk/UXJGMQHJ5VHWBPD6GWPVUXSMXE.jpg",
    publishedAt: "2023-04-03T12:00:00Z",
    content: "Bitcoin and Ethereum have surged to new highs following Federal Reserve Chair Jerome Powell's announcement that the central bank is preparing to cut interest rates in the coming months."
  },
  {
    source: { id: null, name: "Forbes" },
    title: "The Rise of Central Bank Digital Currencies: What Investors Need to Know",
    author: "Maria Thompson",
    description: "With over 100 countries actively exploring CBDCs, these digital versions of national currencies are poised to transform global finance. Here's what cryptocurrency investors should understand about this emerging technology.",
    url: "https://www.forbes.com/sites/forbesfinancecouncil/2023/04/02/the-rise-of-central-bank-digital-currencies-what-investors-need-to-know/",
    urlToImage: "https://imageio.forbes.com/specials-images/imageserve/642b9fbad5861eb33c1d9e0e/0x0.jpg?format=jpg&width=1200",
    publishedAt: "2023-04-02T14:35:00Z",
    content: "With over 100 countries actively exploring CBDCs, these digital versions of national currencies are poised to transform global finance. Here's what cryptocurrency investors should understand about this emerging technology."
  },
  {
    source: { id: null, name: "The Block" },
    title: "Institutional DeFi: Aave Launches Protocol for Enterprise Clients",
    author: "Tim Copeland",
    description: "Aave, one of the largest DeFi protocols, has announced a new platform specifically designed for institutional clients, with enhanced compliance features and KYC requirements.",
    url: "https://www.theblock.co/post/224538/aave-institutional-defi",
    urlToImage: "https://www.tbstat.com/wp/uploads/2023/04/aave-instutional-1200x675.jpg",
    publishedAt: "2023-04-01T09:45:00Z",
    content: "Aave, one of the largest DeFi protocols, has announced a new platform specifically designed for institutional clients, with enhanced compliance features and KYC requirements."
  },
  {
    source: { id: null, name: "CryptoSlate" },
    title: "New Regulations for Crypto Exchanges Coming in Q3, Says SEC Chair",
    author: "Liam Wright",
    description: "The SEC Chair has outlined a timeline for implementing new cryptocurrency exchange regulations, which are expected to be finalized by the third quarter of this year.",
    url: "https://cryptoslate.com/sec-chair-outlines-timeline-for-crypto-exchange-regulations/",
    urlToImage: "https://cryptoslate.com/wp-content/uploads/2023/04/sec-regulations-1.jpg",
    publishedAt: "2023-03-31T16:20:00Z",
    content: "The SEC Chair has outlined a timeline for implementing new cryptocurrency exchange regulations, which are expected to be finalized by the third quarter of this year."
  },
  {
    source: { id: null, name: "Cointelegraph" },
    title: "NFT Market Shows Signs of Recovery with Trading Volume Up 28% in March",
    author: "Helen Partz",
    description: "The NFT market is showing signs of recovery after a lengthy downturn, with trading volume increasing by 28% in March compared to the previous month.",
    url: "https://cointelegraph.com/news/nft-market-shows-signs-of-recovery-with-trading-volume-up-28-in-march",
    urlToImage: "https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=1200/https://s3.cointelegraph.com/uploads/2023-04/45e0e189-3c4d-4a9d-8a63-7c0f1b0f31a6.jpg",
    publishedAt: "2023-03-30T11:15:00Z",
    content: "The NFT market is showing signs of recovery after a lengthy downturn, with trading volume increasing by 28% in March compared to the previous month."
  }
];

/**
 * Fetches crypto-related news articles
 * @param {number} count - Number of articles to fetch (default: 5)
 * @returns {Promise<Array>} List of news articles
 */
export async function fetchNews(count = 5) {
  try {
    if (!API_KEY) {
      console.log('Using default crypto news');
      return DEFAULT_CRYPTO_NEWS.slice(0, count);
    }
    
    // Keywords for crypto news
    const keywords = 'crypto OR cryptocurrency OR bitcoin OR ethereum OR blockchain';
    
    const response = await fetch(
      `${BASE_URL}/everything?q=${keywords}&language=en&sortBy=publishedAt&pageSize=${count}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      console.log('News API error, using default news');
      return DEFAULT_CRYPTO_NEWS.slice(0, count);
    }
    
    const data = await response.json();
    return data.articles && data.articles.length > 0 
      ? data.articles.slice(0, count) 
      : DEFAULT_CRYPTO_NEWS.slice(0, count);
      
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return default news on error
    return DEFAULT_CRYPTO_NEWS.slice(0, count);
  }
}

export default {
  fetchNews
};
