"use client";

import { PRESETS, type DoughState, type Preset } from "@/lib/dough";
import { useLanguage } from "@/context/LanguageContext";
import type { Translations } from "@/lib/i18n";

function isActive(preset: Preset, state: DoughState): boolean {
  const p = preset.state;
  return (
    state.ballsCount === p.ballsCount &&
    state.ballWeight === p.ballWeight &&
    state.waterPercent === p.waterPercent &&
    state.saltPercent === p.saltPercent &&
    state.roomTime === p.roomTime &&
    state.roomTemp === p.roomTemp &&
    state.fridgeTime === p.fridgeTime &&
    state.fridgeTemp === p.fridgeTemp
  );
}

function getLabels(key: Preset["key"], t: Translations): { main: string; sub: string } {
  if (key === "quick") return { main: t.presetQuick, sub: t.presetQuickSub };
  if (key === "24h")   return { main: t.preset24h,   sub: t.preset24hSub };
  return                        { main: t.preset48h,   sub: t.preset48hSub };
}

interface Props {
  state: DoughState;
  onSelect: (state: DoughState) => void;
}

export function PresetsBar({ state, onSelect }: Props) {
  const { t } = useLanguage();

  return (
    <section>
      <h2 className="mb-3 text-base font-semibold uppercase tracking-wider text-stone-400">
        {t.presetsSection}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map((preset) => {
          const active = isActive(preset, state);
          const { main, sub } = getLabels(preset.key, t);
          return (
            <button
              key={preset.key}
              onClick={() => onSelect(preset.state)}
              className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                active
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <div className={`text-sm font-semibold ${active ? "text-emerald-800" : "text-stone-700"}`}>
                {main}
              </div>
              <div className="mt-0.5 text-xs text-stone-400">{sub}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
