# CryptoWeather Nexus

A modern, responsive dashboard built with Next.js that combines weather data, cryptocurrency information, and news with real-time updates.

## Features

- **Multi-Page Dashboard**: Weather data, cryptocurrency information, and news headlines
- **Real-Time Updates**: WebSocket integration for live cryptocurrency price updates
- **Responsive Design**: Works on devices of all sizes
- **Dark Theme**: Sleek black-themed UI for better readability
- **Favorites System**: Save your favorite cities and cryptocurrencies
- **Interactive Charts**: Historical data visualization
- **Notifications**: Real-time alerts for significant price changes

## Technology Stack

- **Frontend**: Next.js 13+, React Hooks, Tailwind CSS
- **State Management**: Redux with Redux Thunk
- **APIs**: 
  - Weather: WeatherAPI.com
  - Cryptocurrency: CryptoCompare
  - News: News API
- **Real-Time Data**: WebSocket for live price updates
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cryptoweather-nexus.git
   cd cryptoweather-nexus
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your API keys:
   ```
   VITE_WEATHER_API_KEY=your_weather_api_key
   VITE_CRYPTO_API_KEY=your_crypto_api_key
   VITE_NEWS_API_KEY=your_news_api_key
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for easy deployment to Vercel. Connect your GitHub repository to Vercel and it will automatically deploy your application.

Make sure to add your environment variables in the Vercel dashboard:
- `VITE_WEATHER_API_KEY`
- `VITE_CRYPTO_API_KEY`
- `VITE_NEWS_API_KEY`

## Design Decisions

- **Black Theme**: Chosen for reduced eye strain during extended use and to make data visualization pop
- **Modular Component Structure**: For easier maintenance and code reusability
- **Redux for Global State**: To manage complex state across the application
- **WebSocket Integration**: For real-time data without constant API polling
- **Responsive Design First**: Built from the ground up to work on all device sizes
- **Error Handling**: Graceful degradation when API calls fail

## License

This project is licensed under the MIT License - see the LICENSE file for details.
