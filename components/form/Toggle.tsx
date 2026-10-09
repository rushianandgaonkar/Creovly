import React from 'react';

export interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  hint?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  id,
  name = id,
  checked,
  defaultChecked = false,
  hint,
  className = '',
  onChange,
  ...rest
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-start justify-between gap-4 cursor-pointer select-none ${className}`}
    >
      <div className="flex flex-col">
        <span className="text-xs font-medium text-[var(--text-ink)] leading-snug">{label}</span>
        {hint && (
          <span className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-0.5">
            {hint}
          </span>
        )}
      </div>

      <div className="relative inline-flex items-center shrink-0">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          defaultChecked={checked !== undefined ? undefined : defaultChecked}
          onChange={onChange}
          className="peer sr-only"
          {...rest}
        />
        <div className="w-9 h-5 bg-[var(--border-hairline-strong)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--brand-accent)] rounded-full peer peer-checked:bg-[var(--brand-accent)] transition-colors"></div>
        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
      </div>
    </label>
  );
};

export default Toggle;
