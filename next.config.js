/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'assets.coingecko.com', 'cryptocompare.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/city',
        destination: '/',
        permanent: true,
      },
      {
        source: '/crypto',
        destination: '/',
        permanent: true,
      },
    ];
  },
  env: {
    WEATHER_API_KEY: process.env.NEXT_PUBLIC_WEATHER_API_KEY || process.env.VITE_WEATHER_API_KEY,
    CRYPTO_API_KEY: process.env.NEXT_PUBLIC_CRYPTO_API_KEY || process.env.VITE_CRYPTO_API_KEY,
    NEWS_API_KEY: process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.VITE_NEWS_API_KEY,
  }
};

module.exports = nextConfig;
