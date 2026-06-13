"use client";

import type { YeastType } from "@/lib/dough";

interface YeastToggleProps {
  value: YeastType;
  onChange: (type: YeastType) => void;
}

const OPTIONS: { value: YeastType; label: string; desc: string }[] = [
  { value: "IDY", label: "Instant Dry", desc: "IDY" },
  { value: "CY", label: "Fresh / Compressed", desc: "Fresh" },
];

export function YeastToggle({ value, onChange }: YeastToggleProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-stone-700">
        Yeast type
      </legend>
      <div
        className="flex rounded-lg border border-stone-300 overflow-hidden"
        role="radiogroup"
      >
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex-1 cursor-pointer select-none text-center py-2 px-3 text-sm transition-colors ${
              value === opt.value
                ? "bg-orange-500 text-white font-medium"
                : "bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            <input
              type="radio"
              name="yeastType"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
