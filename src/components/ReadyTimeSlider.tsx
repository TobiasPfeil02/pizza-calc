"use client";

import { useEffect, useState } from "react";
import { clamp, RANGES } from "@/lib/dough";
import { useLanguage } from "@/context/LanguageContext";
import { LOCALE_TAG } from "@/lib/i18n";

const PREP_HOURS = 45 / 60;

interface ReadyTimeSliderProps {
  roomTime: number;
  fridgeTime: number;
  onFridgeTimeChange: (value: number) => void;
}

function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function ReadyTimeSlider({ roomTime, fridgeTime, onFridgeTimeChange }: ReadyTimeSliderProps) {
  const [now, setNow] = useState<Date | null>(null);
  const { locale, t } = useLanguage();

  useEffect(() => {
    setNow(new Date());
  }, []);

  const tag = LOCALE_TAG[locale];
  const totalHours = PREP_HOURS + roomTime + fridgeTime;
  const sliderMin = PREP_HOURS + roomTime;
  const sliderMax = PREP_HOURS + roomTime + RANGES.fridgeTime.max;

  const readyDate = now ? new Date(now.getTime() + totalHours * 3_600_000) : null;

  function formatReadyTime(date: Date): string {
    const timeStr = date.toLocaleTimeString(tag, { hour: "2-digit", minute: "2-digit" });
    const ref = new Date(); // fresh "now" inside render
    const tomorrow = new Date(ref);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === ref.toDateString())
      return `${t.today} ${t.at} ${timeStr}`;
    if (date.toDateString() === tomorrow.toDateString())
      return `${t.tomorrow} ${t.at} ${timeStr}`;
    return (
      date.toLocaleDateString(tag, { weekday: "short", month: "short", day: "numeric" }) +
      ` ${t.at} ${timeStr}`
    );
  }

  function handleChange(newTotal: number) {
    const raw = newTotal - PREP_HOURS - roomTime;
    onFridgeTimeChange(clamp(raw, RANGES.fridgeTime.min, RANGES.fridgeTime.max));
  }

  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
        <label htmlFor="readyTime" className="text-sm font-semibold text-orange-900">
          {t.readyIn}
        </label>
        <span className="text-sm tabular-nums text-orange-900">
          <span className="font-semibold">{formatDuration(totalHours)}</span>
          {readyDate && (
            <span className="ml-1 text-orange-600">— {formatReadyTime(readyDate)}</span>
          )}
        </span>
      </div>

      <input
        id="readyTime"
        type="range"
        min={sliderMin}
        max={sliderMax}
        step={0.5}
        value={totalHours}
        onChange={(e) => handleChange(parseFloat(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-orange-200 accent-orange-500"
        aria-label={t.timeUntilReadyAria}
        aria-valuemin={sliderMin}
        aria-valuemax={sliderMax}
        aria-valuenow={totalHours}
        aria-valuetext={formatDuration(totalHours)}
      />

      <div className="flex justify-between text-xs text-orange-400">
        <span>{formatDuration(sliderMin)}</span>
        <span>{formatDuration(sliderMax)}</span>
      </div>

      <p className="text-xs text-orange-500">{t.prepNote}</p>
    </div>
  );
}
