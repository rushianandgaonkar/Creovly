'use client';

import React, { useState } from 'react';

export interface DropZoneProps {
  id: string;
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  privacyNote?: string;
  className?: string;
  onFileSelect?: (file: File) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
  id,
  label = 'Upload file',
  accept = 'image/jpeg,image/png,image/webp',
  maxSizeMB = 2,
  privacyNote = 'Preview · No processing',
  className = '',
  onFileSelect,
  onError,
  disabled = false,
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const selectFiles = (files: FileList | null) => {
    if (disabled || !files?.length) return;
    if (files.length !== 1) { onError?.('Choose one image at a time.'); return; }
    const file = files[0];
    if (file.size > maxSizeMB * 1_000_000) { onError?.(`Choose an image under ${maxSizeMB} MB.`); return; }
    setSelectedFileName(file.name);
    onFileSelect?.(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectFiles(e.target.files);
    e.target.value = '';
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--text-ink)] select-none">
          {label}
        </span>
        {privacyNote && (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            {privacyNote}
          </span>
        )}
      </div>

      <label
        htmlFor={id}
        onDragOver={onFileSelect ? (event) => { event.preventDefault(); if (!disabled) setDragging(true); } : undefined}
        onDragLeave={() => setDragging(false)}
        onDrop={onFileSelect ? (event) => { event.preventDefault(); setDragging(false); selectFiles(event.dataTransfer.files); } : undefined}
        className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed ${dragging ? 'border-[var(--brand-accent)]' : 'border-[var(--border-hairline)]'} hover:border-[var(--brand-accent)] rounded-xl bg-[var(--bg-canvas-subtle)] hover:bg-[var(--bg-canvas-elevated)] transition-colors duration-200 cursor-pointer group text-center focus-within:outline-2 focus-within:outline-[var(--brand-accent)] focus-within:outline-offset-2 ${disabled ? 'opacity-50' : ''}`}
      >
        <input
          id={id}
          type="file"
          accept={accept}
          disabled={disabled}
          aria-label={label}
          onChange={handleFileChange}
          className="sr-only"
        />

        <div className="w-10 h-10 mb-3 rounded-full bg-[var(--bg-canvas-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--brand-accent)] group-hover:scale-105 transition-all">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
        </div>

        <p className="text-sm font-medium text-[var(--text-ink)]">
          {selectedFileName ? <span className="break-all">{selectedFileName}</span> : onFileSelect ? 'Choose an image or drag it here' : 'Choose a sample file'}
        </p>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          JPG, PNG, or WebP · {onFileSelect ? 'Maximum' : 'Planned limit:'} {maxSizeMB} MB
        </p>
      </label>
    </div>
  );
};

export default DropZone;
