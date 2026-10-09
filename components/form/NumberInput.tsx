import React from 'react';

export interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  prefix?: string;
  suffix?: string;
  hint?: string;
  error?: string;
  className?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  id,
  name = id,
  min,
  max,
  step = 1,
  value,
  defaultValue,
  prefix,
  suffix,
  placeholder,
  hint,
  error,
  className = '',
  onChange,
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-[var(--text-ink)] select-none">
          {label}
        </label>
        {hint && <span className="text-[11px] text-[var(--text-muted)]">{hint}</span>}
      </div>

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-sm text-[var(--text-muted)] select-none pointer-events-none tabular-nums font-mono">
            {prefix}
          </span>
        )}

        <input
          id={id}
          name={name}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          className={`h-9 w-full rounded-md text-sm bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] border border-[var(--border-hairline)] placeholder:text-[var(--text-faint)] focus-ring transition-colors tabular-nums font-mono ${
            prefix ? 'pl-8' : 'px-3'
          } ${suffix ? 'pr-12' : 'pr-3'}`}
          {...rest}
        />

        {suffix && (
          <span className="absolute right-3 text-xs text-[var(--text-muted)] select-none pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default NumberInput;
