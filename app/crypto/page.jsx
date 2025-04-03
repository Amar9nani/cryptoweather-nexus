'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import CryptoCard from '../../components/CryptoCard';
import { fetchCryptoData } from '../../redux/features/cryptoSlice';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

export default function CryptoPage() {
  const dispatch = useDispatch();
  const { cryptos, cryptoLoading, cryptoError } = useSelector(state => state.crypto);
  const { favorites } = useSelector(state => state.favorites);
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Cryptocurrencies to display by default
  const defaultCryptos = [
    'bitcoin', 'ethereum', 'ripple', 'litecoin', 
    'cardano', 'polkadot', 'binancecoin', 'solana', 
    'dogecoin', 'avalanche-2', 'tron', 'stellar', 
    'chainlink', 'matic-network', 'shiba-inu'
  ];
  
  // Fetch crypto data on component mount
  useEffect(() => {
    dispatch(fetchCryptoData(defaultCryptos));
    
    // Set up refresh interval (every 60 seconds)
    const intervalId = setInterval(() => {
      dispatch(fetchCryptoData(defaultCryptos));
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [dispatch]);
  
  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to descending
      setSortBy(field);
      setSortDirection('desc');
    }
  };
  
  // Sort cryptocurrencies
  const sortedCryptos = [...cryptos].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle nested fields
    if (sortBy === 'price_change_percentage_24h') {
      aValue = a.price_change_percentage_24h || 0;
      bValue = b.price_change_percentage_24h || 0;
    }
    
    // Handle nulls
    if (aValue === null) aValue = 0;
    if (bValue === null) bValue = 0;
    
    if (sortDirection === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
  
  // Filter crypto data by favorites
  const favoriteCryptos = cryptos.filter(crypto => 
    favorites.cryptos.includes(crypto.id)
  );
  
  // Get sort indicator
  const getSortIndicator = (field) => {
    if (sortBy !== field) return null;
    
    return sortDirection === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };
  
  // Get price change class
  const getPriceChangeClass = (change) => {
    if (!change) return 'text-light-500';
    return parseFloat(change) >= 0 ? 'text-success' : 'text-error';
  };
  
  return (
    <div className="pt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Cryptocurrency Market</h1>
      </div>
      
      {/* Favorites Section (if any) */}
      {favoriteCryptos.length > 0 && (
        <section className="mb-8">
          <h2 className="section-title">Your Favorite Cryptocurrencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteCryptos.map((crypto) => (
              <CryptoCard key={`fav-${crypto.id}`} crypto={crypto} />
            ))}
          </div>
        </section>
      )}
      
      {/* Crypto Table Section */}
      <section className="mb-8">
        <h2 className="section-title">Market Overview</h2>
        
        {cryptoError ? (
          <div className="bg-error bg-opacity-20 text-white p-4 rounded-lg mb-4">
            Failed to load cryptocurrency data. {cryptoError}
          </div>
        ) : null}
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-dark-400 text-light-300">
              <tr>
                <th className="p-4 font-semibold">#</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('current_price')}>
                  <div className="flex items-center">
                    Price {getSortIndicator('current_price')}
                  </div>
                </th>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('price_change_percentage_24h')}>
                  <div className="flex items-center">
                    24h % {getSortIndicator('price_change_percentage_24h')}
                  </div>
                </th>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('market_cap')}>
                  <div className="flex items-center">
                    Market Cap {getSortIndicator('market_cap')}
                  </div>
                </th>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('total_volume')}>
                  <div className="flex items-center">
                    Volume (24h) {getSortIndicator('total_volume')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {cryptoLoading && sortedCryptos.length === 0 ? (
                [...Array(12)].map((_, i) => (
                  <tr key={i} className="border-b border-dark-300">
                    <td colSpan="6" className="p-4">
                      <div className="h-8 bg-dark-300 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : (
                sortedCryptos.map((crypto, index) => (
                  <tr 
                    key={crypto.id} 
                    className="border-b border-dark-300 hover:bg-dark-400 transition-colors"
                  >
                    <td className="p-4 text-light-400">{index + 1}</td>
                    <td className="p-4">
                      <Link href={`/crypto/${crypto.id}`} className="flex items-center">
                        {crypto.image && (
                          <div className="bg-white rounded-full p-1 w-8 h-8 mr-2 flex items-center justify-center">
                            <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{crypto.name}</div>
                          <div className="text-light-500 text-sm">{crypto.symbol?.toUpperCase()}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4 font-medium">{formatCurrency(crypto.current_price)}</td>
                    <td className={`p-4 ${getPriceChangeClass(crypto.price_change_percentage_24h)}`}>
                      {formatPercentage(crypto.price_change_percentage_24h)}
                    </td>
                    <td className="p-4">{formatCurrency(crypto.market_cap, 0)}</td>
                    <td className="p-4">{formatCurrency(crypto.total_volume, 0)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {!cryptoLoading && sortedCryptos.length === 0 && (
          <div className="text-center py-10">
            <p className="text-light-400">No cryptocurrency data available.</p>
          </div>
        )}
      </section>
      
      {/* Crypto Cards Section */}
      <section>
        <h2 className="section-title">All Cryptocurrencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cryptoLoading && sortedCryptos.length === 0 ? (
            [...Array(15)].map((_, i) => (
              <div key={i} className="card animate-pulse h-64">
                <div className="h-6 bg-dark-200 rounded w-1/2 mb-4"></div>
                <div className="h-12 bg-dark-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-dark-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-dark-200 rounded w-2/3"></div>
              </div>
            ))
          ) : (
            sortedCryptos.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))
          )}
        </div>
      </section>
      
      <div className="flex justify-center mt-8">
        <Link href="/">
          <button className="btn-secondary">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
