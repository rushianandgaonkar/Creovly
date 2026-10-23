'use client';

import React, { useState } from 'react';
import { Slider as AnimatedSlider } from '@/components/ui/slider';

export interface SliderProps {
  label: string;
  id: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  unit?: string;
  className?: string;
  onChange?: (val: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  id,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  unit = '',
  className = '',
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<number>(
    value !== undefined ? value : defaultValue
  );

  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (vals: number[]) => {
    const nextVal = vals[0] ?? min;
    if (value === undefined) {
      setInternalValue(nextVal);
    }
    if (onChange) {
      onChange(nextVal);
    }
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <label htmlFor={id} className="font-medium text-[var(--text-ink)] select-none">
          {label}
        </label>
        <span className="font-mono tabular-nums text-[var(--text-body)]" id={`${id}-display`}>
          {currentValue}{unit}
        </span>
      </div>

      <AnimatedSlider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[currentValue]}
        onValueChange={handleValueChange}
        className="w-full cursor-pointer py-1"
      />

      <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] select-none">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};

export default Slider;
