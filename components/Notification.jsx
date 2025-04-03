'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../redux/features/notificationSlice';
import { formatCurrency, formatPercentage } from '../utils/formatters';

export default function Notification({ notification }) {
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();
  
  // Auto-remove notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      closeNotification();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle notification close animation
  const closeNotification = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, 300);
  };
  
  // Get the right icon and bg color based on notification type
  const getNotificationStyle = () => {
    switch (notification.type) {
      case 'price_alert':
        return {
          color: notification.data?.change > 0 ? 'text-success' : 'text-error',
          background: notification.data?.change > 0 ? 'bg-success' : 'bg-error',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'weather_alert':
        return {
          color: 'text-warning',
          background: 'bg-warning',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          )
        };
      default:
        return {
          color: 'text-info',
          background: 'bg-info',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )
        };
    }
  };
  
  const { color, background, icon } = getNotificationStyle();
  
  // Render price alert notification content
  const renderPriceAlertContent = () => {
    const { symbol, name, price, change, percentChange } = notification.data || {};
    return (
      <>
        <div className="font-semibold">{name} Price Alert</div>
        <div className="flex items-center mt-1">
          <span className="mr-2">{formatCurrency(price)}</span>
          <span className={change > 0 ? 'text-success' : 'text-error'}>
            {formatPercentage(percentChange)}
          </span>
        </div>
      </>
    );
  };
  
  // Render weather alert notification content
  const renderWeatherAlertContent = () => {
    const { city, alert } = notification.data || {};
    return (
      <>
        <div className="font-semibold">{city} Weather Alert</div>
        <div className="mt-1">{alert}</div>
      </>
    );
  };
  
  // Render generic notification content
  const renderDefaultContent = () => {
    return (
      <>
        <div className="font-semibold">{notification.title}</div>
        <div className="mt-1">{notification.message}</div>
      </>
    );
  };
  
  return (
    <div 
      className={`max-w-xs w-full bg-dark-300 rounded-lg shadow-lg border-l-4 ${background} bg-opacity-10 border-opacity-50 transition-all duration-300 ${
        isClosing ? 'opacity-0 translate-x-full' : 'opacity-100'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${color}`}>
            {icon}
            <span className="ml-2 font-semibold">
              {notification.type === 'price_alert' ? 'Price Alert' : 
               notification.type === 'weather_alert' ? 'Weather Alert' : 'Notification'}
            </span>
          </div>
          <button 
            onClick={closeNotification}
            className="text-light-500 hover:text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mt-2 text-sm">
          {notification.type === 'price_alert' ? renderPriceAlertContent() :
           notification.type === 'weather_alert' ? renderWeatherAlertContent() :
           renderDefaultContent()}
        </div>
      </div>
    </div>
  );
}
