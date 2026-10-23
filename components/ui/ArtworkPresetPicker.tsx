'use client';

import { artworkPresets } from '@/config/artwork-presets';
import styles from './artwork.module.css';

export default function ArtworkPresetPicker({ value, onChange, disabled }: { value: string; onChange: (id: string) => void; disabled: boolean }) {
  return <div className={styles.picker}>
    <h3 className="text-sm font-semibold mb-1">What are you preparing?</h3>
    <p className="text-xs text-[var(--text-body)] mb-4">Choose a starting canvas. Fine-tune the framing below.</p>
    <div className={styles.presets} role="group" aria-label="Channel artwork presets">
      {artworkPresets.filter(item => item.primary).map(item => <button
        type="button" key={item.id} aria-pressed={value === item.id} disabled={disabled}
        onClick={() => onChange(item.id)} className={`${styles.preset} focus-ring`}
      >
        <span className={styles.folder} aria-hidden="true" data-artwork={item.id}>
          <span className={styles.sheet}><span className={styles.diagram} /></span>
          <span className={styles.pocket}>{value === item.id ? 'Selected' : 'Choose'}</span>
        </span>
        <span className="block text-xs font-semibold">{item.label}</span>
        <span className="block text-xs text-[var(--text-body)] mt-1 tabular-nums">{item.width} × {item.height}</span>
      </button>)}
    </div>
  </div>;
}
