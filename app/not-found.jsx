'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-light-400 text-center max-w-md mb-8">
        We couldn't find the page you're looking for. The page might have been removed or the URL might be incorrect.
      </p>
      <Link href="/">
        <button className="btn-primary">
          Return to Dashboard
        </button>
      </Link>
    </div>
  );
}
