'use client';

import React from 'react';

export const ThemeToggle: React.FC = () => {
  const toggleTheme = () => {
    if (typeof document === 'undefined') return;
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('creovly-theme', 'light');
      } catch (_) {}
    } else {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('creovly-theme', 'dark');
      } catch (_) {}
    }
  };

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark color theme"
      className="relative inline-flex items-center justify-center w-8 h-8 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] hover:text-[var(--text-ink)] hover:border-[var(--border-hairline-strong)] focus-ring transition-colors duration-150 cursor-pointer"
    >
      {/* Sun Icon (shows in dark mode) */}
      <svg
        className="w-4 h-4 hidden dark:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      {/* Moon Icon (shows in light mode) */}
      <svg
        className="w-4 h-4 block dark:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};

export default ThemeToggle;
