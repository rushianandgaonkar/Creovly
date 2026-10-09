import React from 'react';

interface WordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-sm tracking-tight',
  md: 'text-lg tracking-tight',
  lg: 'text-2xl tracking-tighter',
};

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
};

export const Wordmark: React.FC<WordmarkProps> = ({ className = '', size = 'md' }) => {
  return (
    <div className={`inline-flex items-center gap-2 font-semibold select-none group ${className}`}>
      {/* Precision viewfinder aperture glyph */}
      <svg
        className={`${iconSizes[size]} text-[var(--text-ink)] shrink-0 transition-transform duration-200 group-hover:scale-105`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="2" />
        <path d="M9 7.5L15.5 12L9 16.5V7.5Z" fill="currentColor" />
      </svg>
      <span className={`font-bold tracking-tight text-[var(--text-ink)] ${sizeClasses[size]}`}>
        CREOVLY
      </span>
    </div>
  );
};

export default Wordmark;
