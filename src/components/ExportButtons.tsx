"use client";

import { useLanguage } from "@/context/LanguageContext";
import { generateIcs, downloadIcs, type IcsEvent } from "@/lib/ics";
import type { DoughResult, DoughState } from "@/lib/dough";

interface Props {
  state: DoughState;
  result: DoughResult;
}

const PREP_HOURS = 45 / 60;
const EVENT_DURATION_MS = 15 * 60 * 1000; // 15-minute events

function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 3_600_000);
}

export function ExportButtons({ state, result }: Props) {
  const { t } = useLanguage();

  function handlePrint() {
    window.print();
  }

  function handleCalendar() {
    const now = new Date();
    const uid = () => `pizza-dough-${Date.now()}-${Math.random().toString(36).slice(2)}@pizza-calc`;

    const ingredientDesc = [
      `${t.flour}: ${Math.round(result.flourWeight)} g`,
      `${t.water}: ${Math.round(result.waterWeight)} g`,
      `${t.saltResult}: ${Math.round(result.saltWeight)} g`,
      `${state.yeastType === "IDY" ? t.instantDryYeast : t.freshYeast}: ${result.yeastWeight.toFixed(2)} g`,
    ].join("\n");

    const events: IcsEvent[] = [];

    // Event 1: Start dough
    events.push({
      uid: uid(),
      start: now,
      end: new Date(now.getTime() + EVENT_DURATION_MS),
      summary: t.icsEvtStart,
      description: ingredientDesc,
    });

    // Event 2: Move to fridge (only if there is a room-temp phase before the fridge)
    if (state.roomTime > 0 && state.fridgeTime > 0) {
      const fridgeStart = addHours(now, state.roomTime);
      events.push({
        uid: uid(),
        start: fridgeStart,
        end: new Date(fridgeStart.getTime() + EVENT_DURATION_MS),
        summary: t.icsEvtFridge,
      });
    }

    // Event 3: Take out of fridge
    if (state.fridgeTime > 0) {
      const takeOut = addHours(now, state.roomTime + state.fridgeTime);
      events.push({
        uid: uid(),
        start: takeOut,
        end: new Date(takeOut.getTime() + EVENT_DURATION_MS),
        summary: t.icsEvtTakeOut,
      });
    }

    // Event 4: Pizza time (ready = now + roomTime + fridgeTime + prep)
    const readyTime = addHours(now, state.roomTime + state.fridgeTime + PREP_HOURS);
    events.push({
      uid: uid(),
      start: readyTime,
      end: addHours(readyTime, 2),
      summary: t.icsEvtReady,
    });

    downloadIcs(generateIcs(events, now), "pizza-dough.ics");
  }

  return (
    <div className="mt-4 flex gap-2 print:hidden">
      <button
        onClick={handleCalendar}
        className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm hover:bg-stone-50 active:bg-stone-100 transition-colors"
      >
        📅 {t.calendarButton}
      </button>
      <button
        onClick={handlePrint}
        className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm hover:bg-stone-50 active:bg-stone-100 transition-colors"
      >
        🖨️ {t.printButton}
      </button>
    </div>
  );
}
