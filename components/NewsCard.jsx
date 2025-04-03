'use client';

import { useState } from 'react';
import { formatDate } from '../utils/formatters';

export default function NewsCard({ article }) {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!article || !article.title) {
    return (
      <div className="card h-24 flex items-center justify-center">
        <p className="text-light-500">News data unavailable</p>
      </div>
    );
  }
  
  // Function to extract source name from URL
  const getSourceName = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '').split('.')[0];
    } catch(e) {
      return 'news source';
    }
  };
  
  // List of placeholder images in case the article doesn't have one
  const placeholders = [
    "https://images.unsplash.com/photo-1495020689067-958852a7765e",
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    "https://images.unsplash.com/photo-1560957123-e8e019c66980",
    "https://images.unsplash.com/photo-1581092787765-e3feb951d987",
    "https://images.unsplash.com/photo-1585282263861-f55e341878f8",
    "https://images.unsplash.com/photo-1557804506-e969d7b32a4b"
  ];
  
  // Get random placeholder image
  const getPlaceholderImage = () => {
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    return placeholders[randomIndex];
  };
  
  const image = article.urlToImage || getPlaceholderImage();
  const sourceName = article.source?.name || getSourceName(article.url);
  
  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="card flex transition-all duration-300"
      style={{ boxShadow: isHovered ? '0 0 15px rgba(51, 102, 255, 0.5)' : 'none' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="w-1/3 md:w-1/4 h-32 overflow-hidden rounded-lg mr-4 flex-shrink-0"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <div 
          className="w-full h-full bg-cover bg-center transition-all duration-300"
          style={{ 
            backgroundImage: `url(${image})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        ></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-md" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>{article.title}</h3>
          {article.description && (
            <p className="text-sm mt-1 hidden md:block" style={{
              color: '#9e9e9e',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {article.description}
            </p>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-2 text-xs" style={{ color: '#9e9e9e' }}>
          <div className="font-medium">{sourceName}</div>
          {article.publishedAt && <div>{formatDate(article.publishedAt)}</div>}
        </div>
      </div>
    </a>
  );
}
