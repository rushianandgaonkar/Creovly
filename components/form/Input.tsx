import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  name = id,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  error,
  hint,
  required = false,
  disabled = false,
  className = '',
  onChange,
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-[var(--text-ink)] select-none">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-[11px] text-[var(--text-muted)]">{hint}</span>}
      </div>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={onChange}
        className={`h-9 px-3 rounded-md text-sm bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] border ${
          error ? 'border-red-500' : 'border-[var(--border-hairline)]'
        } placeholder:text-[var(--text-faint)] focus-ring transition-colors disabled:opacity-50 disabled:bg-[var(--bg-canvas-subtle)]`}
        {...rest}
      />

      {error && (
        <p id={`${id}-error`} className="text-[11px] text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
