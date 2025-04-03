export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-600 py-6 mt-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <div className="text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="ml-2 font-bold text-white">CryptoWeather Nexus</span>
            </div>
            <p className="text-light-500 text-sm mt-2 text-center md:text-left">
              Providing real-time weather, crypto, and news updates.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <a 
              href="#" 
              className="text-light-400 hover:text-white text-sm transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-light-400 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-light-400 hover:text-white text-sm transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
        
        <div className="border-t border-dark-400 mt-6 pt-6 text-center md:text-left">
          <p className="text-light-600 text-xs">
            &copy; {currentYear} CryptoWeather Nexus. All rights reserved.
          </p>
          <p className="text-light-600 text-xs mt-1">
            Data provided by WeatherAPI, CryptoCompare, and News API.
          </p>
        </div>
      </div>
    </footer>
  );
}
