'use client';

import { artworkPresets } from '@/config/artwork-presets';
import styles from './artwork.module.css';
import { useI18n } from '@/lib/i18n';

export default function ArtworkPresetPicker({ value, onChange, disabled }: { value: string; onChange: (id: string) => void; disabled: boolean }) {
  const { t } = useI18n();

  const getPresetLabel = (id: string, fallback: string): string => {
    switch (id) {
      case 'thumbnail':
        return t.resizer.presets.thumbnail.label;
      case 'banner':
        return t.resizer.presets.banner.label;
      case 'profile':
        return t.resizer.presets.profile.label;
      case 'watermark':
        return t.resizer.presets.watermark.label;
      default:
        return fallback;
    }
  };

  return (
    <div className={styles.picker}>
      <h3 className="text-sm font-semibold mb-1">{t.resizer.presetPickerHeading}</h3>
      <p className="text-xs text-[var(--text-body)] mb-4">{t.resizer.framingHeading}</p>
      <div className={styles.presets} role="group" aria-label="Channel artwork presets">
        {artworkPresets.filter(item => item.primary).map(item => (
          <button
            type="button"
            key={item.id}
            aria-pressed={value === item.id}
            disabled={disabled}
            onClick={() => onChange(item.id)}
            className={`${styles.preset} focus-ring cursor-pointer`}
          >
            <span className={styles.folder} aria-hidden="true" data-artwork={item.id}>
              <span className={styles.sheet}><span className={styles.diagram} /></span>
              <span className={styles.pocket}>{value === item.id ? '✓' : '→'}</span>
            </span>
            <span className="block text-xs font-semibold">{getPresetLabel(item.id, item.label)}</span>
            <span className="block text-xs text-[var(--text-body)] mt-1 tabular-nums">{item.width} × {item.height}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
