/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121212',
        secondary: '#1E1E1E',
        accent: '#3366FF',
        success: '#00C853',
        error: '#FF5252',
        warning: '#FFD740',
        info: '#40C4FF',
        dark: {
          100: '#2D2D2D',
          200: '#252525',
          300: '#1E1E1E',
          400: '#171717',
          500: '#121212',
          600: '#0E0E0E',
          700: '#0A0A0A',
          800: '#050505',
          900: '#000000',
        },
        light: {
          100: '#FFFFFF',
          200: '#F5F5F5',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        crypto: {
          bitcoin: '#F7931A',
          ethereum: '#627EEA',
          xrp: '#23292F',
          litecoin: '#345D9D',
        },
        weather: {
          sunny: '#FFD700',
          cloudy: '#A9A9A9',
          rainy: '#4682B4',
          stormy: '#483D8B',
          snowy: '#F0F8FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      boxShadow: {
        'dark': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 15px rgba(51, 102, 255, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
