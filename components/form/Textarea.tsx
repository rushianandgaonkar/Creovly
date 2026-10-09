import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  name = id,
  rows = 4,
  placeholder,
  value,
  defaultValue,
  hint,
  error,
  required = false,
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

      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={onChange}
        className={`w-full p-3 rounded-md text-sm bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] border ${
          error ? 'border-red-500' : 'border-[var(--border-hairline)]'
        } placeholder:text-[var(--text-faint)] focus-ring transition-colors resize-y leading-relaxed`}
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

export default Textarea;
