"use client";

import { useEffect, useReducer, useState } from "react";
import { calculateDough, clamp, DEFAULTS, RANGES, type DoughState, type YeastType } from "@/lib/dough";
import { useLanguage } from "@/context/LanguageContext";
import { SliderInput } from "./SliderInput";
import { YeastToggle } from "./YeastToggle";
import { ResultsCard } from "./ResultsCard";
import { ReadyTimeSlider } from "./ReadyTimeSlider";
import { ExportButtons } from "./ExportButtons";
import { RecipePrintView } from "./RecipePrintView";

const STORAGE_KEY = "pizza-calc-state";

type Action =
  | { type: "SET_FIELD"; field: keyof Omit<DoughState, "yeastType">; value: number }
  | { type: "SET_YEAST"; value: YeastType }
  | { type: "LOAD_STATE"; payload: DoughState };

function reducer(state: DoughState, action: Action): DoughState {
  if (action.type === "LOAD_STATE") return action.payload;
  if (action.type === "SET_YEAST") return { ...state, yeastType: action.value };
  const range = RANGES[action.field];
  return { ...state, [action.field]: clamp(action.value, range.min, range.max) };
}

function usePersistentDoughState() {
  const [state, dispatch] = useReducer(reducer, DEFAULTS);
  // Tracks whether the localStorage load has completed so we never
  // save DEFAULTS back before we've had a chance to restore stored state.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<DoughState>;
        // Merge with DEFAULTS so missing/renamed fields degrade gracefully
        dispatch({ type: "LOAD_STATE", payload: { ...DEFAULTS, ...parsed } });
      }
    } catch {
      // Corrupt storage — ignore and keep defaults
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  return [state, dispatch] as const;
}

export function Calculator() {
  const [state, dispatch] = usePersistentDoughState();
  const { t } = useLanguage();

  const noFermentation = state.roomTime + state.fridgeTime <= 0;
  const result = calculateDough(state);

  function setField(field: keyof Omit<DoughState, "yeastType">) {
    return (value: number) => dispatch({ type: "SET_FIELD", field, value });
  }

  return (
    <>
    <RecipePrintView state={state} result={result} />
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 print:hidden">
      {/* LEFT: inputs */}
      <div className="flex flex-col gap-8">
        {/* Dough */}
        <section>
          <h2 className="mb-4 text-base font-semibold uppercase tracking-wider text-stone-400">
            {t.doughSection}
          </h2>
          <div className="flex flex-col gap-6">
            <SliderInput
              id="ballsCount"
              label={t.numberOfBalls}
              value={state.ballsCount}
              {...RANGES.ballsCount}
              unit={t.unitBalls}
              onChange={setField("ballsCount")}
            />
            <SliderInput
              id="ballWeight"
              label={t.ballWeight}
              value={state.ballWeight}
              {...RANGES.ballWeight}
              unit="g"
              onChange={setField("ballWeight")}
            />
            <SliderInput
              id="waterPercent"
              label={t.hydration}
              value={state.waterPercent}
              {...RANGES.waterPercent}
              unit="%"
              onChange={setField("waterPercent")}
            />
            <SliderInput
              id="saltPercent"
              label={t.saltInput}
              value={state.saltPercent}
              {...RANGES.saltPercent}
              unit="%"
              onChange={setField("saltPercent")}
            />
          </div>
        </section>

        {/* Fermentation */}
        <section>
          <h2 className="mb-4 text-base font-semibold uppercase tracking-wider text-stone-400">
            {t.fermentationSection}
          </h2>
          <div className="flex flex-col gap-6">
            <ReadyTimeSlider
              roomTime={state.roomTime}
              fridgeTime={state.fridgeTime}
              onFridgeTimeChange={setField("fridgeTime")}
            />
            <SliderInput
              id="roomTime"
              label={t.roomTime}
              value={state.roomTime}
              {...RANGES.roomTime}
              unit="h"
              onChange={setField("roomTime")}
            />
            <SliderInput
              id="roomTemp"
              label={t.roomTemp}
              value={state.roomTemp}
              {...RANGES.roomTemp}
              unit="°C"
              onChange={setField("roomTemp")}
            />
            <SliderInput
              id="fridgeTime"
              label={t.fridgeTime}
              value={state.fridgeTime}
              {...RANGES.fridgeTime}
              unit="h"
              onChange={setField("fridgeTime")}
            />
            <SliderInput
              id="fridgeTemp"
              label={t.fridgeTemp}
              value={state.fridgeTemp}
              {...RANGES.fridgeTemp}
              unit="°C"
              onChange={setField("fridgeTemp")}
            />
          </div>
        </section>

        {/* Yeast type */}
        <section>
          <YeastToggle
            value={state.yeastType}
            onChange={(v) => dispatch({ type: "SET_YEAST", value: v })}
          />
        </section>

        {noFermentation && (
          <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {t.noFermentationWarning}
          </p>
        )}
      </div>

      {/* RIGHT: sticky results */}
      <div className="md:sticky md:top-8 md:self-start">
        <ResultsCard result={result} state={state} noFermentation={noFermentation} />
        <ExportButtons state={state} result={result} />
        <p className="mt-4 text-xs text-stone-400 leading-relaxed">
          {t.yeastNote}
        </p>
      </div>
    </div>
    </>
  );
}
