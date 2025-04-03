'use client';

import Link from 'next/link';
import { useState } from 'react';
import FavoriteButton from './FavoriteButton';
import { useSelector } from 'react-redux';
import { formatCurrency, formatPercentage } from '../utils/formatters';

export default function CryptoCard({ crypto }) {
  const [isHovered, setIsHovered] = useState(false);
  const { favorites } = useSelector((state) => state.favorites);
  
  if (!crypto || !crypto.id) {
    return (
      <div className="card h-64 flex items-center justify-center">
        <p className="text-light-500">Crypto data unavailable</p>
      </div>
    );
  }
  
  const isFavorite = favorites.cryptos.includes(crypto.id);
  
  // Get CSS color class based on price change
  const getPriceChangeColor = (change) => {
    if (!change) return 'text-light-500';
    return parseFloat(change) >= 0 ? 'text-success' : 'text-error';
  };
  
  // Get icon based on crypto name
  const getCryptoColor = (id) => {
    switch(id) {
      case 'bitcoin':
        return 'from-crypto-bitcoin to-yellow-700';
      case 'ethereum':
        return 'from-crypto-ethereum to-blue-700';
      case 'ripple':
        return 'from-crypto-xrp to-gray-700';
      case 'litecoin':
        return 'from-crypto-litecoin to-blue-900';
      default:
        return 'from-dark-300 to-dark-500';
    }
  };

  return (
    <Link href={`/crypto/${crypto.id}`}>
      <div 
        className={`card h-64 relative overflow-hidden transition-all duration-300 ${
          isHovered ? 'transform scale-[1.02]' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background gradient based on crypto */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getCryptoColor(crypto.id)} opacity-20`}></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              {crypto.image && (
                <div className="mr-2 bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
                  <img 
                    src={crypto.image} 
                    alt={crypto.name} 
                    className="w-6 h-6"
                  />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold">{crypto.name}</h3>
                <p className="text-light-400">{crypto.symbol?.toUpperCase()}</p>
              </div>
            </div>
            <FavoriteButton 
              itemId={crypto.id}
              isFavorite={isFavorite}
              type="crypto"
            />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-3xl font-bold mb-2">
              {formatCurrency(crypto.current_price)}
            </p>
            <p className={`text-lg ${getPriceChangeColor(crypto.price_change_percentage_24h)}`}>
              {formatPercentage(crypto.price_change_percentage_24h)} (24h)
            </p>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-light-500">Market Cap</p>
              <p className="font-medium">{formatCurrency(crypto.market_cap, 0)}</p>
            </div>
            <div>
              <p className="text-light-500">24h Volume</p>
              <p className="font-medium">{formatCurrency(crypto.total_volume, 0)}</p>
            </div>
            <div>
              <p className="text-light-500">7d Change</p>
              <p className={`font-medium ${getPriceChangeColor(crypto.price_change_percentage_7d_in_currency)}`}>
                {formatPercentage(crypto.price_change_percentage_7d_in_currency)}
              </p>
            </div>
            <div>
              <p className="text-light-500">Supply</p>
              <p className="font-medium">{crypto.circulating_supply?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
