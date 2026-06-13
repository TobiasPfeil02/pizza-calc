"use client";

import { useEffect, useState } from "react";
import { clamp, RANGES } from "@/lib/dough";
import { useLanguage } from "@/context/LanguageContext";
import { LOCALE_TAG } from "@/lib/i18n";

interface ReadyTimeSliderProps {
  roomTime: number;
  fridgeTime: number;
  startTime: string;
  onFridgeTimeChange: (value: number) => void;
  onStartTimeChange: (value: string) => void;
}

function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function formatDatetimeLocal(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function ReadyTimeSlider({
  roomTime,
  fridgeTime,
  startTime,
  onFridgeTimeChange,
  onStartTimeChange,
}: ReadyTimeSliderProps) {
  const [now, setNow] = useState<Date | null>(null);
  const { locale, t } = useLanguage();

  useEffect(() => {
    setNow(new Date());
  }, []);

  const tag = LOCALE_TAG[locale];
  const baseDate = startTime !== "" ? new Date(startTime) : now;

  const totalHours = roomTime + fridgeTime;
  const sliderMin = roomTime;
  const sliderMax = roomTime + RANGES.fridgeTime.max;

  const readyDate = baseDate
    ? new Date(baseDate.getTime() + totalHours * 3_600_000)
    : null;

  function formatReadyTime(date: Date): string {
    const timeStr = date.toLocaleTimeString(tag, { hour: "2-digit", minute: "2-digit" });
    const ref = new Date();
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

  function handleSliderChange(newTotal: number) {
    const raw = newTotal - roomTime;
    onFridgeTimeChange(clamp(raw, RANGES.fridgeTime.min, RANGES.fridgeTime.max));
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 flex flex-col gap-2">
      {/* Start time row */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="startTime"
          className="text-xs font-medium text-emerald-700 shrink-0"
        >
          {t.startTimeLabel}
        </label>
        <input
          id="startTime"
          type="datetime-local"
          value={startTime}
          onChange={(e) => onStartTimeChange(e.target.value)}
          className="flex-1 min-w-0 rounded-md border border-emerald-200 bg-white px-2 py-1 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        />
        {now && (
          <button
            type="button"
            onClick={() => onStartTimeChange(formatDatetimeLocal(now))}
            aria-label="Reset to current time"
            className="shrink-0 text-emerald-700 hover:text-emerald-900 text-base leading-none px-1"
          >
            ↺
          </button>
        )}
      </div>

      {/* Ready time display */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
        <label htmlFor="readyTime" className="text-sm font-semibold text-emerald-900">
          {t.readyIn}
        </label>
        <span className="text-sm tabular-nums text-emerald-900">
          <span className="font-semibold">{formatDuration(totalHours)}</span>
          {readyDate && (
            <span className="ml-1 text-emerald-700">— {formatReadyTime(readyDate)}</span>
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
        onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-emerald-200 accent-emerald-600"
        aria-label={t.timeUntilReadyAria}
        aria-valuemin={sliderMin}
        aria-valuemax={sliderMax}
        aria-valuenow={totalHours}
        aria-valuetext={formatDuration(totalHours)}
      />

      <div className="flex justify-between text-xs text-emerald-700">
        <span>{formatDuration(sliderMin)}</span>
        <span>{formatDuration(sliderMax)}</span>
      </div>

      <p className="text-xs text-emerald-700">{t.prepNote}</p>
    </div>
  );
}
