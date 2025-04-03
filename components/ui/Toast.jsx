import { useEffect, useState } from 'react';

export default function Toast({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  position = 'bottom-right'
}) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };
  
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-success bg-opacity-10',
          borderColor: 'border-success',
          iconColor: 'text-success',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'error':
        return {
          bgColor: 'bg-error bg-opacity-10',
          borderColor: 'border-error',
          iconColor: 'text-error',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'warning':
        return {
          bgColor: 'bg-warning bg-opacity-10',
          borderColor: 'border-warning',
          iconColor: 'text-warning',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )
        };
      default: // info
        return {
          bgColor: 'bg-info bg-opacity-10',
          borderColor: 'border-info',
          iconColor: 'text-info',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )
        };
    }
  };
  
  const styles = getTypeStyles();
  
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      default: // bottom-right
        return 'bottom-4 right-4';
    }
  };
  
  return (
    <div 
      className={`fixed ${getPositionClasses()} z-50 max-w-sm w-full transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div 
        className={`${styles.bgColor} border-l-4 ${styles.borderColor} p-4 rounded-lg shadow-lg`}
      >
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${styles.iconColor}`}>
            {styles.icon}
          </div>
          
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-white">{message}</p>
          </div>
          
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-transparent rounded-md inline-flex text-light-500 hover:text-white focus:outline-none"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
