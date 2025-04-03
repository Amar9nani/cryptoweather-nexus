'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="mb-8 text-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <p className="text-light-400 text-center max-w-md mb-8">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <button
        onClick={() => reset()}
        className="btn-primary mb-4"
      >
        Try Again
      </button>
      <button
        onClick={() => window.location.href = '/'}
        className="btn-secondary"
      >
        Return to Dashboard
      </button>
    </div>
  );
}
