"use client";

import { useReducer } from "react";
import { calculateDough, clamp, DEFAULTS, RANGES, type DoughState, type YeastType } from "@/lib/dough";
import { SliderInput } from "./SliderInput";
import { YeastToggle } from "./YeastToggle";
import { ResultsCard } from "./ResultsCard";
import { ReadyTimeSlider } from "./ReadyTimeSlider";

type Action =
  | { type: "SET_FIELD"; field: keyof Omit<DoughState, "yeastType">; value: number }
  | { type: "SET_YEAST"; value: YeastType };

function reducer(state: DoughState, action: Action): DoughState {
  if (action.type === "SET_YEAST") {
    return { ...state, yeastType: action.value };
  }
  const range = RANGES[action.field];
  return { ...state, [action.field]: clamp(action.value, range.min, range.max) };
}

export function Calculator() {
  const [state, dispatch] = useReducer(reducer, DEFAULTS);

  const noFermentation = state.roomTime + state.fridgeTime <= 0;
  const result = calculateDough(state);

  function setField(field: keyof Omit<DoughState, "yeastType">) {
    return (value: number) => dispatch({ type: "SET_FIELD", field, value });
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      {/* LEFT: inputs */}
      <div className="flex flex-col gap-8">
        {/* Dough */}
        <section>
          <h2 className="mb-4 text-base font-semibold uppercase tracking-wider text-stone-400">
            Dough
          </h2>
          <div className="flex flex-col gap-6">
            <SliderInput
              id="ballsCount"
              label="Number of balls"
              value={state.ballsCount}
              {...RANGES.ballsCount}
              unit="balls"
              onChange={setField("ballsCount")}
            />
            <SliderInput
              id="ballWeight"
              label="Ball weight"
              value={state.ballWeight}
              {...RANGES.ballWeight}
              unit="g"
              onChange={setField("ballWeight")}
            />
            <SliderInput
              id="waterPercent"
              label="Hydration"
              value={state.waterPercent}
              {...RANGES.waterPercent}
              unit="%"
              onChange={setField("waterPercent")}
            />
            <SliderInput
              id="saltPercent"
              label="Salt"
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
            Fermentation
          </h2>
          <div className="flex flex-col gap-6">
            <ReadyTimeSlider
              roomTime={state.roomTime}
              fridgeTime={state.fridgeTime}
              onFridgeTimeChange={setField("fridgeTime")}
            />
            <SliderInput
              id="roomTime"
              label="Room temperature time"
              value={state.roomTime}
              {...RANGES.roomTime}
              unit="h"
              onChange={setField("roomTime")}
            />
            <SliderInput
              id="roomTemp"
              label="Room temperature"
              value={state.roomTemp}
              {...RANGES.roomTemp}
              unit="°C"
              onChange={setField("roomTemp")}
            />
            <SliderInput
              id="fridgeTime"
              label="Fridge time"
              value={state.fridgeTime}
              {...RANGES.fridgeTime}
              unit="h"
              onChange={setField("fridgeTime")}
            />
            <SliderInput
              id="fridgeTemp"
              label="Fridge temperature"
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
            Add some fermentation time — both room time and fridge time are zero.
          </p>
        )}
      </div>

      {/* RIGHT: sticky results */}
      <div className="md:sticky md:top-8 md:self-start">
        <ResultsCard result={result} state={state} noFermentation={noFermentation} />

        <p className="mt-4 text-xs text-stone-400 leading-relaxed">
          Yeast quantities are estimates. Real fermentation depends on flour
          strength, actual dough temperature, and ambient conditions.
        </p>
      </div>
    </div>
  );
}
