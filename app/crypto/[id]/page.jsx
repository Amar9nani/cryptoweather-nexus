'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { fetchCryptoDetails } from '../../../redux/features/cryptoSlice';
import CryptoChart from '../../../components/CryptoChart';
import FavoriteButton from '../../../components/FavoriteButton';
import { formatCurrency, formatPercentage, formatMarketCap } from '../../../utils/formatters';

export default function CryptoDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('7d'); // Default to 7 days
  
  const { cryptoDetails } = useSelector((state) => state.crypto);
  const { favorites } = useSelector((state) => state.favorites);
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        await dispatch(fetchCryptoDetails({ id, timeframe }));
        setError(null);
      } catch (err) {
        setError('Failed to load cryptocurrency details. Please try again later.');
        console.error('Error fetching crypto details:', err);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      loadData();
    }
  }, [dispatch, id, timeframe]);
  
  // Handle the case when the crypto doesn't exist
  if (!loading && !cryptoDetails[id]) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">Cryptocurrency Not Found</h1>
        <p className="text-light-500 mb-8">The cryptocurrency you are looking for does not exist or we couldn't fetch its data.</p>
        <button 
          onClick={() => router.push('/')}
          className="btn-primary"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }
  
  const cryptoData = cryptoDetails[id] || {};
  const isFavorite = favorites.cryptos.includes(id);
  
  const getPriceChangeColor = (change) => {
    if (!change) return 'text-light-500';
    return parseFloat(change) >= 0 ? 'text-success' : 'text-error';
  };
  
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
            <div className="flex items-center">
              {cryptoData.image && (
                <div className="mr-3 bg-white rounded-full p-1 w-10 h-10 flex items-center justify-center">
                  <img 
                    src={cryptoData.image.small} 
                    alt={cryptoData.name} 
                    className="w-8 h-8"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold">{cryptoData.name}</h1>
                <p className="text-light-500">{cryptoData.symbol?.toUpperCase()}</p>
              </div>
            </div>
            <FavoriteButton 
              itemId={id}
              isFavorite={isFavorite}
              type="crypto"
            />
          </div>
          
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-5xl font-bold mb-2">
                  {formatCurrency(cryptoData.market_data?.current_price?.usd)}
                </p>
                <p className={`text-lg ${getPriceChangeColor(cryptoData.market_data?.price_change_percentage_24h)}`}>
                  {formatPercentage(cryptoData.market_data?.price_change_percentage_24h)} (24h)
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <p className="text-light-500">Market Cap</p>
                  <p className="font-semibold">{formatMarketCap(cryptoData.market_data?.market_cap?.usd)}</p>
                </div>
                <div>
                  <p className="text-light-500">24h Volume</p>
                  <p className="font-semibold">{formatCurrency(cryptoData.market_data?.total_volume?.usd)}</p>
                </div>
                <div>
                  <p className="text-light-500">Circulating Supply</p>
                  <p className="font-semibold">{cryptoData.market_data?.circulating_supply?.toLocaleString()} {cryptoData.symbol?.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-light-500">All-Time High</p>
                  <p className="font-semibold">{formatCurrency(cryptoData.market_data?.ath?.usd)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Price Chart</h2>
              <div className="flex space-x-2">
                {['24h', '7d', '30d', '90d', '1y'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-3 py-1 rounded ${
                      timeframe === period
                        ? 'bg-accent text-white'
                        : 'bg-dark-300 text-light-400 hover:bg-dark-200'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="card">
              <CryptoChart 
                priceData={cryptoData.market_data?.sparkline_7d?.price} 
                timeframe={timeframe}
                color={cryptoData.id === 'bitcoin' ? '#F7931A' : 
                       cryptoData.id === 'ethereum' ? '#627EEA' : '#3366FF'}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">About {cryptoData.name}</h2>
            <div className="card">
              <div 
                className="prose prose-invert max-w-none" 
                dangerouslySetInnerHTML={{ __html: cryptoData.description?.en }}
              ></div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card">
                <h3 className="text-xl mb-3">Links</h3>
                <ul className="space-y-2">
                  {cryptoData.links?.homepage?.[0] && (
                    <li>
                      <span className="text-light-500 mr-2">Website:</span>
                      <a 
                        href={cryptoData.links.homepage[0]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {cryptoData.links.homepage[0].replace(/^https?:\/\//, '')}
                      </a>
                    </li>
                  )}
                  {cryptoData.links?.blockchain_site?.[0] && (
                    <li>
                      <span className="text-light-500 mr-2">Explorer:</span>
                      <a 
                        href={cryptoData.links.blockchain_site[0]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {cryptoData.links.blockchain_site[0].replace(/^https?:\/\//, '')}
                      </a>
                    </li>
                  )}
                  {cryptoData.links?.subreddit_url && (
                    <li>
                      <span className="text-light-500 mr-2">Reddit:</span>
                      <a 
                        href={cryptoData.links.subreddit_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {cryptoData.links.subreddit_url.replace(/^https?:\/\//, '')}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="card">
                <h3 className="text-xl mb-3">Market Stats</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-light-500">Market Cap Rank</p>
                    <p className="font-semibold">#{cryptoData.market_cap_rank}</p>
                  </div>
                  <div>
                    <p className="text-light-500">CoinGecko Rank</p>
                    <p className="font-semibold">#{cryptoData.coingecko_rank}</p>
                  </div>
                  <div>
                    <p className="text-light-500">Price Change (7d)</p>
                    <p className={getPriceChangeColor(cryptoData.market_data?.price_change_percentage_7d)}>
                      {formatPercentage(cryptoData.market_data?.price_change_percentage_7d)}
                    </p>
                  </div>
                  <div>
                    <p className="text-light-500">Price Change (30d)</p>
                    <p className={getPriceChangeColor(cryptoData.market_data?.price_change_percentage_30d)}>
                      {formatPercentage(cryptoData.market_data?.price_change_percentage_30d)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
