'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf8f5] text-[#1f2937] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold mx-auto">
            !
          </div>
          <h2 className="text-xl font-bold text-gray-900">Application Failure</h2>
          <p className="text-xs text-gray-600">
            A critical error prevented the application shell from rendering.
          </p>
          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
            >
              Reload Workspace
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

