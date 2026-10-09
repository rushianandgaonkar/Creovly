import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: SelectOption[];
  hint?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  id,
  name = id,
  options,
  value,
  defaultValue,
  hint,
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

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className="h-9 w-full px-3 pr-8 rounded-md text-sm bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] border border-[var(--border-hairline)] focus-ring appearance-none cursor-pointer transition-colors"
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-[var(--text-muted)]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
