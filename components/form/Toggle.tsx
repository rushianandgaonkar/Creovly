'use client';

import React from 'react';
import { Switch } from '@/components/ui/switch';

export interface ToggleProps {
  label: string;
  id: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  hint?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckedChange?: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  id,
  name = id,
  checked,
  defaultChecked = false,
  disabled = false,
  hint,
  className = '',
  onChange,
  onCheckedChange,
}) => {
  const handleCheckedChange = (nextChecked: boolean) => {
    if (onCheckedChange) {
      onCheckedChange(nextChecked);
    }
    if (onChange) {
      // Synthesize change event for backwards compatibility
      const syntheticEvent = {
        target: {
          id,
          name,
          type: 'checkbox',
          checked: nextChecked,
        },
        currentTarget: {
          id,
          name,
          type: 'checkbox',
          checked: nextChecked,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div
      className={`flex items-start justify-between gap-4 select-none ${className}`}
    >
      <label htmlFor={id} className="flex flex-col cursor-pointer">
        <span className="text-xs font-medium text-[var(--text-ink)] leading-snug">{label}</span>
        {hint && (
          <span className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-0.5">
            {hint}
          </span>
        )}
      </label>

      <div className="relative inline-flex items-center shrink-0 pt-0.5">
        <Switch
          id={id}
          name={name}
          disabled={disabled}
          checked={checked}
          defaultChecked={checked !== undefined ? undefined : defaultChecked}
          onCheckedChange={handleCheckedChange}
        />
      </div>
    </div>
  );
};

export default Toggle;
