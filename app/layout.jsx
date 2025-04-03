import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReduxProvider from '../redux/provider';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CryptoWeather Nexus',
  description: 'A modern dashboard for weather data, cryptocurrency information, and news with real-time updates',
  keywords: 'weather, cryptocurrency, news, dashboard, real-time, Next.js',
  authors: [{ name: 'Developer' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#121212',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <ReduxProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
