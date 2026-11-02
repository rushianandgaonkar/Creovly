'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { SampleImageOption } from '@/config/tool-samples';
import { useI18n } from '@/lib/i18n';

export interface DropZoneProps {
  id: string;
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  privacyNote?: string;
  className?: string;
  onFileSelect?: (file: File) => void;
  onFilesSelect?: (files: File[]) => boolean | void;
  onError?: (message: string) => void;
  disabled?: boolean;
  samples?: SampleImageOption[];
}

export const DropZone: React.FC<DropZoneProps> = ({
  id,
  label,
  accept = 'image/jpeg,image/png,image/webp',
  maxSizeMB = 2,
  privacyNote,
  className = '',
  onFileSelect,
  onFilesSelect,
  onError,
  disabled = false,
  samples,
}) => {
  const { t } = useI18n();
  const effectiveLabel = label || t.common.dropzone.labelDefault;
  const effectivePrivacyNote = privacyNote || t.common.dropzone.localPrivacyNote;

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loadingSampleId, setLoadingSampleId] = useState<string | null>(null);
  const sampleRequest = useRef(0);
  useEffect(() => () => { sampleRequest.current++; }, []);
  useEffect(() => { if (disabled) { sampleRequest.current++; setLoadingSampleId(null); } }, [disabled]);
  const acceptsFiles = Boolean(onFileSelect || onFilesSelect);

  const selectFiles = (files: FileList | null) => {
    if (disabled || !files?.length) return;
    sampleRequest.current++; setLoadingSampleId(null);
    if (onFilesSelect) {
      if (onFilesSelect(Array.from(files)) !== false) {
        setSelectedFileName(`${files.length} images`);
      }
      return;
    }
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

  const handleSampleClick = async (sample: SampleImageOption) => {
    if (disabled || !acceptsFiles) return;
    const request = ++sampleRequest.current;
    setLoadingSampleId(sample.id);
    try {
      const response = await fetch(sample.src);
      if (!response.ok) throw new Error('Could not load sample asset');
      const blob = await response.blob();
      const file = new File([blob], sample.fileName, { type: blob.type || 'image/png' });
      if (request !== sampleRequest.current) return;
      setSelectedFileName(file.name);
      if (onFilesSelect) onFilesSelect([file]); else onFileSelect?.(file);
    } catch {
      if (request === sampleRequest.current) onError?.('Could not load sample. Please choose another file.');
    } finally {
      if (request === sampleRequest.current) setLoadingSampleId(null);
    }
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--text-ink)] select-none">
          {effectiveLabel}
        </span>
        {effectivePrivacyNote && (
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
            {effectivePrivacyNote}
          </span>
        )}
      </div>

      <label
        htmlFor={id}
        onDragOver={acceptsFiles ? (event) => { event.preventDefault(); if (!disabled) setDragging(true); } : undefined}
        onDragLeave={() => setDragging(false)}
        onDrop={acceptsFiles ? (event) => { event.preventDefault(); setDragging(false); selectFiles(event.dataTransfer.files); } : undefined}
        className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed ${dragging ? 'border-[var(--brand-accent)]' : 'border-[var(--border-hairline)]'} hover:border-[var(--brand-accent)] rounded-xl bg-[var(--bg-canvas-subtle)] hover:bg-[var(--bg-canvas-elevated)] transition-colors duration-200 cursor-pointer group text-center focus-within:outline-2 focus-within:outline-[var(--brand-accent)] focus-within:outline-offset-2 ${disabled ? 'opacity-50' : ''}`}
      >
        <input
          id={id}
          type="file"
          multiple={Boolean(onFilesSelect)}
          accept={accept}
          disabled={disabled}
          aria-label={effectiveLabel}
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
          {selectedFileName ? (
            <span className="break-all">{selectedFileName}</span>
          ) : (
            t.common.dropzone.labelDefault
          )}
        </p>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          JPG, PNG, WebP · {t.common.dropzone.maxSize} {maxSizeMB} MB
        </p>
      </label>

      {/* 1-Click Creator Sample Presets */}
      {samples && samples.length > 0 && acceptsFiles && (
        <div className="mt-1 pt-2 border-t border-[var(--border-hairline-subtle)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[var(--text-body)]">
              {t.common.dropzone.sampleButtonPrefix}
            </span>
            <span className="text-[10px] font-mono text-[var(--brand-accent)] font-medium">
              {t.common.dropzone.oneClickTest}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {samples.map((sample) => {
              const isCurrentLoading = loadingSampleId === sample.id;
              return (
                <button
                  key={sample.id}
                  type="button"
                  disabled={disabled || loadingSampleId !== null}
                  onClick={() => handleSampleClick(sample)}
                  aria-label={`${t.common.dropzone.sampleButtonPrefix} ${sample.label}`}
                  className="flex items-center gap-2 p-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] hover:border-[var(--brand-accent)] hover:bg-[var(--bg-canvas-subtle)] transition-all text-left focus-ring disabled:opacity-50 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline-subtle)] shrink-0 overflow-hidden flex items-center justify-center p-0.5">
                    <Image
                      unoptimized
                      src={sample.src}
                      alt=""
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-[var(--text-ink)] truncate group-hover:text-[var(--brand-accent)]">
                      {isCurrentLoading ? 'Loading…' : sample.label}
                    </span>
                    {sample.category && (
                      <span className="block text-[10px] font-mono text-[var(--text-muted)] truncate">
                        {sample.category}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
