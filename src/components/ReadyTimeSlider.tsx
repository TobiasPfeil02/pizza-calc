"use client";

import { useEffect, useState } from "react";
import { clamp, RANGES } from "@/lib/dough";

const PREP_HOURS = 45 / 60; // 45 min preparation offset

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

function formatReadyTime(date: Date): string {
  const now = new Date();
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const todayStr = now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === todayStr) return `today at ${timeStr}`;
  if (date.toDateString() === tomorrow.toDateString()) return `tomorrow at ${timeStr}`;
  return (
    date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) +
    ` at ${timeStr}`
  );
}

export function ReadyTimeSlider({ roomTime, fridgeTime, onFridgeTimeChange }: ReadyTimeSliderProps) {
  const [now, setNow] = useState<Date | null>(null);

  // Populate on the client only to avoid SSR/hydration mismatch
  useEffect(() => {
    setNow(new Date());
  }, []);

  const totalHours = PREP_HOURS + roomTime + fridgeTime;
  const sliderMin = PREP_HOURS + roomTime; // fridgeTime = 0
  const sliderMax = PREP_HOURS + roomTime + RANGES.fridgeTime.max; // fridgeTime = 72

  const readyDate = now ? new Date(now.getTime() + totalHours * 3_600_000) : null;

  function handleChange(newTotal: number) {
    const raw = newTotal - PREP_HOURS - roomTime;
    onFridgeTimeChange(clamp(raw, RANGES.fridgeTime.min, RANGES.fridgeTime.max));
  }

  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
        <label htmlFor="readyTime" className="text-sm font-semibold text-orange-900">
          Ready in
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
        aria-label="Time until dough is ready"
        aria-valuemin={sliderMin}
        aria-valuemax={sliderMax}
        aria-valuenow={totalHours}
        aria-valuetext={formatDuration(totalHours)}
      />

      <div className="flex justify-between text-xs text-orange-400">
        <span>{formatDuration(sliderMin)}</span>
        <span>{formatDuration(sliderMax)}</span>
      </div>

      <p className="text-xs text-orange-500">
        Includes 45 min preparation · adjusts fridge time
      </p>
    </div>
  );
}
