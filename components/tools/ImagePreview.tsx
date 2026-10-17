'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function useBlobUrl(blob?: Blob) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (!blob) { setUrl(''); return; }
    const next = URL.createObjectURL(blob); setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [blob]);
  return url;
}

export default function ImagePreview({ url, title, width, height, frame, transparencyGrid = false }: { url: string; title: string; width: number; height: number; transparencyGrid?: boolean; frame?: { width: number; height: number; fit: 'cover' | 'contain'; x: number; y: number; background: string } }) {
  return <figure className="space-y-2">
    <figcaption className="text-xs font-medium">{title}</figcaption>
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] overflow-hidden" style={transparencyGrid ? { backgroundColor: '#ffffff', backgroundImage: 'conic-gradient(#d4d4d4 25%, transparent 0 50%, #d4d4d4 0 75%, transparent 0)', backgroundSize: '16px 16px' } : undefined}>
      {frame ? <div className="relative mx-auto" style={{ width: `min(100%, ${256 * frame.width / frame.height}px)`, aspectRatio: `${frame.width}/${frame.height}`, background: frame.background }}><Image unoptimized fill sizes="500px" src={url} alt={`${title} thumbnail preview`} style={{ objectFit: frame.fit, objectPosition: frame.fit === 'cover' ? `${frame.x}% ${frame.y}%` : '50% 50%' }} /></div> : <Image unoptimized src={url} alt={`${title} thumbnail preview`} width={width} height={height} className="w-full h-auto max-h-64 object-contain" />}
    </div>
  </figure>;
}
