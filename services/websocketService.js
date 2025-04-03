/**
 * WebSocket service for real-time cryptocurrency price updates
 * Using CoinCap WebSocket API
 */
import { store } from '../redux/store';
import { updateCryptoPriceWebSocket } from '../redux/features/cryptoSlice';
import { addNotification } from '../redux/features/notificationSlice';

// CoinCap WebSocket URL
const WEBSOCKET_URL = 'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,ripple,litecoin,cardano,polkadot';

// Store previous prices to calculate changes
let previousPrices = {};

/**
 * Initialize WebSocket connection to CoinCap API
 * @returns {WebSocket|null} The WebSocket connection or null
 */
export function initWebSocket() {
  // Don't attempt to create WebSocket on server-side
  if (typeof window === 'undefined') return null;
  
  let socket = null;
  
  try {
    // Create new WebSocket connection
    socket = new WebSocket(WEBSOCKET_URL);
    
    socket.onopen = () => {
      console.log('WebSocket connection established');
      // Add connected status to store if needed
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handlePriceUpdate(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    socket.onclose = (event) => {
      console.log('WebSocket connection closed', event.code, event.reason);
      
      // If this was a normal closure (code 1000), don't reconnect
      if (event.code === 1000) return;
      
      // For abnormal closures, attempt to reconnect after a delay
      setTimeout(() => {
        console.log('Attempting to reconnect WebSocket...');
        initWebSocket();
      }, 5000);
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      
      // If socket is still open on error, close it
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      
      // Return simulated data to keep UI working
      simulatePriceUpdates();
    };
  } catch (error) {
    console.error('Error initializing WebSocket:', error);
    simulatePriceUpdates();
    return null;
  }
  
  return socket;
}

// Function to simulate price updates in case WebSocket fails
function simulatePriceUpdates() {
  console.log('Simulating price updates since WebSocket failed');
  // Common crypto IDs
  const cryptoIds = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'cardano', 'polkadot'];
  
  // Every 10 seconds, dispatch simulated price update
  const interval = setInterval(() => {
    const randomCrypto = cryptoIds[Math.floor(Math.random() * cryptoIds.length)];
    const basePrice = getBasePrice(randomCrypto);
    const smallChange = (Math.random() * 0.02) - 0.01; // -1% to +1%
    const newPrice = basePrice * (1 + smallChange);
    
    // Create a small price update
    const update = {
      [randomCrypto]: newPrice.toString()
    };
    
    handlePriceUpdate(update);
  }, 10000);
  
  // Clear interval after 5 minutes to prevent memory leaks
  setTimeout(() => clearInterval(interval), 300000);
}

// Helper function to get base prices for simulation
function getBasePrice(id) {
  const basePrices = {
    'bitcoin': 35000,
    'ethereum': 2200,
    'ripple': 0.50,
    'litecoin': 80,
    'cardano': 0.40,
    'polkadot': 5.50
  };
  
  return basePrices[id] || 100;
}

/**
 * Handle price update from WebSocket
 * @param {Object} priceData - Price data for cryptocurrencies
 */
function handlePriceUpdate(priceData) {
  for (const [id, priceStr] of Object.entries(priceData)) {
    const price = parseFloat(priceStr);
    const prevPrice = previousPrices[id] || price;
    const change = ((price - prevPrice) / prevPrice) * 100;
    
    // Dispatch action to update price in store
    store.dispatch(updateCryptoPriceWebSocket({
      id,
      price,
      change
    }));
    
    // Add notification for significant price changes (>= 0.5%)
    if (Math.abs(change) >= 0.5) {
      // Map CoinCap IDs to more readable names
      const nameMap = {
        'bitcoin': 'Bitcoin',
        'ethereum': 'Ethereum',
        'ripple': 'XRP',
        'litecoin': 'Litecoin',
        'cardano': 'Cardano',
        'polkadot': 'Polkadot'
      };
      
      store.dispatch(addNotification({
        type: 'price_alert',
        title: `${nameMap[id] || id} Price Alert`,
        message: `${nameMap[id] || id} price changed by ${change.toFixed(2)}%`,
        data: {
          name: nameMap[id] || id,
          symbol: id.substring(0, 3).toUpperCase(),
          price,
          change,
          percentChange: change
        }
      }));
    }
    
    // Update previous price
    previousPrices[id] = price;
  }
}

/**
 * Simulates a weather alert for testing notifications
 * @param {string} city - City name
 */
export function simulateWeatherAlert(city) {
  const alertTypes = [
    'Heavy Rain Warning',
    'Thunderstorm Alert',
    'Severe Heat Warning',
    'High Wind Advisory',
    'Flash Flood Warning',
    'Winter Storm Warning'
  ];
  
  const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
  
  store.dispatch(addNotification({
    type: 'weather_alert',
    title: `${city} Weather Alert`,
    message: randomAlert,
    data: {
      city,
      alert: randomAlert,
      severity: 'moderate',
      time: new Date().toISOString()
    }
  }));
}

export default {
  initWebSocket,
  simulateWeatherAlert
};
