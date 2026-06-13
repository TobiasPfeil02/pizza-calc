"use client";

import { clamp } from "@/lib/dough";

interface SliderInputProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function SliderInput({
  id,
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: SliderInputProps) {
  const decimals = step < 1 ? String(step).split(".")[1]?.length ?? 1 : 0;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-stone-700">
          {label}
        </label>
        <div className="flex items-center gap-1">
          <input
            id={`${id}-number`}
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const parsed = parseFloat(e.target.value);
              if (!isNaN(parsed)) onChange(clamp(parsed, min, max));
            }}
            className="w-20 rounded border border-stone-300 px-2 py-0.5 text-right text-sm tabular-nums focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            aria-label={`${label} value`}
          />
          {unit && (
            <span className="text-sm text-stone-500 w-6">{unit}</span>
          )}
        </div>
      </div>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-emerald-600"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value.toFixed(decimals)}${unit ? " " + unit : ""}`}
      />
      <div className="flex justify-between text-xs text-stone-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
