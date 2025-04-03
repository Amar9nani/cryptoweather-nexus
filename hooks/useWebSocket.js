'use client';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { initWebSocket, simulateWeatherAlert } from '../services/websocketService';

/**
 * Custom hook for WebSocket connection
 */
export default function useWebSocket() {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const weatherAlertIntervalRef = useRef(null);
  
  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = initWebSocket();
    
    // Set up simulated weather alerts at random intervals
    const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Berlin', 'Sydney'];
    
    weatherAlertIntervalRef.current = setInterval(() => {
      // 10% chance of weather alert
      if (Math.random() < 0.1) {
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        simulateWeatherAlert(randomCity);
      }
    }, 60000); // Check every minute
    
    // Clean up on unmount
    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
      
      if (weatherAlertIntervalRef.current) {
        clearInterval(weatherAlertIntervalRef.current);
      }
    };
  }, [dispatch]);
  
  return {
    socket: socketRef.current
  };
}
