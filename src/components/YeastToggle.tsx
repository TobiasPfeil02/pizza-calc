"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { YeastType } from "@/lib/dough";

interface YeastToggleProps {
  value: YeastType;
  onChange: (type: YeastType) => void;
}

export function YeastToggle({ value, onChange }: YeastToggleProps) {
  const { t } = useLanguage();

  const options: { value: YeastType; label: string }[] = [
    { value: "IDY", label: t.instantDry },
    { value: "CY", label: t.freshCompressed },
  ];

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-stone-700">
        {t.yeastType}
      </legend>
      <div
        className="flex rounded-lg border border-stone-300 overflow-hidden"
        role="radiogroup"
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex-1 cursor-pointer select-none text-center py-2 px-3 text-sm transition-colors ${
              value === opt.value
                ? "bg-emerald-600 text-white font-medium"
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
