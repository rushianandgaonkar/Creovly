export interface SampleImageOption {
  id: string;
  label: string;
  category?: string;
  src: string;
  fileName: string;
  width?: number;
  height?: number;
}

export const toolSamples: Record<string, SampleImageOption[]> = {
  'logo-background-remover': [
    {
      id: 'gaming-badge',
      label: 'Gaming Crest',
      category: 'Shield Badge',
      src: '/examples/sample-gaming-badge.png',
      fileName: 'gaming-crest.png',
      width: 800,
      height: 600,
    },
    {
      id: 'podcast-logo',
      label: 'Podcast Studio',
      category: 'Microphone Emblem',
      src: '/examples/sample-podcast-logo.png',
      fileName: 'podcast-studio.png',
      width: 800,
      height: 600,
    },
    {
      id: 'creator-mark',
      label: 'Creator Mark',
      category: 'Monogram Symbol',
      src: '/examples/sample-creator-mark.png',
      fileName: 'creator-mark.png',
      width: 800,
      height: 600,
    },
    {
      id: 'frame-lab',
      label: 'Frame Lab',
      category: 'Wordmark Emblem',
      src: '/examples/logo-source.png',
      fileName: 'frame-lab-logo.png',
      width: 800,
      height: 480,
    },
  ],
  'youtube-thumbnail-compressor': [
    {
      id: 'vlog-still',
      label: 'Studio Vlog',
      category: '1600 × 1000 · JPEG',
      src: '/examples/compressor-source.jpg',
      fileName: 'studio-vlog.jpg',
      width: 1600,
      height: 1000,
    },
    {
      id: 'creator-desk',
      label: 'Creator Desk',
      category: '1600 × 1000 · PNG',
      src: '/examples/thumbnail-source.png',
      fileName: 'creator-desk.png',
      width: 1600,
      height: 1000,
    },
    {
      id: 'gaming-badge',
      label: 'Gaming Crest',
      category: '800 × 600 · Badge',
      src: '/examples/sample-gaming-badge.png',
      fileName: 'gaming-crest.png',
      width: 800,
      height: 600,
    },
  ],
  'youtube-thumbnail-resizer': [
    {
      id: 'creator-desk',
      label: 'Creator Desk',
      category: '1600 × 1000 · Wide',
      src: '/examples/thumbnail-source.png',
      fileName: 'creator-desk.png',
      width: 1600,
      height: 1000,
    },
    {
      id: 'vlog-still',
      label: 'Studio Vlog',
      category: '1600 × 1000 · Still',
      src: '/examples/compressor-source.jpg',
      fileName: 'studio-vlog.jpg',
      width: 1600,
      height: 1000,
    },
    {
      id: 'gaming-badge',
      label: 'Channel Badge',
      category: '800 × 600 · Badge',
      src: '/examples/sample-gaming-badge.png',
      fileName: 'gaming-crest.png',
      width: 800,
      height: 600,
    },
  ],
  'youtube-shorts-safe-zone': [
    {
      id: 'shorts-frame',
      label: 'Vertical Frame',
      category: '1080 × 1920 · 9:16',
      src: '/examples/shorts-source.png',
      fileName: 'shorts-frame.png',
      width: 1080,
      height: 1920,
    },
  ],
};
